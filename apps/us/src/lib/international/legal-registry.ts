// Route metadata stays independent of the larger legal-copy dictionaries.
export const legalLanguages = ['en','fr','de','nl','da','sv'] as readonly string[];
export const additionalLegalPaths = ['/policies/privacy-policy','/policies/terms-of-service','/policies/cookies-policy','/policies/refund-policy'] as const;
export function hasCompleteLegalTranslation(locale:string){return legalLanguages.includes(locale);}
