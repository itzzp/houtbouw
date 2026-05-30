// @ts-check
import { defineConfig } from 'astro/config';

// Voor de online proefsite op GitHub Pages staat de site in een submap
// (https://itzzp.github.io/houtbouw/). Het base-pad komt uit een env-variabele,
// zodat de site lokaal op '/' draait en online op '/houtbouw/'. Bij een eigen
// domein (bijv. kloostermanbouw.nl) laat je BASE_PATH gewoon weg.
const rawBase = process.env.BASE_PATH ?? '/';
// Garandeer een afsluitende slash, zodat `${BASE_URL}info` => `/houtbouw/info`.
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const site = process.env.SITE_URL ?? 'https://kloostermanbouw.nl';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  // Astro's ingebouwde beeldoptimalisatie gebruikt sharp (standaard).
  image: {
    // Sta optimalisatie van lokale afbeeldingen in src/assets toe.
    responsiveStyles: true,
  },
});
