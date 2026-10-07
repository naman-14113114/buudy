import en from '@/data/locales/policies/en.json';
export type LegalPolicies = typeof en;
// Publish only full translations reviewed for clause/markup parity.
const loaders: Record<string,()=>Promise<LegalPolicies>> = {
 en:async()=>en,
 fr:async()=>(await import('@/data/locales/policies/fr.json')).default,
 de:async()=>(await import('@/data/locales/policies/de.json')).default,
 nl:async()=>(await import('@/data/locales/policies/nl.json')).default,
 da:async()=>(await import('@/data/locales/policies/da.json')).default,
 sv:async()=>(await import('@/data/locales/policies/sv.json')).default,
};
export function hasLegalPolicies(locale:string){return Object.hasOwn(loaders,locale);}
export async function getLegalPolicies(locale:string): Promise<LegalPolicies|null>{return hasLegalPolicies(locale)?loaders[locale]():null;}
export function localizePolicyLinks(html:string,locale:string){
 // Only fixed local policy/support paths are rewritten. Email and external URLs stay literal.
 return html.replace(/href="(\/pages\/contact-us|\/policies\/[a-z-]+)"/g,(_,path:string)=>`href="${locale==='en'?path:`/${locale}${path}`}"`);
}
