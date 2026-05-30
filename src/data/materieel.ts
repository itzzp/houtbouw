// Materieel dat te huur is, met dagprijs voor de reserverings-demo.
// `id` wordt gebruikt om reserveringen aan materieel te koppelen.
export interface Materieel {
  id: string;
  naam: string;
  omschrijving: string;
  /** Huurprijs per dag in hele euro's (excl. btw). */
  dagprijs: number;
}

export const materieel: Materieel[] = [
  {
    id: 'steigers',
    naam: 'Steigers',
    omschrijving:
      'Stabiele rolsteigers en kamersteigers in diverse hoogtes, geschikt voor binnen- en buitenwerk. Inclusief leuningen en stelvoeten.',
    dagprijs: 25,
  },
  {
    id: 'betonmolen',
    naam: 'Betonmolen',
    omschrijving:
      'Elektrische betonmolen voor het mengen van beton, mortel en specie. Eenvoudig te verplaatsen op de bouwplaats.',
    dagprijs: 18,
  },
  {
    id: 'kettingzaag',
    naam: 'Kettingzaag',
    omschrijving:
      'Krachtige benzine-kettingzaag voor snoei- en zaagwerk. Goed onderhouden en scherp; veiligheidsuitrusting bespreekbaar.',
    dagprijs: 20,
  },
  {
    id: 'houtkloofmachine',
    naam: 'Houtkloofmachine',
    omschrijving:
      'Hydraulische houtkloofmachine om snel en veilig brandhout te kloven. Bespaart een hoop tijd en rugwerk.',
    dagprijs: 30,
  },
  {
    id: 'aanhanger',
    naam: 'Aanhanger',
    omschrijving:
      'Geremde tandasser voor het vervoeren van materialen, machines of afval. Met huif of open laadbak beschikbaar.',
    dagprijs: 22,
  },
  {
    id: 'bouwdrogers',
    naam: 'Bouwdrogers',
    omschrijving:
      'Bouwdrogers om vocht uit een ruimte of nieuwbouw te trekken, zodat het werk sneller doorgang kan vinden.',
    dagprijs: 15,
  },
  {
    id: 'afkortzaag',
    naam: 'Afkortzaag',
    omschrijving:
      'Professionele radiaal-/afkortzaag voor nauwkeurig op maat zagen van balken, planken en lijstwerk.',
    dagprijs: 17,
  },
  {
    id: 'trilplaat',
    naam: 'Trilplaat',
    omschrijving:
      'Trilplaat voor het verdichten van zand, grind en bestrating. Ideaal bij het voorbereiden van een stevige ondergrond.',
    dagprijs: 28,
  },
];
