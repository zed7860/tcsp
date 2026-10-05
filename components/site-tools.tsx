'use client';
import { useEffect, useState } from 'react';
import { Languages, Moon, Sun } from 'lucide-react';

declare global { interface Window { googleTranslateElementInit?: () => void; google?: { translate?: { TranslateElement: new (options: object, id: string) => void } } } }

const languages = [
  ['en','English'],['hi','हिन्दी'],['kn','ಕನ್ನಡ'],['te','తెలుగు'],['ta','தமிழ்'],['ml','മലയാളം'],['mr','मराठी'],['gu','ગુજરાતી'],['pa','ਪੰਜਾਬੀ'],['bn','বাংলা'],['as','অসমীয়া'],['brx','बड़ो'],['or','ଓଡ଼ିଆ'],['ur','اردو'],['sa','संस्कृतम्'],['ne','नेपाली'],['sd','سنڌي'],['ks','کٲشُر'],['gom','कोंकणी'],['mai','मैथिली'],['doi','डोगरी'],['mni-Mtei','মৈতৈলোন্'],['sat','ᱥᱟᱱᱛᱟᱲᱤ']
];

export function SiteTools() {
  const [dark, setDark] = useState(false);
  const [language, setLanguage] = useState('en');
  useEffect(() => {
    const savedTheme = localStorage.getItem('tcsp-theme');
    const useDark = savedTheme === 'dark' || (!savedTheme && matchMedia('(prefers-color-scheme: dark)').matches);
    setDark(useDark); document.documentElement.dataset.theme = useDark ? 'dark' : 'light';
    const savedLanguage = localStorage.getItem('tcsp-language') || 'en'; setLanguage(savedLanguage);
    window.googleTranslateElementInit = () => { if (window.google?.translate?.TranslateElement) { new window.google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element'); if (savedLanguage !== 'en') setTimeout(() => { const select = document.querySelector<HTMLSelectElement>('.goog-te-combo'); if (select) { select.value = savedLanguage; select.dispatchEvent(new Event('change')); } }, 500); } };
    if (!document.querySelector('script[data-google-translate]')) { const script = document.createElement('script'); script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'; script.async = true; script.dataset.googleTranslate = 'true'; document.body.appendChild(script); }
  }, []);
  function toggleTheme() { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? 'dark' : 'light'; localStorage.setItem('tcsp-theme', next ? 'dark' : 'light'); }
  function changeLanguage(value: string) {
    setLanguage(value); localStorage.setItem('tcsp-language', value);
    const apply = () => { const select = document.querySelector<HTMLSelectElement>('.goog-te-combo'); if (!select) return false; select.value = value; select.dispatchEvent(new Event('change')); return true; };
    if (!apply()) setTimeout(apply, 700);
  }
  return <div className="site-tools"><div id="google_translate_element" aria-hidden="true" /><label className="language-picker"><Languages size={16} /><span className="sr-only">Select language</span><select aria-label="Select language" value={language} onChange={event => changeLanguage(event.target.value)}>{languages.map(([code,name]) => <option key={code} value={code}>{name}</option>)}</select></label><button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={dark ? 'Use light mode' : 'Use dark mode'} title={dark ? 'Use light mode' : 'Use dark mode'}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button></div>;
}
