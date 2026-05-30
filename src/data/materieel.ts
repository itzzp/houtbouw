// Statische lijst van materieel dat te huur is.
// Geen boekingssysteem — bezoekers nemen contact op om te huren.
// Pas omschrijvingen en prijzen hieronder aan.
export interface Materieel {
  naam: string;
  omschrijving: string;
  prijs: string;
}

export const materieel: Materieel[] = [
  {
    naam: 'Steigers',
    omschrijving:
      'Stabiele rolsteigers en kamersteigers in diverse hoogtes, geschikt voor binnen- en buitenwerk. Inclusief leuningen en stelvoeten.',
    prijs: 'op aanvraag',
  },
  {
    naam: 'Betonmolen',
    omschrijving:
      'Elektrische betonmolen voor het mengen van beton, mortel en specie. Eenvoudig te verplaatsen op de bouwplaats.',
    prijs: 'op aanvraag',
  },
  {
    naam: 'Kettingzaag',
    omschrijving:
      'Krachtige benzine-kettingzaag voor snoei- en zaagwerk. Goed onderhouden en scherp; veiligheidsuitrusting bespreekbaar.',
    prijs: 'op aanvraag',
  },
  {
    naam: 'Houtkloofmachine',
    omschrijving:
      'Hydraulische houtkloofmachine om snel en veilig brandhout te kloven. Bespaart een hoop tijd en rugwerk.',
    prijs: 'op aanvraag',
  },
  {
    naam: 'Aanhanger',
    omschrijving:
      'Geremde tandasser voor het vervoeren van materialen, machines of afval. Met huif of open laadbak beschikbaar.',
    prijs: 'op aanvraag',
  },
  {
    naam: 'Bouwdrogers',
    omschrijving:
      'Bouwdrogers om vocht uit een ruimte of nieuwbouw te trekken, zodat het werk sneller doorgang kan vinden.',
    prijs: 'op aanvraag',
  },
  {
    naam: 'Afkortzaag',
    omschrijving:
      'Professionele radiaal-/afkortzaag voor nauwkeurig op maat zagen van balken, planken en lijstwerk.',
    prijs: 'op aanvraag',
  },
  {
    naam: 'Trilplaat',
    omschrijving:
      'Trilplaat voor het verdichten van zand, grind en bestrating. Ideaal bij het voorbereiden van een stevige ondergrond.',
    prijs: 'op aanvraag',
  },
];
