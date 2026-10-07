import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveLanguage, localePath, hasLocale, resolveCurrency } from '../src/lib/international/markets.ts';
import { plannedCountryLanguage, languageDirection } from '../src/lib/international/country-languages.ts';
import { providerDestinations } from '../src/lib/international/provider-markets.ts';

test('explicit language wins and supported browser preferences precede country', () => {
  assert.equal(resolveLanguage('en','fr-FR,fr;q=0.9','FR'), 'en');
  assert.equal(resolveLanguage(undefined,'fr-CH,fr;q=0.9,en;q=0.8','CH'), 'fr');
  assert.equal(resolveLanguage(undefined,'zz;q=1,de-DE;q=0.8','FR'), 'de');
  assert.equal(resolveLanguage(undefined,'fr;q=0,en;q=0.5','FR'), 'en');
  assert.equal(resolveLanguage(undefined,undefined,'NL'), 'nl');
  assert.equal(resolveLanguage(undefined,undefined,undefined), 'en');
});
test('locale paths stay internal and keep the requested equivalent', () => {
  assert.equal(localePath('fr','/products/buudy-led-mask'), '/fr/products/buudy-led-mask');
  assert.equal(localePath('en','/'), '/');
  assert.equal(hasLocale('__proto__'), false);
  assert.throws(() => localePath('fr','//evil.example'));
});
test('currency choice is independent of language and is allowlisted', () => {
  assert.equal(resolveCurrency('CHF','FR'), 'CHF');
  assert.equal(resolveCurrency(undefined,'FR'), 'EUR');
  assert.equal(resolveCurrency(undefined,'DK'), 'DKK');
  assert.equal(resolveCurrency('ZZZ','GB'), 'GBP');
});
test('every provider-accepted destination has an explicit language plan',()=>{
  for(const {country,accepted} of providerDestinations)if(accepted)assert.ok(plannedCountryLanguage[country],country);
  assert.equal(plannedCountryLanguage.FR,'fr');
  assert.equal(plannedCountryLanguage.TW,'zh-Hant');
  assert.equal(plannedCountryLanguage.BT,'dz');
  assert.equal(plannedCountryLanguage.US,'en');
});
test('right-to-left direction follows language independently of country/currency',()=>{
  for(const locale of ['ar','he','fa','ur','dv'])assert.equal(languageDirection(locale),'rtl');
  for(const locale of ['en','fr','zh','hi'])assert.equal(languageDirection(locale),'ltr');
});
test('browser aliases and Chinese script preferences select the complete matching dictionary',()=>{
  assert.equal(resolveLanguage(undefined,'no-NO','US'),'nb');
  assert.equal(resolveLanguage(undefined,'fil-PH','US'),'tl');
  assert.equal(resolveLanguage(undefined,'zh-TW,zh;q=0.9','US'),'zh-Hant');
  assert.equal(resolveLanguage(undefined,'zh-Hant-HK','US'),'zh-Hant');
  assert.equal(resolveLanguage(undefined,'zh-Hans-CN','US'),'zh');
  assert.equal(resolveLanguage(undefined,'iw-IL','US'),'he');
  assert.equal(resolveLanguage('en','ar-AE','AE'),'en');
});
