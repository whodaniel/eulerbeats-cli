/**
 * ============================================================================
 * GLOBAL RHYTHM PATTERNS LIBRARY
 * Traditional Rhythmic Cycles from World Cultures
 * ============================================================================
 *
 * This library contains traditional rhythm patterns and time cycles
 * from musical traditions across human history.
 */

export interface RhythmPattern {
  name: string;
  culture: string;
  region: string;
  pattern: number[]; // 1 = hit, 0 = rest, 0.5 = ghost note, 2 = accent
  subdivisions: number; // Total beats/subdivisions
  description: string;
  traditionalUse: string;
  tempo?: { min: number; max: number }; // BPM range
  cycleLength?: number; // For long cyclic patterns
}

/**
 * INDIAN CLASSICAL RHYTHM (TALA)
 * Complex rhythmic cycles that can span many beats
 */
export const INDIAN_TALAS: RhythmPattern[] = [
  {
    name: "Teental (16 beats)",
    culture: "Hindustani",
    region: "North India",
    subdivisions: 16,
    pattern: [2, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    description: "Most common tala in Hindustani music, 16 beat cycle",
    traditionalUse: "Classical instrumental and vocal music",
    tempo: { min: 60, max: 240 },
    cycleLength: 16
  },
  {
    name: "Jhaptal (10 beats)",
    culture: "Hindustani",
    region: "North India",
    subdivisions: 10,
    pattern: [2, 1, 0, 1, 1, 0, 1, 1, 0, 0],
    description: "10-beat asymmetrical tala: 2+3+2+3",
    traditionalUse: "Classical music, semi-classical forms",
    tempo: { min: 80, max: 200 },
    cycleLength: 10
  },
  {
    name: "Rupak (7 beats)",
    culture: "Hindustani",
    region: "North India",
    subdivisions: 7,
    pattern: [0, 0, 2, 1, 1, 1, 1],
    description: "7-beat tala, unusual 3+2+2 structure",
    traditionalUse: "Light classical, thumri, bhajans",
    tempo: { min: 60, max: 180 },
    cycleLength: 7
  },
  {
    name: "Adi Tala (8 beats)",
    culture: "Carnatic",
    region: "South India",
    subdivisions: 8,
    pattern: [2, 1, 0, 0, 1, 1, 0, 0],
    description: "Most common Carnatic tala, 8 beat cycle",
    traditionalUse: "South Indian classical music",
    tempo: { min: 40, max: 300 },
    cycleLength: 8
  },
  {
    name: "Misra Chapu (7 beats)",
    culture: "Carnatic",
    region: "South India",
    subdivisions: 7,
    pattern: [2, 1, 0, 1, 1, 0, 0],
    description: "Asymmetrical 7-beat Carnatic pattern: 3+2+2",
    traditionalUse: "Fast-paced compositions",
    tempo: { min: 100, max: 300 },
    cycleLength: 7
  },
  {
    name: "Khanda Chapu (5 beats)",
    culture: "Carnatic",
    region: "South India",
    subdivisions: 5,
    pattern: [2, 1, 1, 0, 0],
    description: "5-beat Carnatic pattern: 2+3",
    traditionalUse: "Energetic compositions",
    tempo: { min: 100, max: 300 },
    cycleLength: 5
  }
];

/**
 * AFRICAN RHYTHMS
 * Polyrhythmic patterns, timeline patterns
 */
export const AFRICAN_RHYTHMS: RhythmPattern[] = [
  {
    name: "Clave (Son) 3-2",
    culture: "Afro-Cuban",
    region: "Cuba/West Africa",
    subdivisions: 16,
    pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    description: "Foundational Afro-Cuban rhythm pattern",
    traditionalUse: "Salsa, rumba, son cubano",
    tempo: { min: 80, max: 180 },
    cycleLength: 16
  },
  {
    name: "Clave (Son) 2-3",
    culture: "Afro-Cuban",
    region: "Cuba/West Africa",
    subdivisions: 16,
    pattern: [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    description: "Reverse of 3-2 clave",
    traditionalUse: "Salsa, Afro-Cuban music",
    tempo: { min: 80, max: 180 },
    cycleLength: 16
  },
  {
    name: "Rumba Clave 3-2",
    culture: "Afro-Cuban",
    region: "Cuba",
    subdivisions: 16,
    pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    description: "Rumba variation of clave pattern",
    traditionalUse: "Rumba, Afro-Cuban percussion",
    tempo: { min: 60, max: 140 },
    cycleLength: 16
  },
  {
    name: "Kpanlogo",
    culture: "Ghanaian",
    region: "Ghana",
    subdivisions: 12,
    pattern: [2, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0],
    description: "Popular Ghanaian rhythm",
    traditionalUse: "Traditional Ghanaian music, recreational dance",
    tempo: { min: 100, max: 160 },
    cycleLength: 12
  },
  {
    name: "Samba",
    culture: "Afro-Brazilian",
    region: "Brazil",
    subdivisions: 16,
    pattern: [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0],
    description: "Basic samba rhythm pattern",
    traditionalUse: "Brazilian samba, carnival",
    tempo: { min: 120, max: 180 },
    cycleLength: 16
  },
  {
    name: "Bossa Nova",
    culture: "Brazilian",
    region: "Brazil",
    subdivisions: 16,
    pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    description: "Characteristic bossa nova clave pattern",
    traditionalUse: "Bossa nova, Brazilian jazz",
    tempo: { min: 100, max: 140 },
    cycleLength: 16
  },
  {
    name: "Djembe Pattern (West African)",
    culture: "West African",
    region: "West Africa",
    subdivisions: 12,
    pattern: [2, 0, 1, 1, 0, 1, 2, 0, 1, 1, 0, 1],
    description: "Traditional djembe rhythm pattern",
    traditionalUse: "West African drumming circles",
    tempo: { min: 90, max: 150 },
    cycleLength: 12
  },
  {
    name: "Bembe",
    culture: "Yoruba/Afro-Cuban",
    region: "West Africa/Cuba",
    subdivisions: 12,
    pattern: [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    description: "Sacred Yoruba/Afro-Cuban rhythm",
    traditionalUse: "Religious ceremonies, sacred music",
    tempo: { min: 100, max: 140 },
    cycleLength: 12
  }
];

/**
 * MIDDLE EASTERN RHYTHMS (IQA'AT)
 */
export const MIDDLE_EASTERN_RHYTHMS: RhythmPattern[] = [
  {
    name: "Maqsum",
    culture: "Arabic",
    region: "Middle East/North Africa",
    subdivisions: 8,
    pattern: [2, 0, 1, 0, 2, 0, 0, 1],
    description: "Most common Arabic rhythm, 4/4 feel",
    traditionalUse: "Arabic pop, traditional music",
    tempo: { min: 80, max: 160 },
    cycleLength: 8
  },
  {
    name: "Saidi",
    culture: "Egyptian",
    region: "Egypt",
    subdivisions: 8,
    pattern: [2, 0, 1, 0, 2, 1, 0, 1],
    description: "Upper Egyptian folk rhythm",
    traditionalUse: "Saidi folk music, belly dance",
    tempo: { min: 100, max: 180 },
    cycleLength: 8
  },
  {
    name: "Baladi",
    culture: "Egyptian",
    region: "Egypt",
    subdivisions: 8,
    pattern: [2, 0, 1, 0, 2, 0, 1, 1],
    description: "Egyptian urban folk rhythm",
    traditionalUse: "Baladi music, belly dance",
    tempo: { min: 80, max: 140 },
    cycleLength: 8
  },
  {
    name: "Masmoudi Kebir",
    culture: "Arabic",
    region: "North Africa",
    subdivisions: 16,
    pattern: [2, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 2, 0, 0, 1, 0],
    description: "Large masmoudi rhythm, 8/4",
    traditionalUse: "Andalusian classical music, muwashshah",
    tempo: { min: 60, max: 120 },
    cycleLength: 16
  },
  {
    name: "Sama'i Thaqil",
    culture: "Arabic",
    region: "Middle East",
    subdivisions: 10,
    pattern: [2, 0, 0, 1, 0, 2, 0, 1, 0, 0],
    description: "Heavy sama'i rhythm, 10/8",
    traditionalUse: "Classical Arabic instrumental forms",
    tempo: { min: 60, max: 120 },
    cycleLength: 10
  },
  {
    name: "Ciftetelli",
    culture: "Turkish",
    region: "Turkey/Greece",
    subdivisions: 8,
    pattern: [2, 0, 1, 1, 2, 0, 1, 0],
    description: "Popular Turkish/Greek rhythm",
    traditionalUse: "Belly dance, Greek/Turkish pop",
    tempo: { min: 80, max: 160 },
    cycleLength: 8
  },
  {
    name: "Karsilama (9/8)",
    culture: "Turkish",
    region: "Turkey/Balkans",
    subdivisions: 9,
    pattern: [2, 0, 1, 0, 2, 0, 1, 0, 1],
    description: "Asymmetrical 9/8 rhythm: 2+2+2+3",
    traditionalUse: "Turkish folk dance",
    tempo: { min: 100, max: 180 },
    cycleLength: 9
  },
  {
    name: "Aksak (9/8 variant)",
    culture: "Turkish/Balkan",
    region: "Turkey/Balkans",
    subdivisions: 9,
    pattern: [2, 0, 1, 0, 1, 2, 0, 1, 0],
    description: "Limping rhythm, 2+2+2+3",
    traditionalUse: "Balkan and Turkish folk music",
    tempo: { min: 120, max: 200 },
    cycleLength: 9
  }
];

/**
 * LATIN AMERICAN RHYTHMS
 */
export const LATIN_RHYTHMS: RhythmPattern[] = [
  {
    name: "Tresillo",
    culture: "Latin American",
    region: "Caribbean/Latin America",
    subdivisions: 8,
    pattern: [1, 0, 0, 1, 0, 0, 1, 0],
    description: "Foundational Latin rhythm, 3+3+2 pattern",
    traditionalUse: "Habanera, tango, Latin jazz",
    tempo: { min: 80, max: 160 },
    cycleLength: 8
  },
  {
    name: "Cascara",
    culture: "Afro-Cuban",
    region: "Cuba",
    subdivisions: 16,
    pattern: [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0],
    description: "Timbale pattern in salsa",
    traditionalUse: "Salsa, timba",
    tempo: { min: 140, max: 200 },
    cycleLength: 16
  },
  {
    name: "Mambo Bell Pattern",
    culture: "Afro-Cuban",
    region: "Cuba",
    subdivisions: 16,
    pattern: [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0],
    description: "Cowbell pattern in mambo/salsa",
    traditionalUse: "Mambo, salsa",
    tempo: { min: 140, max: 200 },
    cycleLength: 16
  },
  {
    name: "Tango Rhythm",
    culture: "Argentine",
    region: "Argentina",
    subdivisions: 8,
    pattern: [2, 0, 0, 1, 0, 1, 1, 0],
    description: "Basic tango rhythm pattern",
    traditionalUse: "Argentine tango",
    tempo: { min: 60, max: 120 },
    cycleLength: 8
  },
  {
    name: "Baião",
    culture: "Brazilian",
    region: "Northeast Brazil",
    subdivisions: 16,
    pattern: [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
    description: "Northeastern Brazilian rhythm",
    traditionalUse: "Forró, baião music",
    tempo: { min: 100, max: 140 },
    cycleLength: 16
  }
];

/**
 * FLAMENCO RHYTHMS (COMPÁS)
 */
export const FLAMENCO_RHYTHMS: RhythmPattern[] = [
  {
    name: "Bulería (12-beat)",
    culture: "Spanish Flamenco",
    region: "Andalusia, Spain",
    subdivisions: 12,
    pattern: [2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
    description: "Fast flamenco form, emphasis on 12, 3, 6, 8, 10",
    traditionalUse: "Flamenco dance and guitar",
    tempo: { min: 180, max: 300 },
    cycleLength: 12
  },
  {
    name: "Soleá (12-beat)",
    culture: "Spanish Flamenco",
    region: "Andalusia, Spain",
    subdivisions: 12,
    pattern: [2, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    description: "Slow, serious flamenco form",
    traditionalUse: "Flamenco song and dance",
    tempo: { min: 60, max: 120 },
    cycleLength: 12
  },
  {
    name: "Tangos (flamenco, 4-beat)",
    culture: "Spanish Flamenco",
    region: "Andalusia, Spain",
    subdivisions: 8,
    pattern: [2, 0, 1, 0, 2, 0, 1, 1],
    description: "Flamenco tangos (different from Argentine)",
    traditionalUse: "Flamenco guitar and dance",
    tempo: { min: 120, max: 180 },
    cycleLength: 8
  }
];

/**
 * WESTERN CLASSICAL & MODERN PATTERNS
 */
export const WESTERN_PATTERNS: RhythmPattern[] = [
  {
    name: "Standard Rock Beat",
    culture: "Western Popular",
    region: "USA/Europe",
    subdivisions: 16,
    pattern: [2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0],
    description: "Basic rock drum beat",
    traditionalUse: "Rock, pop music",
    tempo: { min: 80, max: 160 },
    cycleLength: 16
  },
  {
    name: "Shuffle/Swing",
    culture: "Western Jazz/Blues",
    region: "USA",
    subdivisions: 12,
    pattern: [2, 0, 1, 1, 0, 1, 2, 0, 1, 1, 0, 1],
    description: "Swing feel, triplet-based",
    traditionalUse: "Jazz, blues, swing",
    tempo: { min: 80, max: 200 },
    cycleLength: 12
  },
  {
    name: "Funk Groove",
    culture: "Afro-American",
    region: "USA",
    subdivisions: 16,
    pattern: [2, 0, 1, 1, 1, 0, 1, 0, 2, 1, 0, 1, 1, 0, 1, 0],
    description: "Syncopated funk rhythm",
    traditionalUse: "Funk, R&B, hip-hop",
    tempo: { min: 90, max: 120 },
    cycleLength: 16
  },
  {
    name: "Disco/Four-on-Floor",
    culture: "Western Popular",
    region: "USA/Europe",
    subdivisions: 16,
    pattern: [2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
    description: "Steady quarter note kick drum",
    traditionalUse: "Disco, house, EDM",
    tempo: { min: 110, max: 130 },
    cycleLength: 16
  },
  {
    name: "Reggae One Drop",
    culture: "Jamaican",
    region: "Jamaica",
    subdivisions: 16,
    pattern: [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
    description: "Emphasis on beat 3, reggae rhythm",
    traditionalUse: "Reggae music",
    tempo: { min: 60, max: 90 },
    cycleLength: 16
  },
  {
    name: "Breakbeat",
    culture: "Western Popular",
    region: "USA/UK",
    subdivisions: 16,
    pattern: [2, 0, 0, 1, 1, 0, 1, 0, 2, 1, 0, 0, 1, 0, 1, 0],
    description: "Syncopated breakbeat pattern",
    traditionalUse: "Hip-hop, drum and bass, jungle",
    tempo: { min: 80, max: 180 },
    cycleLength: 16
  }
];

/**
 * ASIAN RHYTHMIC PATTERNS
 */
export const ASIAN_RHYTHMS: RhythmPattern[] = [
  {
    name: "Tabla Kayda",
    culture: "Hindustani",
    region: "North India",
    subdivisions: 16,
    pattern: [2, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1],
    description: "Traditional tabla composition pattern",
    traditionalUse: "Tabla solo, classical accompaniment",
    tempo: { min: 40, max: 200 },
    cycleLength: 16
  },
  {
    name: "Korean Jangdan (Jajinmori)",
    culture: "Korean",
    region: "Korea",
    subdivisions: 12,
    pattern: [2, 0, 1, 1, 0, 1, 2, 0, 1, 1, 0, 1],
    description: "Fast Korean rhythmic pattern",
    traditionalUse: "Korean traditional music (gugak)",
    tempo: { min: 120, max: 200 },
    cycleLength: 12
  },
  {
    name: "Japanese Matsuri Taiko",
    culture: "Japanese",
    region: "Japan",
    subdivisions: 8,
    pattern: [2, 0, 1, 1, 2, 0, 1, 0],
    description: "Festival taiko drum pattern",
    traditionalUse: "Japanese festivals, taiko ensembles",
    tempo: { min: 100, max: 160 },
    cycleLength: 8
  }
];

/**
 * COMPREHENSIVE RHYTHM COLLECTION
 */
export const ALL_RHYTHMS = [
  ...INDIAN_TALAS,
  ...AFRICAN_RHYTHMS,
  ...MIDDLE_EASTERN_RHYTHMS,
  ...LATIN_RHYTHMS,
  ...FLAMENCO_RHYTHMS,
  ...WESTERN_PATTERNS,
  ...ASIAN_RHYTHMS
];

export const RHYTHM_CATEGORIES = {
  "Indian Talas": INDIAN_TALAS,
  "African Rhythms": AFRICAN_RHYTHMS,
  "Middle Eastern (Iqa'at)": MIDDLE_EASTERN_RHYTHMS,
  "Latin American": LATIN_RHYTHMS,
  "Flamenco": FLAMENCO_RHYTHMS,
  "Western/Modern": WESTERN_PATTERNS,
  "Asian Traditions": ASIAN_RHYTHMS
};

console.log(`✨ Loaded ${ALL_RHYTHMS.length} rhythm patterns from ${Object.keys(RHYTHM_CATEGORIES).length} cultural traditions`);

/**
 * UTILITY FUNCTIONS
 */

// Convert rhythm pattern to time events
export function patternToTimeEvents(pattern: RhythmPattern, bpm: number = 120): { time: number; velocity: number }[] {
  const beatDuration = 60 / bpm; // Duration of one beat in seconds
  const stepDuration = beatDuration / (pattern.subdivisions / 4); // Duration per subdivision

  const events: { time: number; velocity: number }[] = [];

  pattern.pattern.forEach((hit, index) => {
    if (hit > 0) {
      events.push({
        time: index * stepDuration,
        velocity: hit >= 2 ? 1.0 : hit * 0.7 // Accent vs normal note
      });
    }
  });

  return events;
}

// Get complementary pattern (inverse)
export function getComplementaryPattern(pattern: number[]): number[] {
  return pattern.map(hit => hit > 0 ? 0 : 1);
}
