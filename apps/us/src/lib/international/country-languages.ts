// Country defaults are a starting preference, not an inference about nationality.
// Multilingual destinations always honor the visitor's supported browser language.
// A planned language does not become routable until its dictionary is published.
const groups: Record<string,string[]> = {
 en:['GB','US','CA','AU','NZ','IE','AS','AI','AG','BS','BB','BZ','BM','BW','IO','VG','KY','CX','CC','CK','DM','FK','FJ','GM','GH','GI','GD','GU','GG','GY','IM','JM','JE','KI','LS','LR','MW','MH','MU','MS','NA','NR','NG','NU','MP','PG','PN','RW','SH','KN','LC','VC','WS','SC','SL','SG','SX','SB','ZA','SZ','TK','TO','TT','TC','TV','VI','UG','VU','ZM','ZW'],
 fr:['FR','MC','BE','LU','GF','GP','MQ','RE','YT','NC','PF','WF','MF','PM','CI','SN','GA','CG','CD','CM','BJ','BF','ML','NE','TD','TG','GN','DJ','KM','MG','HT','CF','BI'],
 de:['DE','AT','LI','CH'], nl:['NL','SR','AW','CW','BQ'], da:['DK','GL','FO'], sv:['SE','AX'],
 es:['ES','MX','AR','BO','CL','CO','CR','CU','DO','EC','GT','HN','NI','PA','PE','PR','PY','SV','UY','VE','GQ'],
 it:['IT','SM','VA'], pt:['PT','BR','AO','MZ','CV','GW','ST','TL'],
 nb:['NO','BV','SJ'], fi:['FI'], pl:['PL'], cs:['CZ'], sk:['SK'], hu:['HU'], ro:['RO','MD'], bg:['BG'],
 el:['GR','CY'], hr:['HR'], sl:['SI'], et:['EE'], lv:['LV'], lt:['LT'], is:['IS'], sq:['AL'],
 sr:['RS','ME'], bs:['BA'], mk:['MK'], mt:['MT'], ca:['AD'],
 ar:['AE','DZ','BH','EG','ER','IQ','JO','KW','LB','LY','MA','OM','QA','SA','SD','SY','TN','YE','PS'],
 he:['IL'], tr:['TR'], ru:['RU','BY'], uk:['UA'], ka:['GE'], hy:['AM'], az:['AZ'], kk:['KZ'],
 uz:['UZ'], fa:['IR','AF'], sw:['TZ','KE'], am:['ET'],
 zh:['CN'], 'zh-Hant':['HK','MO','TW'], ja:['JP'], ko:['KR'], id:['ID'], ms:['MY','BN'],
 th:['TH'], vi:['VN'], tl:['PH'], hi:['IN'], bn:['BD'], ur:['PK'], ne:['NP'], si:['LK'],
 km:['KH'], lo:['LA'], my:['MM'], mn:['MN'], dz:['BT'], dv:['MV'], so:['SO'], tg:['TJ'], ky:['KG'],
};
export const plannedCountryLanguage: Record<string,string> = Object.fromEntries(
 Object.entries(groups).flatMap(([language,countries])=>countries.map(country=>[country,language]))
);
export const rtlLanguages = ['ar','he','fa','ur','dv'] as const;
export function languageDirection(locale:string): 'rtl'|'ltr' {
 return (rtlLanguages as readonly string[]).includes(locale)?'rtl':'ltr';
}
