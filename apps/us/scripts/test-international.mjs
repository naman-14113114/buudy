import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveLanguage, localePath, hasLocale, resolveCurrency } from '../src/lib/international/markets.ts';

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
