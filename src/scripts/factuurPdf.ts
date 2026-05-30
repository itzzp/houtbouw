// Opent een nette, printbare factuur in een nieuw venster en start de
// print-dialoog. De gebruiker kiest daar "Bewaren als PDF". Zo hebben we
// PDF-facturen zonder externe library of server.
import { bedrijf } from '../data/bedrijf';
import { weergaveStatus, STATUS_LABEL, periodeNL, datumNL, euro, vandaagISO } from './verhuurStore';
import type { Factuur } from './verhuurStore';

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

export function openFactuurPdf(f: Factuur): void {
  const st = weergaveStatus(f.reservering);
  const r = f.reservering;
  const matNaam = f.materieel?.naam ?? r.materieelId;
  const vandaag = datumNL(vandaagISO());

  const html = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8" />
<title>Factuur ${esc(f.nummer)} — ${esc(bedrijf.naam)}</title>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #2c241c;
    margin: 0;
    padding: 40px;
    font-size: 14px;
    line-height: 1.5;
  }
  .kop { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #b01e17; padding-bottom: 16px; }
  .merk { font-size: 22px; font-weight: 800; color: #b01e17; }
  .merk small { display: block; font-size: 13px; font-weight: 400; font-style: italic; color: #6b4423; }
  .bedrijf { text-align: right; font-size: 12px; color: #5b4f42; }
  h1 { font-size: 20px; margin: 28px 0 4px; }
  .meta { display: flex; justify-content: space-between; margin-bottom: 24px; font-size: 13px; }
  .meta .label { color: #8a7a68; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  th { text-align: left; background: #f4ece0; padding: 9px 10px; font-size: 12px; text-transform: uppercase; letter-spacing: .03em; }
  td { padding: 9px 10px; border-bottom: 1px solid #e8dcc8; }
  td.bedrag, th.bedrag { text-align: right; }
  .totaal-rij td { font-weight: 700; border-top: 2px solid #b01e17; border-bottom: none; font-size: 15px; }
  .status { display: inline-block; padding: 3px 10px; border-radius: 999px; background: #b01e17; color: #fff; font-size: 11px; }
  .voet { margin-top: 36px; padding-top: 14px; border-top: 1px solid #e8dcc8; font-size: 11px; color: #8a7a68; }
  .betaal { margin-top: 22px; font-size: 13px; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
  <div class="kop">
    <div class="merk">Kloosterman bouw<small>en houtbewerking</small></div>
    <div class="bedrijf">
      ${esc(bedrijf.adres)}<br />
      ${esc(bedrijf.postcode)} ${esc(bedrijf.plaats)}<br />
      Tel. ${esc(bedrijf.telefoon)}<br />
      ${esc(bedrijf.email)}<br />
      KvK ${esc(bedrijf.kvk)} · BTW ${esc(bedrijf.btw)}
    </div>
  </div>

  <h1>Factuur ${esc(f.nummer)}</h1>
  <div class="meta">
    <div>
      <div class="label">Aan</div>
      <strong>${esc(r.klant)}</strong><br />
      ${esc(r.email)}
    </div>
    <div style="text-align:right">
      <div class="label">Factuurdatum</div>
      ${esc(vandaag)}<br />
      <span class="status">${esc(STATUS_LABEL[st])}</span>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Omschrijving</th>
        <th>Periode</th>
        <th class="bedrag">Dagen</th>
        <th class="bedrag">Per dag</th>
        <th class="bedrag">Bedrag</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Verhuur ${esc(matNaam)}</td>
        <td>${esc(periodeNL(r.start, r.eind))}</td>
        <td class="bedrag">${f.dagen}</td>
        <td class="bedrag">${esc(euro(f.dagprijs))}</td>
        <td class="bedrag">${esc(euro(f.subtotaal))}</td>
      </tr>
      <tr>
        <td colspan="4">Subtotaal (excl. btw)</td>
        <td class="bedrag">${esc(euro(f.subtotaal))}</td>
      </tr>
      <tr>
        <td colspan="4">Btw 21%</td>
        <td class="bedrag">${esc(euro(f.btw))}</td>
      </tr>
      <tr class="totaal-rij">
        <td colspan="4">Totaal te voldoen</td>
        <td class="bedrag">${esc(euro(f.totaal))}</td>
      </tr>
    </tbody>
  </table>

  <p class="betaal">
    Gelieve het totaalbedrag over te maken op <strong>${esc(bedrijf.iban)}</strong>
    t.n.v. ${esc(bedrijf.naam)}, o.v.v. factuurnummer ${esc(f.nummer)}.
  </p>

  <div class="voet">
    ${esc(bedrijf.naam)} · ${esc(bedrijf.adres)}, ${esc(bedrijf.postcode)} ${esc(bedrijf.plaats)} ·
    ${esc(bedrijf.telefoon)} · ${esc(bedrijf.email)} · IBAN ${esc(bedrijf.iban)}
  </div>

  <script>
    window.addEventListener('load', function () {
      setTimeout(function () { window.print(); }, 200);
    });
  </script>
</body>
</html>`;

  const w = window.open('', '_blank');
  if (!w) {
    alert('Sta pop-ups toe om de factuur te openen.');
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
}
