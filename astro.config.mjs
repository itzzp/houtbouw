// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kloostermanhoutbouw.nl',
  // Astro's ingebouwde beeldoptimalisatie gebruikt sharp (standaard).
  image: {
    // Sta optimalisatie van lokale afbeeldingen in src/assets toe.
    responsiveStyles: true,
  },
});
