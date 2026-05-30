// Gedeelde client-side "store" voor de verhuur-demo.
//
// Draait volledig in de browser: de seed-reserveringen worden samengevoegd met
// wat de bezoeker zelf aanmaakt (bewaard in localStorage). Zo werkt de demo op
// een statische site (GitHub Pages) zonder server of database.
//
// LET OP: dit is een demo. Gegevens staan alleen in de browser van de bezoeker,
// niet centraal. Voor een echt systeem is een backend + database nodig.
import { materieel, type Materieel } from '../data/materieel';
import {
  seedReserveringen,
  type Reservering,
  type ReserveringStatus,
} from '../data/reserveringen';

const OPSLAG_SLEUTEL = 'khb_verhuur_v1';
export const BTW_TARIEF = 0.21;

interface OpslagVorm {
  /** Door bezoekers aangemaakte reserveringen. */
  eigen: Reservering[];
  /** Statuswijzigingen door de beheerder, per reservering-id. */
  statusOverrides: Record<string, ReserveringStatus>;
}

function leegOpslag(): OpslagVorm {
  return { eigen: [], statusOverrides: {} };
}

function leesOpslag(): OpslagVorm {
  if (typeof localStorage === 'undefined') return leegOpslag();
  try {
    const ruw = localStorage.getItem(OPSLAG_SLEUTEL);
    if (!ruw) return leegOpslag();
    const data = JSON.parse(ruw) as Partial<OpslagVorm>;
    return {
      eigen: Array.isArray(data.eigen) ? data.eigen : [],
      statusOverrides: data.statusOverrides ?? {},
    };
  } catch {
    return leegOpslag();
  }
}

function schrijfOpslag(data: OpslagVorm): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(OPSLAG_SLEUTEL, JSON.stringify(data));
}

// ── Datum-hulpjes (werken op YYYY-MM-DD strings) ────────────────────────────

export function vandaagISO(): string {
  // We gebruiken de echte datum van de bezoeker.
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

/** Aantal huurdagen (inclusief begin- en einddag). */
export function aantalDagen(start: string, eind: string): number {
  const ms = Date.parse(eind) - Date.parse(start);
  return Math.floor(ms / 86_400_000) + 1;
}

/** Overlappen twee periodes elkaar (inclusief randen)? */
export function overlapt(aStart: string, aEind: string, bStart: string, bEind: string): boolean {
  return aStart <= bEind && bStart <= aEind;
}

const NL_DATUM = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export function datumNL(iso: string): string {
  return NL_DATUM.format(new Date(iso + 'T00:00:00'));
}

export function periodeNL(start: string, eind: string): string {
  return `${datumNL(start)} – ${datumNL(eind)}`;
}

const EURO = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
});

export function euro(bedrag: number): string {
  return EURO.format(bedrag);
}

// ── Afgeleide status ────────────────────────────────────────────────────────

/** Toon-status: leidt 'lopend'/'afgerond' af uit de datums. */
export function weergaveStatus(r: Reservering): ReserveringStatus {
  if (r.status === 'geannuleerd' || r.status === 'aangevraagd') return r.status;
  const nu = vandaagISO();
  if (r.eind < nu) return 'afgerond';
  if (r.start <= nu && nu <= r.eind) return 'lopend';
  return 'gereserveerd';
}

export const STATUS_LABEL: Record<ReserveringStatus, string> = {
  aangevraagd: 'Aangevraagd',
  gereserveerd: 'Gereserveerd',
  lopend: 'Loopt nu',
  afgerond: 'Afgerond',
  geannuleerd: 'Geannuleerd',
};

// ── Reserveringen lezen/schrijven ───────────────────────────────────────────

/** Alle reserveringen (seed + eigen), met beheerders-overrides toegepast. */
export function alleReserveringen(): Reservering[] {
  const opslag = leesOpslag();
  const samen = [...seedReserveringen, ...opslag.eigen];
  return samen.map((r) => {
    const override = opslag.statusOverrides[r.id];
    return override ? { ...r, status: override } : r;
  });
}

/** Reserveringen die "ruimte bezetten" (alles behalve geannuleerd). */
export function bezetteReserveringen(materieelId?: string): Reservering[] {
  return alleReserveringen().filter(
    (r) =>
      weergaveStatus(r) !== 'geannuleerd' &&
      (materieelId ? r.materieelId === materieelId : true),
  );
}

/** Is een materieelstuk vrij in de gevraagde periode? */
export function isBeschikbaar(materieelId: string, start: string, eind: string): boolean {
  return !bezetteReserveringen(materieelId).some((r) => overlapt(start, eind, r.start, r.eind));
}

/** Voeg een nieuwe (bezoekers-)reservering toe. Status: aangevraagd. */
export function voegReserveringToe(invoer: {
  materieelId: string;
  klant: string;
  email: string;
  start: string;
  eind: string;
}): Reservering {
  const opslag = leesOpslag();
  const nieuw: Reservering = {
    id: 'r-' + Date.now().toString(36),
    ...invoer,
    status: 'aangevraagd',
    vanBezoeker: true,
  };
  opslag.eigen.push(nieuw);
  schrijfOpslag(opslag);
  return nieuw;
}

/** Beheerder wijzigt de status van een reservering. */
export function wijzigStatus(id: string, status: ReserveringStatus): void {
  const opslag = leesOpslag();
  opslag.statusOverrides[id] = status;
  schrijfOpslag(opslag);
}

/** Zet de demo terug naar de begintoestand (alleen seed-data). */
export function resetDemo(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(OPSLAG_SLEUTEL);
}

// ── Facturen ────────────────────────────────────────────────────────────────

export interface Factuur {
  reservering: Reservering;
  materieel: Materieel | undefined;
  nummer: string;
  dagen: number;
  dagprijs: number;
  subtotaal: number;
  btw: number;
  totaal: number;
}

export function maakFactuur(r: Reservering): Factuur {
  const m = materieel.find((x) => x.id === r.materieelId);
  const dagen = aantalDagen(r.start, r.eind);
  const dagprijs = m?.dagprijs ?? 0;
  const subtotaal = dagen * dagprijs;
  const btw = Math.round(subtotaal * BTW_TARIEF * 100) / 100;
  const totaal = subtotaal + btw;
  // Factuurnummer: jaar + volgnummer uit het id.
  const jaar = r.start.slice(0, 4);
  const volg = r.id.replace(/\D/g, '').slice(-4).padStart(4, '0');
  return {
    reservering: r,
    materieel: m,
    nummer: `${jaar}-${volg}`,
    dagen,
    dagprijs,
    subtotaal,
    btw,
    totaal,
  };
}

/** Facturen voor alle niet-geannuleerde reserveringen, nieuwste eerst. */
export function alleFacturen(): Factuur[] {
  return bezetteReserveringen()
    .slice()
    .sort((a, b) => b.start.localeCompare(a.start))
    .map(maakFactuur);
}

export function materieelById(id: string): Materieel | undefined {
  return materieel.find((m) => m.id === id);
}

export { materieel };
export type { Reservering, ReserveringStatus, Materieel };
