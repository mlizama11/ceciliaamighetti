export interface ArchivalPhoto {
  id: string;
  image: string;
  imagePreview?: string;
  titleEn: string;
  titleEs: string;
  year: string;
  descEn: string;
  descEs: string;
  category: 'youth' | 'academy' | 'social' | 'nature' | 'music' | 'publication';
  aspectRatio: number;
  highlight?: boolean;
}

export const archivalPhotos: ArchivalPhoto[] = [
  {
    id: 'photo-15',
    image: '/photos/cecilia15.jpg',
    titleEn: 'The Little Ballerina (Autobiographical Root)',
    titleEs: 'La pequeña bailarina (Raíz autobiográfica)',
    year: 'c. 1942',
    descEn:
      'Childhood photograph of Cecilia in a ballerina tutu dress and pointe slippers. This early devotion to dance was the direct life root of her most iconic recurring motif: girls dancing in front of mirrors and with death.',
    descEs:
      'Fotografía de infancia de Cecilia en tutú de ballet y zapatillas de punta. Esta temprana vivencia de la danza fue la raíz vital de su motivo pictórico más célebre: niñas danzando frente al espejo y bailando con la muerte.',
    category: 'youth',
    aspectRatio: 618 / 891,
    highlight: true
  },
  {
    id: 'photo-16',
    image: '/photos/cecilia16.jpg',
    imagePreview: '/photos/cecilia16-preview.webp',
    titleEn: 'Sculpting in the Atelier (Fine Arts Academy)',
    titleEs: 'Modelando en el taller de escultura',
    year: 'c. 1954',
    descEn:
      'Historic photograph of young Cecilia in her artist apron, sculpting a clay portrait head on a modeling stand in the fine arts academy, with classical plaster busts in the background.',
    descEs:
      'Fotografía histórica de Cecilia joven en delantal de artista, esculpiendo un busto de arcilla sobre el atril en la academia de Bellas Artes, con vaciados clásicos al fondo.',
    category: 'academy',
    aspectRatio: 480 / 673,
    highlight: true
  },
  {
    id: 'photo-05',
    image: '/photos/cecilia05.jpg',
    titleEn: 'Song, Guitar and Heartfelt Laughter',
    titleEs: 'Guitarra, canto y risa franca',
    year: 'c. 1990',
    descEn:
      'Cecilia laughing with her guitar, singing folk ballads and boleros in an intimate gathering. This is the singer Cecilia, whom you can hear in the archival audio accompanying this website.',
    descEs:
      'Cecilia riendo a carcajadas con la guitarra, cantando canciones folclóricas y boleros en una tertulia íntima. Esa es la Cecilia cantante, que pueden escucharla en el audio de archivo que acompaña esta web.',
    category: 'music',
    aspectRatio: 1113 / 748,
    highlight: true
  },
  {
    id: 'photo-inamu-portrait',
    image: '/photos/portrait-inamu-2007.jpg',
    titleEn: 'Official Portrait — Mujeres Destacadas (INAMU)',
    titleEs: 'Retrato oficial — Mujeres Destacadas (INAMU)',
    year: '2007',
    descEn:
      'Official portrait of Cecilia Amighetti wearing her signature turquoise blue shawl, published in the landmark national biographical volume "Mujeres Destacadas de Costa Rica" by INAMU.',
    descEs:
      'Retrato oficial de Cecilia Amighetti luciendo su emblemática chalina azul turquesa, publicado en la obra biográfica de homenaje «Mujeres Destacadas de Costa Rica» del INAMU.',
    category: 'publication',
    aspectRatio: 960 / 1280,
    highlight: true
  },
  {
    id: 'photo-inamu-illustration',
    image: '/photos/inamu-book-illustration.jpg',
    titleEn: 'Illustration at the Easel — Cuentos de Mujeres Ilustres',
    titleEs: 'Ilustración en el caballete — Cuentos de Mujeres Ilustres',
    year: 'INAMU',
    descEn:
      'Full-page biographical illustration showing Cecilia Amighetti at her easel with wooden palette and landscape sketches, published in the educational book "Cuentos de Mujeres Ilustres".',
    descEs:
      'Ilustración a página completa que retrata a Cecilia Amighetti ante su caballete con paleta de pintor y bocetos de paisajes, publicada en el libro didáctico «Cuentos de Mujeres Ilustres».',
    category: 'publication',
    aspectRatio: 1980 / 2904,
    highlight: true
  },
  {
    id: 'photo-09',
    image: '/photos/cecilia09.jpg',
    imagePreview: '/photos/cecilia09-preview.webp',
    titleEn: 'Costa Rican Folkloric White Gown',
    titleEs: 'Traje típico y corona de rosas',
    year: 'c. 1946',
    descEn:
      'Adolescent Cecilia wearing an embroidered traditional Costa Rican folkloric white dress, black velvet ribbon choker, and flower crown, reflecting the folk roots nurtured by her mother Emilia Prieto.',
    descEs:
      'Cecilia en su adolescencia con traje típico tradicional costarricense bordado, gargantilla de terciopelo y corona de rosas blancas, reflejo del amor al folclore transmitido por su madre Emilia Prieto.',
    category: 'youth',
    aspectRatio: 693 / 1050
  },
  {
    id: 'photo-02',
    image: '/photos/cecilia02.jpg',
    titleEn: 'Youth Studio Portrait with Pearls',
    titleEs: 'Retrato de juventud con perlas',
    year: 'c. 1955',
    descEn:
      'Classic photographic portrait of young Cecilia in a polka-dot dress and pearl drop earrings, showing her poised, thoughtful expression.',
    descEs:
      'Retrato clásico de estudio de Cecilia joven, luciendo vestido a lunares y aretes de perla con su mirada serena y reflexiva.',
    category: 'youth',
    aspectRatio: 555 / 742
  },
  {
    id: 'photo-01',
    image: '/photos/cecilia01.jpg',
    titleEn: 'Motherhood in the Hibiscus Garden',
    titleEs: 'Maternidad en el jardín de hibiscos',
    year: 'c. 1960',
    descEn:
      'Cecilia as a young mother cradling her baby Liana in a garden of blooming red hibiscus flowers in San José.',
    descEs:
      'Cecilia joven como madre tierna acunando a su bebé Liana en un jardín lleno de amapolas e hibiscos en flor en San José.',
    category: 'nature',
    aspectRatio: 595 / 432
  },
  {
    id: 'photo-04',
    image: '/photos/cecilia04.jpg',
    imagePreview: '/photos/cecilia04-preview.webp',
    titleEn: 'Latin American Higher Education Summit',
    titleEs: 'Reunión Latinoamericana de Educación Post-Secundaria',
    year: 'c. 1976',
    descEn:
      'Historic photograph from the Latin American and Caribbean Meeting on New Forms of Post-Secondary Education, documenting Cecilia’s visionary leadership in progressive higher education.',
    descEs:
      'Fotografía histórica oficial de la Reunión Latinoamericana y del Caribe sobre Nuevas Formas de Educación Post-Secundaria, que documenta el liderazgo de Cecilia en la vanguardia educativa.',
    category: 'social',
    aspectRatio: 1910 / 1481
  },
  {
    id: 'photo-07',
    image: '/photos/cecilia07.jpg',
    titleEn: 'Under the Rainforest Waterfall',
    titleEs: 'Bajo la cascada viva',
    year: 'c. 1995',
    descEn:
      'Cecilia seated on sunlit river stones beneath a rushing Costa Rican waterfall, celebrating her deep organic bond with rainforest water and natural light.',
    descEs:
      'Cecilia sonriendo sobre las rocas de una impetuosa cascada costarricense, celebrando su conexión entrañable con el agua viva y la luz de la naturaleza.',
    category: 'nature',
    aspectRatio: 757 / 1106
  },
  {
    id: 'photo-12',
    image: '/photos/cecilia12.jpg',
    titleEn: 'Gala Evening with Fur Stole and Gloves',
    titleEs: 'Noche de gala con estola y guantes',
    year: 'c. 1958',
    descEn:
      'Cecilia attending a formal cultural banquet in an evening gown with a leopard-print fur stole, opera gloves, and evening bag alongside distinguished guests.',
    descEs:
      'Cecilia en una recepción de gala luciendo estola de piel de leopardo, guantes largos y vestido de fiesta junto a invitados de etiqueta.',
    category: 'social',
    aspectRatio: 1266 / 905
  },
  {
    id: 'photo-11',
    image: '/photos/cecilia11.jpg',
    titleEn: 'Art & Diplomacy Reception',
    titleEs: 'Tertulia de arte y diplomacia',
    year: 'c. 1963',
    descEn:
      'Cecilia in a chic black cocktail dress and beret conversing and toasting with diplomats and intellectuals at an exhibition preview.',
    descEs:
      'Cecilia con boina y elegante vestido negro de cóctel conversando y brindando con diplomáticos y pensadores en una inauguración artística.',
    category: 'social',
    aspectRatio: 883 / 581
  },
  {
    id: 'photo-10',
    image: '/photos/cecilia10.jpg',
    titleEn: 'Ceremonial White Gown & Chignon',
    titleEs: 'Elegancia ceremonial en blanco',
    year: 'c. 1962',
    descEn:
      'Ceremonial portrait of young Cecilia in a draped white gown and grand chignon hairstyle during an official academic celebration.',
    descEs:
      'Retrato de Cecilia en traje ceremonial blanco drapeado y elaborado peinado en chignon durante un acto oficial de honor.',
    category: 'social',
    aspectRatio: 852 / 1280
  },
  {
    id: 'photo-13',
    image: '/photos/cecilia13.jpg',
    titleEn: 'By the Open Studio Window',
    titleEs: 'Junto a la ventana abierta del taller',
    year: 'c. 1956',
    descEn:
      'Graceful portrait of Cecilia standing by an open window in an off-the-shoulder evening dress and pearls, next to a studio houseplant.',
    descEs:
      'Retrato sereno de Cecilia junto a la ventana en vestido negro escote barco y perlas, con una planta del taller al lado.',
    category: 'youth',
    aspectRatio: 742 / 1111
  },
  {
    id: 'photo-14',
    image: '/photos/cecilia14.jpg',
    titleEn: 'Estudio Cabezas Portrait',
    titleEs: 'Retrato de juventud — Estudio Cabezas',
    year: 'c. 1952',
    descEn:
      'Vintage half-profile studio portrait with floral blouse, bearing the historic blind-stamp of Estudio Cabezas in San José, Costa Rica.',
    descEs:
      'Retrato fotográfico de juventud de medio perfil con blusa estampada, con el histórico sello en relieve de Estudio Cabezas en San José.',
    category: 'youth',
    aspectRatio: 592 / 905
  },
  {
    id: 'photo-17',
    image: '/photos/cecilia17.jpg',
    titleEn: 'Youth School Marching Band Uniform',
    titleEs: 'Uniforme de gala escolar con morrión',
    year: 'c. 1948',
    descEn:
      'Young Cecilia in her school marching band parade uniform with tall shako hat and gold braided tunic.',
    descEs:
      'Cecilia joven en su uniforme escolar de gala para desfiles patrios, con morrión alto y casaca abotonada con alamares.',
    category: 'youth',
    aspectRatio: 516 / 944
  },
  {
    id: 'photo-08',
    image: '/photos/cecilia08.jpg',
    titleEn: 'Joyful Gathering in Red & Blue',
    titleEs: 'Alegría compartida en rojo y azul',
    year: 'c. 2002',
    descEn:
      'Warm candid photo of Cecilia clapping enthusiastically in a red blouse and artisanal blue scarf alongside companions at a joyful gathering.',
    descEs:
      'Fotografía espontánea y cálida de Cecilia aplaudiendo alegremente con blusa roja y chalina azul junto a seres queridos en una mesa de celebración.',
    category: 'social',
    aspectRatio: 1129 / 722
  },
  {
    id: 'photo-03',
    image: '/photos/cecilia03.jpg',
    titleEn: 'Nighttime Smile',
    titleEs: 'Sonrisa en la penumbra',
    year: 'c. 1968',
    descEn:
      'Portrait of Cecilia smiling warmly in the soft light of an evening cultural reception.',
    descEs: 'Retrato de Cecilia sonriendo con calidez a la luz suave de una velada cultural.',
    category: 'social',
    aspectRatio: 733 / 827
  },
  {
    id: 'photo-06',
    image: '/photos/cecilia06.jpg',
    titleEn: 'Peaceful Slumber in Yellow Shawl',
    titleEs: 'Placidez y cobijo en amarillo',
    year: 'c. 2004',
    descEn:
      'Gentle, tender close-up of Cecilia resting peacefully, wrapped in a soft warm yellow towel and shawl.',
    descEs:
      'Tierno primer plano de Cecilia descansando en serena calma, arropada con un suave chal amarillo.',
    category: 'nature',
    aspectRatio: 731 / 1119
  }
];
