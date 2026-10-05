export type InstagramPost = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

const profile = 'tumkurconcretespunpipe';
const publicProfileUrl = `https://www.instagram.com/${profile}/`;

type PublicNode = {
  id: string;
  shortcode: string;
  display_url?: string;
  thumbnail_src?: string;
  is_video?: boolean;
  taken_at_timestamp?: number;
  edge_media_to_caption?: { edges?: Array<{ node?: { text?: string } }> };
  edge_sidecar_to_children?: { edges?: unknown[] };
};

async function fetchPublicInstagramPosts(): Promise<InstagramPost[]> {
  const endpoint = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${profile}`;
  try {
    const response = await fetch(endpoint, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TumkurConcreteSpunPipes/1.0; +https://tumkurconcretesp.com)',
        // Public Instagram web application identifier; this is not a private token or credential.
        'x-ig-app-id': '936619743392459',
      },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 900 },
    });
    if (!response.ok) { console.warn('Public Instagram feed unavailable:', response.status); return []; }
    const result = await response.json() as { data?: { user?: { is_private?: boolean; edge_owner_to_timeline_media?: { edges?: Array<{ node?: PublicNode }> } } } };
    const user = result.data?.user;
    if (!user || user.is_private) return [];
    return (user.edge_owner_to_timeline_media?.edges || []).flatMap(edge => {
      const node = edge.node;
      if (!node?.shortcode || (!node.display_url && !node.thumbnail_src)) return [];
      const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text;
      return [{
        id: node.id || node.shortcode,
        caption,
        media_type: node.edge_sidecar_to_children?.edges?.length ? 'CAROUSEL_ALBUM' : node.is_video ? 'VIDEO' : 'IMAGE',
        media_url: node.display_url,
        thumbnail_url: node.thumbnail_src || node.display_url,
        permalink: `${publicProfileUrl}p/${node.shortcode}/`,
        timestamp: new Date((node.taken_at_timestamp || 0) * 1000).toISOString(),
      } satisfies InstagramPost];
    });
  } catch (error) {
    console.warn('Public Instagram feed unavailable:', error);
    return [];
  }
}
import { unstable_cache } from 'next/cache';


export const getInstagramPosts = unstable_cache(fetchPublicInstagramPosts, ['tcsp-public-instagram-posts'], { revalidate: 900 });
