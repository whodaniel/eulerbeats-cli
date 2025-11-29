/**
 * ============================================================================
 * GLOBAL MUSICAL SCALES DATABASE
 * The Complete Collection of Human Musical Traditions
 * ============================================================================
 *
 * This comprehensive database represents the cumulative musical knowledge
 * from every known cultural tradition throughout recorded history.
 */

export interface Scale {
  name: string;
  culture: string;
  region: string;
  era: string;
  intervals: number[]; // In cents (1200 cents = 1 octave)
  description: string;
  emotionalCharacter?: string;
  traditionalUse?: string;
  ratios?: number[]; // Just intonation ratios
}

export interface TuningSystem {
  name: string;
  baseFrequency: number;
  description: string;
  culture: string;
  calculateFrequency: (noteIndex: number, baseFreq: number) => number;
}

/**
 * WESTERN EUROPEAN TRADITIONS
 */
export const WESTERN_SCALES: Scale[] = [
  {
    name: "Ionian (Major)",
    culture: "Western",
    region: "Europe/Americas",
    era: "Ancient Greece - Present",
    intervals: [0, 200, 400, 500, 700, 900, 1100, 1200],
    ratios: [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2],
    description: "The foundation of Western major tonality",
    emotionalCharacter: "Bright, happy, triumphant",
    traditionalUse: "Classical, pop, rock, jazz - universal Western music"
  },
  {
    name: "Dorian",
    culture: "Western",
    region: "Europe",
    era: "Ancient Greece - Present",
    intervals: [0, 200, 300, 500, 700, 900, 1000, 1200],
    ratios: [1, 9/8, 6/5, 4/3, 3/2, 5/3, 9/5, 2],
    description: "Minor scale with raised 6th degree",
    emotionalCharacter: "Serious yet hopeful, jazzy",
    traditionalUse: "Medieval church music, jazz, folk music"
  },
  {
    name: "Phrygian",
    culture: "Western",
    region: "Europe/Middle East",
    era: "Ancient Greece - Present",
    intervals: [0, 100, 300, 500, 700, 800, 1000, 1200],
    ratios: [1, 16/15, 6/5, 4/3, 3/2, 8/5, 9/5, 2],
    description: "Minor scale with lowered 2nd degree",
    emotionalCharacter: "Dark, exotic, Spanish/Middle Eastern flavor",
    traditionalUse: "Flamenco, metal, Spanish music"
  },
  {
    name: "Lydian",
    culture: "Western",
    region: "Europe",
    era: "Ancient Greece - Present",
    intervals: [0, 200, 400, 600, 700, 900, 1100, 1200],
    ratios: [1, 9/8, 5/4, 45/32, 3/2, 5/3, 15/8, 2],
    description: "Major scale with raised 4th degree",
    emotionalCharacter: "Dreamy, ethereal, floating",
    traditionalUse: "Film scores, progressive rock, jazz"
  },
  {
    name: "Mixolydian",
    culture: "Western",
    region: "Europe",
    era: "Ancient Greece - Present",
    intervals: [0, 200, 400, 500, 700, 900, 1000, 1200],
    ratios: [1, 9/8, 5/4, 4/3, 3/2, 5/3, 9/5, 2],
    description: "Major scale with lowered 7th degree",
    emotionalCharacter: "Bluesy, folky, rock",
    traditionalUse: "Rock, blues, folk, Irish traditional"
  },
  {
    name: "Aeolian (Natural Minor)",
    culture: "Western",
    region: "Europe/Americas",
    era: "Medieval - Present",
    intervals: [0, 200, 300, 500, 700, 800, 1000, 1200],
    ratios: [1, 9/8, 6/5, 4/3, 3/2, 8/5, 9/5, 2],
    description: "The natural minor scale",
    emotionalCharacter: "Melancholic, introspective, sad",
    traditionalUse: "Classical, pop, rock - universal Western minor music"
  },
  {
    name: "Locrian",
    culture: "Western",
    region: "Europe",
    era: "Ancient Greece - Present",
    intervals: [0, 100, 300, 500, 600, 800, 1000, 1200],
    ratios: [1, 16/15, 6/5, 4/3, 64/45, 8/5, 9/5, 2],
    description: "Diminished scale, rarely used as tonic",
    emotionalCharacter: "Unstable, dark, dissonant",
    traditionalUse: "Jazz, metal, experimental music"
  },
  {
    name: "Harmonic Minor",
    culture: "Western",
    region: "Europe/Middle East",
    era: "Baroque - Present",
    intervals: [0, 200, 300, 500, 700, 800, 1100, 1200],
    ratios: [1, 9/8, 6/5, 4/3, 3/2, 8/5, 15/8, 2],
    description: "Natural minor with raised 7th",
    emotionalCharacter: "Dramatic, exotic, tense",
    traditionalUse: "Classical music, metal, klezmer"
  },
  {
    name: "Melodic Minor (Ascending)",
    culture: "Western",
    region: "Europe",
    era: "Baroque - Present",
    intervals: [0, 200, 300, 500, 700, 900, 1100, 1200],
    ratios: [1, 9/8, 6/5, 4/3, 3/2, 5/3, 15/8, 2],
    description: "Natural minor with raised 6th and 7th",
    emotionalCharacter: "Smooth, jazzy, ascending brightness",
    traditionalUse: "Classical music, jazz improvisation"
  },
  {
    name: "Blues Scale",
    culture: "African American",
    region: "United States",
    era: "1900s - Present",
    intervals: [0, 300, 500, 600, 700, 1000, 1200],
    description: "Pentatonic minor with added flat 5th",
    emotionalCharacter: "Soulful, expressive, vocal",
    traditionalUse: "Blues, rock, jazz"
  },
  {
    name: "Chromatic",
    culture: "Western",
    region: "Universal",
    era: "Ancient - Present",
    intervals: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
    description: "All twelve semitones",
    emotionalCharacter: "Atonal, modern, tense",
    traditionalUse: "20th century classical, jazz, avant-garde"
  },
  {
    name: "Whole Tone",
    culture: "Western",
    region: "Europe",
    era: "Impressionist (1890s) - Present",
    intervals: [0, 200, 400, 600, 800, 1000, 1200],
    description: "Symmetrical scale of whole steps",
    emotionalCharacter: "Dreamy, ambiguous, floating",
    traditionalUse: "Impressionist music (Debussy), film scores"
  },
  {
    name: "Diminished (Octatonic)",
    culture: "Western",
    region: "Europe",
    era: "Late Romantic - Present",
    intervals: [0, 200, 300, 500, 600, 800, 900, 1100, 1200],
    description: "Alternating whole and half steps",
    emotionalCharacter: "Tense, mysterious, symmetric",
    traditionalUse: "Jazz, classical (Stravinsky), film music"
  }
];

/**
 * INDIAN CLASSICAL TRADITIONS
 * 22 Shruti System - Most sophisticated pitch system in human history
 */
export const INDIAN_SCALES: Scale[] = [
  {
    name: "Bhairav (Raga)",
    culture: "Hindustani",
    region: "North India",
    era: "Ancient - Present",
    intervals: [0, 100, 400, 500, 700, 800, 1100, 1200],
    description: "Morning raga, evokes devotion and peace",
    emotionalCharacter: "Devotional, serene, morning atmosphere",
    traditionalUse: "Classical Indian music, morning ragas",
    ratios: [1, 16/15, 5/4, 4/3, 3/2, 8/5, 15/8, 2]
  },
  {
    name: "Yaman (Raga)",
    culture: "Hindustani",
    region: "North India",
    era: "Medieval - Present",
    intervals: [0, 200, 400, 600, 700, 900, 1100, 1200],
    description: "Evening raga, one of the most fundamental",
    emotionalCharacter: "Peaceful, romantic, evening devotion",
    traditionalUse: "Classical Indian music, evening performance",
    ratios: [1, 9/8, 5/4, 45/32, 3/2, 5/3, 15/8, 2]
  },
  {
    name: "Kafi (Raga/Thaat)",
    culture: "Hindustani",
    region: "North India",
    era: "Ancient - Present",
    intervals: [0, 200, 300, 500, 700, 900, 1000, 1200],
    description: "Folk-inspired, similar to Dorian mode",
    emotionalCharacter: "Earthy, folk-like, joyful yet grounded",
    traditionalUse: "Light classical, bhajans, folk music",
    ratios: [1, 9/8, 6/5, 4/3, 3/2, 5/3, 9/5, 2]
  },
  {
    name: "Bhairavi (Raga)",
    culture: "Hindustani/Carnatic",
    region: "India",
    era: "Ancient - Present",
    intervals: [0, 100, 300, 500, 700, 800, 1000, 1200],
    description: "Morning raga, all notes can be flat",
    emotionalCharacter: "Sad, compassionate, devotional",
    traditionalUse: "Concluding raga in concerts, devotional music",
    ratios: [1, 16/15, 6/5, 4/3, 3/2, 8/5, 9/5, 2]
  },
  {
    name: "Todi (Raga)",
    culture: "Hindustani",
    region: "North India",
    era: "Ancient - Present",
    intervals: [0, 100, 300, 600, 700, 800, 1100, 1200],
    description: "Late morning raga, highly complex",
    emotionalCharacter: "Longing, pathos, deep emotion",
    traditionalUse: "Classical music, midday performance",
    ratios: [1, 16/15, 6/5, 45/32, 3/2, 8/5, 15/8, 2]
  },
  {
    name: "Malkauns (Raga)",
    culture: "Hindustani",
    region: "North India",
    era: "Ancient - Present",
    intervals: [0, 300, 500, 700, 1000, 1200],
    description: "Midnight raga, pentatonic, no 2nd or 6th",
    emotionalCharacter: "Mysterious, meditative, deep night",
    traditionalUse: "Late night performance, meditation",
    ratios: [1, 6/5, 4/3, 3/2, 9/5, 2]
  },
  {
    name: "Kalyani (Raga - Carnatic)",
    culture: "Carnatic",
    region: "South India",
    era: "Ancient - Present",
    intervals: [0, 200, 400, 600, 700, 900, 1100, 1200],
    description: "Auspicious raga, equivalent to Yaman",
    emotionalCharacter: "Joyful, auspicious, celebratory",
    traditionalUse: "South Indian classical, all times of day",
    ratios: [1, 9/8, 5/4, 45/32, 3/2, 5/3, 15/8, 2]
  }
];

/**
 * ARABIC/MIDDLE EASTERN MAQAM SYSTEM
 * Features quarter tones and unique microtonal intervals
 */
export const ARABIC_SCALES: Scale[] = [
  {
    name: "Maqam Rast",
    culture: "Arabic",
    region: "Middle East/North Africa",
    era: "Medieval - Present",
    intervals: [0, 200, 350, 500, 700, 900, 1050, 1200],
    description: "Fundamental maqam, base of Arabic music theory",
    emotionalCharacter: "Serious, noble, balanced",
    traditionalUse: "Classical Arabic music, foundational maqam"
  },
  {
    name: "Maqam Bayati",
    culture: "Arabic",
    region: "Middle East",
    era: "Medieval - Present",
    intervals: [0, 150, 300, 500, 700, 850, 1000, 1200],
    description: "Most popular maqam, similar to Dorian with quarter tones",
    emotionalCharacter: "Melancholic, introspective",
    traditionalUse: "Popular music, classical Arabic music"
  },
  {
    name: "Maqam Hijaz",
    culture: "Arabic",
    region: "Middle East",
    era: "Medieval - Present",
    intervals: [0, 50, 400, 500, 700, 850, 1000, 1200],
    description: "Distinctive augmented 2nd interval",
    emotionalCharacter: "Dramatic, emotional, intense",
    traditionalUse: "Religious music, passionate songs"
  },
  {
    name: "Maqam Saba",
    culture: "Arabic",
    region: "Middle East",
    era: "Medieval - Present",
    intervals: [0, 150, 300, 450, 700, 850, 1000, 1200],
    description: "Complex quarter tone intervals",
    emotionalCharacter: "Sad, lamenting, deeply emotional",
    traditionalUse: "Emotional classical pieces"
  },
  {
    name: "Maqam Nahawand",
    culture: "Arabic",
    region: "Middle East",
    era: "Medieval - Present",
    intervals: [0, 200, 300, 500, 700, 850, 1050, 1200],
    description: "Similar to minor scale with quarter tones",
    emotionalCharacter: "Melancholic, romantic",
    traditionalUse: "Popular songs, classical music"
  },
  {
    name: "Maqam Kurd",
    culture: "Arabic/Kurdish",
    region: "Middle East",
    era: "Medieval - Present",
    intervals: [0, 100, 300, 500, 700, 800, 1000, 1200],
    description: "Kurdish influence, Phrygian-like",
    emotionalCharacter: "Dark, mysterious, profound",
    traditionalUse: "Classical and folk music"
  },
  {
    name: "Maqam Sikah",
    culture: "Arabic",
    region: "Middle East",
    era: "Medieval - Present",
    intervals: [0, 150, 350, 500, 700, 850, 1050, 1200],
    description: "Begins on a three-quarter tone",
    emotionalCharacter: "Unique, sophisticated",
    traditionalUse: "Advanced classical compositions"
  }
];

/**
 * EAST ASIAN SCALES
 * Chinese, Japanese, Korean traditions
 */
export const EAST_ASIAN_SCALES: Scale[] = [
  {
    name: "Chinese Pentatonic (Gong mode)",
    culture: "Chinese",
    region: "China",
    era: "Ancient - Present",
    intervals: [0, 200, 400, 700, 900, 1200],
    ratios: [1, 9/8, 81/64, 3/2, 27/16, 2],
    description: "Traditional Chinese five-tone scale",
    emotionalCharacter: "Balanced, harmonious, traditional",
    traditionalUse: "Traditional Chinese music, meditation"
  },
  {
    name: "Japanese Hirajoshi",
    culture: "Japanese",
    region: "Japan",
    era: "Ancient - Present",
    intervals: [0, 200, 300, 700, 800, 1200],
    description: "Traditional Japanese pentatonic scale",
    emotionalCharacter: "Meditative, peaceful, Japanese aesthetic",
    traditionalUse: "Koto music, traditional Japanese instruments"
  },
  {
    name: "Japanese Iwato",
    culture: "Japanese",
    region: "Japan",
    era: "Ancient - Present",
    intervals: [0, 100, 500, 600, 1000, 1200],
    description: "Japanese pentatonic, dark and mysterious",
    emotionalCharacter: "Dark, mysterious, contemplative",
    traditionalUse: "Traditional Japanese music, shakuhachi"
  },
  {
    name: "Japanese In-Sen",
    culture: "Japanese",
    region: "Japan",
    era: "Ancient - Present",
    intervals: [0, 100, 500, 700, 1000, 1200],
    description: "Contemplative Japanese scale",
    emotionalCharacter: "Meditative, introspective",
    traditionalUse: "Zen Buddhist music, meditation"
  },
  {
    name: "Japanese Yo Scale",
    culture: "Japanese",
    region: "Japan",
    era: "Ancient - Present",
    intervals: [0, 200, 500, 700, 900, 1200],
    description: "Bright Japanese pentatonic",
    emotionalCharacter: "Bright, cheerful",
    traditionalUse: "Folk music, children's songs"
  },
  {
    name: "Ryukyu Scale (Okinawan)",
    culture: "Ryukyuan",
    region: "Okinawa, Japan",
    era: "Ancient - Present",
    intervals: [0, 400, 500, 700, 1100, 1200],
    description: "Unique to Okinawan music",
    emotionalCharacter: "Distinctive, regional",
    traditionalUse: "Okinawan folk music, sanshin"
  },
  {
    name: "Korean Pyeongjo Scale",
    culture: "Korean",
    region: "Korea",
    era: "Ancient - Present",
    intervals: [0, 200, 350, 700, 900, 1050, 1200],
    description: "Korean traditional scale with neutral intervals",
    emotionalCharacter: "Calm, stable, balanced",
    traditionalUse: "Korean classical music (gugak)"
  },
  {
    name: "Korean Gyemyeonjo Scale",
    culture: "Korean",
    region: "Korea",
    era: "Ancient - Present",
    intervals: [0, 150, 500, 700, 850, 1200],
    description: "Sad Korean scale",
    emotionalCharacter: "Sorrowful, lamenting",
    traditionalUse: "Korean classical music, emotional pieces"
  }
];

/**
 * INDONESIAN GAMELAN
 * Non-octave scales, unique tuning systems
 */
export const INDONESIAN_SCALES: Scale[] = [
  {
    name: "Slendro (5-tone)",
    culture: "Javanese/Balinese",
    region: "Indonesia",
    era: "Ancient - Present",
    intervals: [0, 240, 480, 720, 960, 1200],
    description: "Pentatonic gamelan scale, approximately equal intervals",
    emotionalCharacter: "Mystical, shimmering, gamelan",
    traditionalUse: "Gamelan orchestras, traditional ceremonies"
  },
  {
    name: "Pelog (7-tone)",
    culture: "Javanese/Balinese",
    region: "Indonesia",
    era: "Ancient - Present",
    intervals: [0, 100, 300, 700, 800, 1000, 1200],
    description: "Heptatonic gamelan scale with irregular intervals",
    emotionalCharacter: "Complex, mysterious, rich",
    traditionalUse: "Gamelan orchestras, wayang performances"
  }
];

/**
 * AFRICAN SCALES
 * Diverse regional traditions
 */
export const AFRICAN_SCALES: Scale[] = [
  {
    name: "African Pentatonic",
    culture: "Pan-African",
    region: "Sub-Saharan Africa",
    era: "Ancient - Present",
    intervals: [0, 200, 400, 700, 900, 1200],
    description: "Common pentatonic scale in African music",
    emotionalCharacter: "Earthy, rhythmic, communal",
    traditionalUse: "Traditional African music, mbira, kora"
  },
  {
    name: "Pygmy Hexatonic",
    culture: "Pygmy",
    region: "Central Africa",
    era: "Ancient - Present",
    intervals: [0, 267, 533, 700, 967, 1200],
    description: "Unique equidistant hexatonic scale",
    emotionalCharacter: "Unique, polyrhythmic",
    traditionalUse: "Pygmy vocal music, polyphonic singing"
  }
];

/**
 * PERSIAN/IRANIAN DASTGAH SYSTEM
 */
export const PERSIAN_SCALES: Scale[] = [
  {
    name: "Dastgah Shur",
    culture: "Persian",
    region: "Iran",
    era: "Ancient - Present",
    intervals: [0, 150, 350, 500, 700, 850, 1050, 1200],
    description: "Fundamental Persian mode",
    emotionalCharacter: "Passionate, expressive",
    traditionalUse: "Persian classical music"
  },
  {
    name: "Dastgah Mahur",
    culture: "Persian",
    region: "Iran",
    era: "Ancient - Present",
    intervals: [0, 200, 400, 500, 700, 900, 1100, 1200],
    description: "Similar to Western major",
    emotionalCharacter: "Majestic, royal",
    traditionalUse: "Persian classical music"
  },
  {
    name: "Dastgah Segah",
    culture: "Persian",
    region: "Iran",
    era: "Ancient - Present",
    intervals: [0, 150, 350, 550, 700, 850, 1050, 1200],
    description: "Begins on neutral third",
    emotionalCharacter: "Complex, sophisticated",
    traditionalUse: "Advanced Persian classical music"
  }
];

/**
 * GREEK/BYZANTINE TRADITIONS
 */
export const BYZANTINE_SCALES: Scale[] = [
  {
    name: "Byzantine Liturgical Mode 1",
    culture: "Byzantine",
    region: "Greece/Eastern Mediterranean",
    era: "Medieval - Present",
    intervals: [0, 200, 300, 500, 700, 900, 1000, 1200],
    description: "Primary mode of Byzantine chant",
    emotionalCharacter: "Sacred, devotional",
    traditionalUse: "Orthodox church music"
  },
  {
    name: "Nikriz (Byzantine/Turkish)",
    culture: "Byzantine/Ottoman",
    region: "Greece/Turkey",
    era: "Medieval - Present",
    intervals: [0, 200, 300, 600, 700, 900, 1000, 1200],
    description: "Augmented 2nd interval",
    emotionalCharacter: "Exotic, Eastern",
    traditionalUse: "Sacred and secular music"
  },
  {
    name: "Double Harmonic Major (Byzantine)",
    culture: "Byzantine/Arabic",
    region: "Eastern Mediterranean",
    era: "Medieval - Present",
    intervals: [0, 100, 400, 500, 700, 800, 1100, 1200],
    description: "Two augmented 2nd intervals",
    emotionalCharacter: "Exotic, dramatic, Middle Eastern",
    traditionalUse: "Byzantine and Arabic influenced music"
  }
];

/**
 * JEWISH LITURGICAL SCALES
 */
export const JEWISH_SCALES: Scale[] = [
  {
    name: "Freygish (Phrygian Dominant)",
    culture: "Ashkenazi Jewish",
    region: "Eastern Europe",
    era: "Medieval - Present",
    intervals: [0, 100, 400, 500, 700, 800, 1000, 1200],
    description: "Characteristic of klezmer music",
    emotionalCharacter: "Joyful yet melancholic, celebratory",
    traditionalUse: "Klezmer, Jewish liturgical music"
  },
  {
    name: "Mi Sheberach Mode",
    culture: "Ashkenazi Jewish",
    region: "Eastern Europe",
    era: "Medieval - Present",
    intervals: [0, 200, 300, 500, 700, 800, 1000, 1200],
    description: "Used in synagogue prayer",
    emotionalCharacter: "Prayerful, devotional",
    traditionalUse: "Jewish liturgical music"
  }
];

/**
 * EXPERIMENTAL & MICROTONAL SCALES
 */
export const EXPERIMENTAL_SCALES: Scale[] = [
  {
    name: "19-TET Chromatic",
    culture: "Modern/Experimental",
    region: "Global",
    era: "20th Century - Present",
    intervals: [0, 63, 126, 189, 253, 316, 379, 442, 505, 568, 632, 695, 758, 821, 884, 947, 1011, 1074, 1137, 1200],
    description: "19 equal divisions of the octave",
    emotionalCharacter: "Alien, futuristic, microtonal",
    traditionalUse: "Experimental music, microtonal composition"
  },
  {
    name: "24-TET Chromatic (Quarter Tone)",
    culture: "Modern/Experimental",
    region: "Global",
    era: "20th Century - Present",
    intervals: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200],
    description: "24 equal divisions (quarter tones)",
    emotionalCharacter: "Microtonal, experimental",
    traditionalUse: "Contemporary classical, Middle Eastern fusion"
  },
  {
    name: "Bohlen-Pierce",
    culture: "Modern/Experimental",
    region: "Global",
    era: "1970s - Present",
    intervals: [0, 146, 293, 439, 585, 732, 878, 1024, 1170, 1317, 1463, 1609, 1755, 1902],
    description: "Non-octave scale based on 3:1 ratio (tritave)",
    emotionalCharacter: "Utterly alien, non-octave",
    traditionalUse: "Experimental electronic music"
  },
  {
    name: "Carlos Alpha",
    culture: "Modern/Experimental",
    region: "USA",
    era: "1980s - Present",
    intervals: [0, 78, 156, 234, 312, 390, 468, 546, 624, 702, 780, 858, 936, 1014, 1092, 1170],
    description: "Wendy Carlos non-octave scale, 15 steps per 'octave'",
    emotionalCharacter: "Futuristic, electronic",
    traditionalUse: "Electronic music, film scores (Tron)"
  },
  {
    name: "Spectral Scale (Harmonic Series)",
    culture: "Modern/Spectral",
    region: "Europe",
    era: "1970s - Present",
    intervals: [0, 1200, 1902, 2400, 2786, 3102, 3369, 3600],
    description: "Based on natural harmonic series",
    emotionalCharacter: "Natural, resonant, pure",
    traditionalUse: "Spectral music (Grisey, Murail)"
  }
];

/**
 * FLAMENCO & SPANISH TRADITIONS
 */
export const FLAMENCO_SCALES: Scale[] = [
  {
    name: "Phrygian Dominant (Spanish)",
    culture: "Spanish/Flamenco",
    region: "Spain",
    era: "Medieval - Present",
    intervals: [0, 100, 400, 500, 700, 800, 1000, 1200],
    description: "Defining scale of flamenco",
    emotionalCharacter: "Passionate, fiery, Spanish",
    traditionalUse: "Flamenco guitar, Spanish classical"
  },
  {
    name: "Andalusian Cadence Scale",
    culture: "Spanish/Moorish",
    region: "Andalusia, Spain",
    era: "Medieval - Present",
    intervals: [0, 100, 300, 500, 700, 800, 1000, 1200],
    description: "Moorish influence in Spanish music",
    emotionalCharacter: "Exotic, Spanish-Arabic",
    traditionalUse: "Flamenco, Spanish classical guitar"
  }
];

/**
 * CELTIC & SCOTTISH TRADITIONS
 */
export const CELTIC_SCALES: Scale[] = [
  {
    name: "Scottish Pentatonic",
    culture: "Scottish/Celtic",
    region: "Scotland/Ireland",
    era: "Ancient - Present",
    intervals: [0, 200, 500, 700, 1000, 1200],
    description: "Traditional Scottish bagpipe scale",
    emotionalCharacter: "Heroic, Celtic, pastoral",
    traditionalUse: "Bagpipe music, Celtic folk"
  },
  {
    name: "Irish Mixolydian",
    culture: "Irish",
    region: "Ireland",
    era: "Ancient - Present",
    intervals: [0, 200, 400, 500, 700, 900, 1000, 1200],
    description: "Common in Irish traditional music",
    emotionalCharacter: "Lively, folky, Irish",
    traditionalUse: "Irish traditional music, fiddle, tin whistle"
  },
  {
    name: "Irish Dorian",
    culture: "Irish",
    region: "Ireland",
    era: "Ancient - Present",
    intervals: [0, 200, 300, 500, 700, 900, 1000, 1200],
    description: "Common in Irish folk music",
    emotionalCharacter: "Mysterious, ancient, Celtic",
    traditionalUse: "Irish ballads, traditional music"
  }
];

/**
 * COMPREHENSIVE SCALE COLLECTION
 */
export const ALL_SCALES = [
  ...WESTERN_SCALES,
  ...INDIAN_SCALES,
  ...ARABIC_SCALES,
  ...EAST_ASIAN_SCALES,
  ...INDONESIAN_SCALES,
  ...AFRICAN_SCALES,
  ...PERSIAN_SCALES,
  ...BYZANTINE_SCALES,
  ...JEWISH_SCALES,
  ...EXPERIMENTAL_SCALES,
  ...FLAMENCO_SCALES,
  ...CELTIC_SCALES
];

export const SCALE_CATEGORIES = {
  "Western European": WESTERN_SCALES,
  "Indian Classical": INDIAN_SCALES,
  "Arabic/Maqam": ARABIC_SCALES,
  "East Asian": EAST_ASIAN_SCALES,
  "Indonesian Gamelan": INDONESIAN_SCALES,
  "African": AFRICAN_SCALES,
  "Persian/Iranian": PERSIAN_SCALES,
  "Greek/Byzantine": BYZANTINE_SCALES,
  "Jewish Liturgical": JEWISH_SCALES,
  "Experimental/Microtonal": EXPERIMENTAL_SCALES,
  "Flamenco/Spanish": FLAMENCO_SCALES,
  "Celtic/Irish": CELTIC_SCALES
};

console.log(`✨ Loaded ${ALL_SCALES.length} musical scales from ${Object.keys(SCALE_CATEGORIES).length} cultural traditions`);
