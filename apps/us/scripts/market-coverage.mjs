import fs from 'node:fs/promises';
import { languages } from '../src/lib/international/markets.ts';
import { plannedCountryLanguage } from '../src/lib/international/country-languages.ts';
import { providerDestinations, providerMarketCheckedAt } from '../src/lib/international/provider-markets.ts';
const countries=new Intl.DisplayNames(['en'],{type:'region'});
const rows=providerDestinations.map(d=>({
 country:d.country,name:countries.of(d.country),currency:d.currency,shipping:d.accepted?'country accepted':'country rejected',
 plannedLanguage:plannedCountryLanguage[d.country]||null,
 publishedLanguage:Object.hasOwn(languages,plannedCountryLanguage[d.country])?plannedCountryLanguage[d.country]:null,
}));
const gaps=rows.filter(d=>d.shipping==='country accepted'&&!d.publishedLanguage);
const report={generatedAt:new Date().toISOString(),providerCheckedAt:providerMarketCheckedAt,
 scope:'Country-only unpaid checkout validation. Full addresses remain subject to provider eligibility. Language coverage measures the main product journey and policy summaries, not complete legal translations, image text or hosted checkout language.',
 languages:Object.keys(languages),accepted:rows.filter(d=>d.shipping==='country accepted').length,rejected:rows.filter(d=>d.shipping==='country rejected').length,
 languageGaps:gaps.map(d=>({country:d.country,language:d.plannedLanguage})),destinations:rows};
if(process.argv[2])await fs.writeFile(process.argv[2],JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,destinations:undefined}));
