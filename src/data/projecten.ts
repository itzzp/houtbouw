// Voorbeeldprojecten voor het portfolio-overzicht.
// Vervang de afbeeldingen in src/assets/projecten/ door echte foto's
// (zelfde bestandsnaam) en pas de teksten hieronder aan.
import type { ImageMetadata } from 'astro';

import houtskeletbouw from '../assets/projecten/houtskeletbouw-woning.jpg';
import veranda from '../assets/projecten/veranda-overkapping.jpg';
import schuur from '../assets/projecten/schuur.jpg';
import dakkapel from '../assets/projecten/dakkapel.jpg';
import tuinkantoor from '../assets/projecten/tuinkantoor.jpg';

export interface Project {
  titel: string;
  categorie: string;
  beschrijving: string;
  afbeelding: ImageMetadata;
  alt: string;
}

export const projecten: Project[] = [
  {
    titel: 'Houtskeletbouw woning',
    categorie: 'Nieuwbouw',
    beschrijving:
      'Een complete, goed geïsoleerde gezinswoning opgebouwd in houtskeletbouw. Snel wind- en waterdicht, duurzaam en energiezuinig.',
    afbeelding: houtskeletbouw,
    alt: 'Houtskeletbouw woning gebouwd door Kloosterman bouw en houtbewerking',
  },
  {
    titel: 'Veranda met overkapping',
    categorie: 'Buitenleven',
    beschrijving:
      'Een sfeervolle houten veranda met stevige overkapping, op maat gemaakt zodat je het hele jaar buiten kunt zitten.',
    afbeelding: veranda,
    alt: 'Houten veranda met overkapping',
  },
  {
    titel: 'Houten schuur',
    categorie: 'Bijgebouw',
    beschrijving:
      'Een robuuste schuur met houten gevelbekleding, geschikt voor opslag, dieren of als werkplaats. Volledig naar wens ingedeeld.',
    afbeelding: schuur,
    alt: 'Houten schuur met gevelbekleding',
  },
  {
    titel: 'Dakkapel',
    categorie: 'Verbouw',
    beschrijving:
      'Een dakkapel die in één dag wordt geplaatst en direct meer ruimte en licht geeft op de verdieping. Strak afgewerkt en goed geïsoleerd.',
    afbeelding: dakkapel,
    alt: 'Geplaatste dakkapel op een woning',
  },
  {
    titel: 'Tuinkantoor',
    categorie: 'Buitenleven',
    beschrijving:
      'Een vrijstaand, geïsoleerd tuinkantoor — een rustige, comfortabele werkplek in je eigen tuin, het hele jaar door te gebruiken.',
    afbeelding: tuinkantoor,
    alt: 'Vrijstaand houten tuinkantoor',
  },
];
