'use client';
import { usePathname } from 'next/navigation';
import { languages, localePath, pathsForLocale, type Locale } from '@/lib/international/markets';
export function LanguageSwitcher({locale,label}:{locale:Locale;label:string}) {
  const pathname=usePathname();
  const path=locale==='en' ? pathname : pathname.slice(locale.length+1) || '/';
  return <details className="buudy-language"><summary>{label}: {languages[locale]}</summary>
    <nav aria-label={label}>{Object.entries(languages).map(([code,name])=><a key={code} href={localePath(code as Locale,pathsForLocale(code).includes(path)?path:'/')} hrefLang={code} lang={code} aria-current={code===locale?'page':undefined}
      onClick={event=>{document.cookie=`buudy_language=${code}; Path=/; Max-Age=31536000; SameSite=Lax`;event.currentTarget.search=window.location.search;}}>{name}</a>)}</nav>
  </details>;
}
