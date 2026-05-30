// Voorbeeld-reserveringen voor de verhuur-demo.
// Deze "seed"-data staat altijd in de planning; reserveringen die een bezoeker
// zelf aanmaakt komen hier in de browser (localStorage) bovenop.
//
// Statussen:
//   aangevraagd  — door bezoeker ingediend, wacht op bevestiging beheerder
//   gereserveerd — door beheerder bevestigd, in de toekomst
//   lopend       — loopt op dit moment (datum valt binnen periode)
//   afgerond     — periode is verstreken
//   geannuleerd  — geannuleerd, telt niet mee voor beschikbaarheid/omzet
//
// 'lopend' en 'afgerond' worden automatisch uit de datums afgeleid; in de seed
// geven we de "grond"-status (aangevraagd / gereserveerd / geannuleerd).
export type ReserveringStatus =
  | 'aangevraagd'
  | 'gereserveerd'
  | 'lopend'
  | 'afgerond'
  | 'geannuleerd';

export interface Reservering {
  id: string;
  materieelId: string;
  klant: string;
  email: string;
  /** Startdatum, formaat YYYY-MM-DD (inclusief). */
  start: string;
  /** Einddatum, formaat YYYY-MM-DD (inclusief). */
  eind: string;
  status: ReserveringStatus;
  /** true als deze reservering door een bezoeker is aangemaakt (niet uit de seed). */
  vanBezoeker?: boolean;
}

// Peildatum van de demo-data: eind mei 2026.
export const seedReserveringen: Reservering[] = [
  {
    id: 'seed-1',
    materieelId: 'steigers',
    klant: 'Bouwbedrijf De Vries',
    email: 'planning@devries-bouw.nl',
    start: '2026-05-25',
    eind: '2026-06-02',
    status: 'gereserveerd', // valt over vandaag heen → toont als 'lopend'
  },
  {
    id: 'seed-2',
    materieelId: 'betonmolen',
    klant: 'Klusbedrijf Hoekstra',
    email: 'info@hoekstraklus.nl',
    start: '2026-06-10',
    eind: '2026-06-14',
    status: 'gereserveerd',
  },
  {
    id: 'seed-3',
    materieelId: 'aanhanger',
    klant: 'Jan Postma',
    email: 'jan.postma@gmail.com',
    start: '2026-05-10',
    eind: '2026-05-14',
    status: 'gereserveerd', // in het verleden → toont als 'afgerond'
  },
  {
    id: 'seed-4',
    materieelId: 'kettingzaag',
    klant: 'Hoveniersbedrijf Groen & Co',
    email: 'contact@groenenco.nl',
    start: '2026-06-01',
    eind: '2026-06-03',
    status: 'gereserveerd',
  },
  {
    id: 'seed-5',
    materieelId: 'bouwdrogers',
    klant: 'Aannemer Bakker',
    email: 'r.bakker@bakkeraannemers.nl',
    start: '2026-05-28',
    eind: '2026-06-05',
    status: 'gereserveerd', // loopt nu → 'lopend'
  },
  {
    id: 'seed-6',
    materieelId: 'trilplaat',
    klant: 'Stratenmaker Veenstra',
    email: 'veenstra.bestrating@outlook.com',
    start: '2026-06-08',
    eind: '2026-06-09',
    status: 'aangevraagd', // wacht op bevestiging beheerder
  },
  {
    id: 'seed-7',
    materieelId: 'houtkloofmachine',
    klant: 'Familie Dijkstra',
    email: 'h.dijkstra@ziggo.nl',
    start: '2026-04-18',
    eind: '2026-04-20',
    status: 'gereserveerd', // verleden → 'afgerond'
  },
];
