# Kloosterman Houtbouw — projectoverzicht voor Claude

Website voor **Kloosterman Houtbouw**, een ambachtelijk houtbouwbedrijf uit Doezum
(werkgebied: Groningen & Friesland). Gebouwd met **Astro**. De site is in het Nederlands.

## Doel van de site

- **Projecten tonen** — portfolio van eerdere bouwprojecten (homepage).
- **Info / over ons** — bedrijfsverhaal, specialisaties, werkgebied en contactgegevens.
- **Materieel verhuur** — statische lijst van te huur materieel (géén boekingssysteem,
  bezoekers nemen contact op om te huren).

## Structuur

```
src/
  assets/projecten/   Geoptimaliseerde afbeeldingen (placeholders, vervangbaar)
  components/
    Nav.astro         Gedeelde navigatiebalk (sticky, mobiel hamburger-menu via CSS)
    Footer.astro      Gedeelde footer met contactgegevens
    ProjectCard.astro Kaart voor één project, met geoptimaliseerde <Image>
  data/
    projecten.ts      Lijst met projecten (titel, categorie, beschrijving, afbeelding)
    materieel.ts      Lijst met te huur materieel (naam, omschrijving, prijs)
  layouts/
    Layout.astro      Basis-HTML, <head>, lettertypen, Nav + Footer, <slot/>
  pages/
    index.astro       Pagina 1 — Projecten (homepage) met hero + galerij
    info.astro        Pagina 2 — Info / over ons
    verhuur.astro     Pagina 3 — Materieel verhuur
  styles/
    global.css        Globale stijl + CSS-variabelen (kleuren, lettertypen)
public/
  favicon.svg
scripts/
  generate-placeholders.mjs  Genereert de placeholder-afbeeldingen (eenmalig)
```

## Stijl & uitstraling

Warme, ambachtelijke houtbouw-look met natuurlijke kleuren. Alle kleuren en lettertypen
staan als CSS-variabelen in `src/styles/global.css`:

- **Kleuren**: warm hout (`--kleur-hout`), donkergroen (`--kleur-groen`), crème (`--kleur-creme`).
- **Lettertypen**: `Bitter` (serif, karaktervol) voor koppen, `Source Sans 3` voor body —
  geladen via Google Fonts in `Layout.astro`.
- **Responsive**: mobile-first; de meeste bezoekers komen op mobiel. Galerijen gebruiken
  CSS-grid met `auto-fill`/`auto-fit`; de navigatie klapt onder 720px in tot een hamburgermenu.

## Afbeeldingen

We gebruiken Astro's ingebouwde beeldoptimalisatie via `astro:assets` (`<Image>`), met
`sharp` als backend. Afbeeldingen staan in `src/assets/` en worden geïmporteerd in de
datafiles. De huidige bestanden zijn **placeholders**; vervang ze door echte foto's met
dezelfde bestandsnaam, dan werkt de rest vanzelf.

## Inhoud aanpassen

- **Project toevoegen/wijzigen** → `src/data/projecten.ts` (en zet de foto in `src/assets/projecten/`).
- **Materieel toevoegen/wijzigen** → `src/data/materieel.ts` (naam, omschrijving, dagprijs).
- **Bedrijfsgegevens** (naam, adres, KvK, btw, IBAN, e-mail) → centraal in
  `src/data/bedrijf.ts`; worden o.a. op de PDF-factuur gebruikt.

## Verhuur-demo (reserveren + beheer)

- **`src/pages/verhuur.astro`** — publieke reserveringspagina: formulier met live
  beschikbaarheidscheck en prijsindicatie, plus planning per materieel.
- **`src/pages/beheer.astro`** — beheeromgeving (demo-login `admin`/`admin`):
  kerncijfers, planning-tijdbalk, reserveringentabel en facturen met **Download PDF**.
- **`src/scripts/verhuurStore.ts`** — client-side "store": seed-reserveringen
  (`src/data/reserveringen.ts`) + eigen reserveringen in `localStorage`, plus
  beschikbaarheid, status en factuurberekening.
- **`src/scripts/factuurPdf.ts`** — opent een printbare factuur (→ "Bewaren als PDF").

> Let op: dit is een **demo**. Reserveringen staan alleen in de browser, niet centraal,
> en de login is geen echte beveiliging. Voor een productiesysteem is een backend nodig.

### Aanvraagformulier echt laten mailen (Formspree)

Het reserveringsformulier verstuurt aanvragen naar de mailbox. Zonder configuratie
opent het een vooraf ingevulde e-mail (`mailto`). Voor automatische verzending:
maak gratis een formulier op [formspree.io](https://formspree.io) en zet het
endpoint in `src/data/bedrijf.ts` bij `formspreeEndpoint`.

## Commando's

```bash
npm install      # dependencies installeren
npm run dev      # lokale ontwikkelserver
npm run build    # productie-build naar dist/
npm run preview  # build lokaal bekijken
```
