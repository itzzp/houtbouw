// Centrale bedrijfsgegevens van Kloosterman bouw en houtbewerking.
// Op één plek, zodat facturen, footer en formulieren dezelfde gegevens tonen.
export const bedrijf = {
  naam: 'Kloosterman bouw en houtbewerking',
  adres: 'Provincialeweg 127',
  postcode: '9863 PE',
  plaats: 'Doezum',
  telefoon: '06 - 52 09 07 13',
  telefoonHref: '+31652090713',
  email: 'info@kloostermanbouw.nl',
  kvk: '01159062',
  btw: 'NL003177242B10',
  iban: 'NL50 RABO 0385 7489 49',

  // Formspree-endpoint voor het aanvraagformulier.
  // Leeg laten = formulier valt terug op een vooraf ingevulde e-mail (mailto).
  // Activeren: maak gratis een form aan op https://formspree.io, plak hier
  // het endpoint, bv. 'https://formspree.io/f/abcdwxyz'.
  formspreeEndpoint: '',
} as const;
