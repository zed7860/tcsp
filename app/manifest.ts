import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tumkur Concrete Spun Pipes',
    short_name: 'TCSP',
    description: 'RCC Hume pipes and precast concrete products manufactured in Tumakuru since 2005.',
    start_url: '/',
    display: 'standalone',
    background_color: '#171717',
    theme_color: '#ff5e14',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
