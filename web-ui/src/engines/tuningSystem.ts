/**
 * ============================================================================
 * ADVANCED TUNING SYSTEMS ENGINE
 * Historical & Cultural Intonation Systems
 * ============================================================================
 *
 * This engine implements every major tuning system from human history,
 * enabling authentic recreation of historical and cultural music.
 */

export interface TuningSystemDef {
  id: string;
  name: string;
  culture: string;
  era: string;
  description: string;
  baseFrequency: number;
  calculateFrequency: (noteIndex: number, baseFreq?: number) => number;
  characteristics: string;
}

/**
 * EQUAL TEMPERAMENT SYSTEMS
 */

// 12-TET (Standard Modern Tuning)
export const EQUAL_TEMPERAMENT_12: TuningSystemDef = {
  id: '12-tet',
  name: '12-Tone Equal Temperament',
  culture: 'Western',
  era: '1700s - Present',
  baseFrequency: 440, // A4
  description: 'Modern standard tuning - all semitones are exactly equal',
  characteristics: 'Perfectly even semitones, works in all keys equally',
  calculateFrequency: (noteIndex: number, baseFreq: number = 440) => {
    // A4 = 440 Hz = index 0, each semitone is 2^(1/12)
    return baseFreq * Math.pow(2, noteIndex / 12);
  }
};

// 19-TET (Microtonal)
export const EQUAL_TEMPERAMENT_19: TuningSystemDef = {
  id: '19-tet',
  name: '19-Tone Equal Temperament',
  culture: 'Modern/Experimental',
  era: '1900s - Present',
  baseFrequency: 440,
  description: '19 equal divisions of the octave - excellent major thirds',
  characteristics: 'Better thirds than 12-TET, 1/3-comma meantone approximation',
  calculateFrequency: (noteIndex: number, baseFreq: number = 440) => {
    return baseFreq * Math.pow(2, noteIndex / 19);
  }
};

// 24-TET (Quarter Tones)
export const EQUAL_TEMPERAMENT_24: TuningSystemDef = {
  id: '24-tet',
  name: '24-Tone Equal Temperament (Quarter Tones)',
  culture: 'Modern/Middle Eastern',
  era: '1900s - Present',
  baseFrequency: 440,
  description: 'Quarter tone system - each semitone divided in half',
  characteristics: 'Used in Arabic music analysis, experimental Western music',
  calculateFrequency: (noteIndex: number, baseFreq: number = 440) => {
    return baseFreq * Math.pow(2, noteIndex / 24);
  }
};

// 31-TET (Extended Meantone)
export const EQUAL_TEMPERAMENT_31: TuningSystemDef = {
  id: '31-tet',
  name: '31-Tone Equal Temperament',
  culture: 'Modern/Historical',
  era: '1600s, 1900s - Present',
  baseFrequency: 440,
  description: '31 equal divisions - excellent approximation of 1/4-comma meantone',
  characteristics: 'Pure major thirds, very good fifths',
  calculateFrequency: (noteIndex: number, baseFreq: number = 440) => {
    return baseFreq * Math.pow(2, noteIndex / 31);
  }
};

// 53-TET (Pythagorean Approximation)
export const EQUAL_TEMPERAMENT_53: TuningSystemDef = {
  id: '53-tet',
  name: '53-Tone Equal Temperament',
  culture: 'Modern/Historical',
  era: 'Ancient China, 1900s - Present',
  baseFrequency: 440,
  description: '53 equal divisions - excellent Pythagorean approximation',
  characteristics: 'Closely approximates Pythagorean tuning and commas',
  calculateFrequency: (noteIndex: number, baseFreq: number = 440) => {
    return baseFreq * Math.pow(2, noteIndex / 53);
  }
};

/**
 * JUST INTONATION SYSTEMS
 */

// Pure Just Intonation (Ptolemy's Intense Diatonic)
export const JUST_INTONATION: TuningSystemDef = {
  id: 'just-intonation',
  name: 'Just Intonation (5-Limit)',
  culture: 'Universal',
  era: 'Ancient - Present',
  baseFrequency: 264, // C4
  description: 'Pure harmonic ratios - no beating in consonant intervals',
  characteristics: 'Perfect consonances, but cannot modulate freely',
  calculateFrequency: (noteIndex: number, baseFreq: number = 264) => {
    // C major scale in just intonation
    const ratios = [
      1,      // C - 1/1
      9/8,    // D - 9/8
      5/4,    // E - 5/4
      4/3,    // F - 4/3
      3/2,    // G - 3/2
      5/3,    // A - 5/3
      15/8,   // B - 15/8
      2       // C - 2/1
    ];

    const octave = Math.floor(noteIndex / 7);
    const note = noteIndex % 7;

    return baseFreq * ratios[note] * Math.pow(2, octave);
  }
};

// Indian Shruti System (22 notes)
export const SHRUTI_SYSTEM: TuningSystemDef = {
  id: 'shruti-22',
  name: '22 Shruti System',
  culture: 'Indian',
  era: 'Ancient - Present',
  baseFrequency: 240, // Sa
  description: 'Ancient Indian 22-note microtonal system',
  characteristics: 'Most sophisticated historical tuning system, enables all ragas',
  calculateFrequency: (noteIndex: number, baseFreq: number = 240) => {
    // Approximate 22 shruti divisions based on traditional ratios
    const shrutis = [
      1,          // Sa
      256/243,    // Komal Re (1 shruti)
      16/15,      // Komal Re (2 shruti)
      10/9,       // Komal Re (3 shruti)
      9/8,        // Re (4 shruti)
      32/27,      // Komal Ga (1 shruti)
      6/5,        // Komal Ga (2 shruti)
      5/4,        // Ga (3 shruti)
      81/64,      // Ga (4 shruti)
      4/3,        // Ma (1 shruti)
      27/20,      // Ma (2 shruti)
      45/32,      // Tivra Ma (1 shruti)
      729/512,    // Tivra Ma (2 shruti)
      3/2,        // Pa
      128/81,     // Komal Dha (1 shruti)
      8/5,        // Komal Dha (2 shruti)
      5/3,        // Dha (3 shruti)
      27/16,      // Dha (4 shruti)
      16/9,       // Komal Ni (1 shruti)
      9/5,        // Komal Ni (2 shruti)
      15/8,       // Ni (3 shruti)
      243/128,    // Ni (4 shruti)
      2           // Sa
    ];

    const octave = Math.floor(noteIndex / 22);
    const note = noteIndex % 22;

    return baseFreq * shrutis[note] * Math.pow(2, octave);
  }
};

/**
 * PYTHAGOREAN TUNING
 */
export const PYTHAGOREAN_TUNING: TuningSystemDef = {
  id: 'pythagorean',
  name: 'Pythagorean Tuning',
  culture: 'Ancient Greek/Medieval European',
  era: '500 BCE - 1500 CE',
  baseFrequency: 256, // C4
  description: 'Based on perfect fifths (3:2 ratio) - pure fifths, sharp thirds',
  characteristics: 'Perfect fifths and fourths, but thirds are noticeably sharp',
  calculateFrequency: (noteIndex: number, baseFreq: number = 256) => {
    // Pythagorean scale ratios
    const ratios = [
      1,          // C
      256/243,    // C# (Pythagorean limma)
      9/8,        // D
      32/27,      // Eb
      81/64,      // E (sharp third!)
      4/3,        // F
      1024/729,   // F#
      3/2,        // G
      128/81,     // G#
      27/16,      // A
      16/9,       // Bb
      243/128,    // B
      2           // C
    ];

    const octave = Math.floor(noteIndex / 12);
    const note = noteIndex % 12;

    return baseFreq * ratios[note] * Math.pow(2, octave);
  }
};

/**
 * MEANTONE TEMPERAMENTS
 */

// Quarter-Comma Meantone
export const QUARTER_COMMA_MEANTONE: TuningSystemDef = {
  id: 'quarter-comma-meantone',
  name: 'Quarter-Comma Meantone',
  culture: 'European Renaissance',
  era: '1500 - 1700',
  baseFrequency: 256,
  description: 'Fifths narrowed to give pure major thirds (5:4)',
  characteristics: 'Beautiful thirds, slightly impure fifths, wolf intervals',
  calculateFrequency: (noteIndex: number, baseFreq: number = 256) => {
    // Fifth flattened by 1/4 syntonic comma
    const fifth = Math.pow(5, 0.25); // ≈ 1.495 (slightly flat fifth)
    const semitone = Math.pow(fifth, 1/5);

    return baseFreq * Math.pow(semitone, noteIndex);
  }
};

// Third-Comma Meantone
export const THIRD_COMMA_MEANTONE: TuningSystemDef = {
  id: 'third-comma-meantone',
  name: 'Third-Comma Meantone',
  culture: 'European Renaissance',
  era: '1500 - 1700',
  baseFrequency: 256,
  description: 'Fifths narrowed by 1/3 syntonic comma',
  characteristics: 'Compromise between Pythagorean and 1/4-comma',
  calculateFrequency: (noteIndex: number, baseFreq: number = 256) => {
    const fifth = Math.pow(5/4, 1/3) * 4/3; // Third-comma tempered fifth
    const semitone = Math.pow(fifth / (4/3), 1/5);

    return baseFreq * Math.pow(semitone, noteIndex);
  }
};

/**
 * WELL TEMPERAMENTS (Historical)
 */

// Werckmeister III
export const WERCKMEISTER_III: TuningSystemDef = {
  id: 'werckmeister-3',
  name: 'Werckmeister III',
  culture: 'German Baroque',
  era: '1691 - 1800s',
  baseFrequency: 256,
  description: 'Well temperament - all keys usable, each with unique color',
  characteristics: 'C major pure, increasingly complex as you add sharps/flats',
  calculateFrequency: (noteIndex: number, baseFreq: number = 256) => {
    // Werckmeister III ratios (C-based)
    const ratios = [
      1,                              // C
      256/243,                        // C#
      Math.pow(2, 2/12) / Math.pow(2, 1/4), // D
      32/27,                          // Eb
      Math.pow(2, 4/12) / Math.pow(2, 1/4), // E
      4/3,                            // F
      Math.pow(2, 6/12) / Math.pow(2, 1/4), // F#
      3/2,                            // G
      128/81,                         // G#
      Math.pow(2, 9/12) / Math.pow(2, 1/4), // A
      16/9,                           // Bb
      Math.pow(2, 11/12) / Math.pow(2, 1/4), // B
      2                               // C
    ];

    const octave = Math.floor(noteIndex / 12);
    const note = noteIndex % 12;

    return baseFreq * ratios[note] * Math.pow(2, octave);
  }
};

// Kirnberger III
export const KIRNBERGER_III: TuningSystemDef = {
  id: 'kirnberger-3',
  name: 'Kirnberger III',
  culture: 'German Baroque',
  era: '1770s - 1800s',
  baseFrequency: 256,
  description: 'Well temperament combining just and Pythagorean intervals',
  characteristics: 'Very pure C major, increasingly tense remote keys',
  calculateFrequency: (noteIndex: number, baseFreq: number = 256) => {
    const ratios = [
      1,          // C (pure)
      256/243,    // C# (Pythagorean)
      9/8,        // D (pure)
      32/27,      // Eb (Pythagorean)
      5/4,        // E (pure just third!)
      4/3,        // F (pure)
      45/32,      // F# (just)
      3/2,        // G (pure)
      128/81,     // G# (Pythagorean)
      5/3,        // A (just)
      16/9,       // Bb (Pythagorean)
      15/8,       // B (just)
      2           // C
    ];

    const octave = Math.floor(noteIndex / 12);
    const note = noteIndex % 12;

    return baseFreq * ratios[note] * Math.pow(2, octave);
  }
};

// Vallotti-Young
export const VALLOTTI_YOUNG: TuningSystemDef = {
  id: 'vallotti-young',
  name: 'Vallotti-Young Temperament',
  culture: 'Italian/English Baroque',
  era: '1700s - 1800s',
  baseFrequency: 256,
  description: 'Circulating temperament, 6 fifths tempered',
  characteristics: 'More even than other well temperaments, subtle key colors',
  calculateFrequency: (noteIndex: number, baseFreq: number = 256) => {
    // Six fifths F-C-G-D-A-E tempered by 1/6 Pythagorean comma
    const pythagoreanComma = Math.pow(3, 12) / Math.pow(2, 19);
    const temperedFifth = 3/2 / Math.pow(pythagoreanComma, 1/6);

    // Build circle of fifths
    const fifths = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5]; // F C G D A E B F# C# G# D# A#
    const frequencies = new Array(12);

    let currentFreq = 1;
    for (let i = 0; i < 12; i++) {
      frequencies[fifths[i]] = currentFreq;
      currentFreq *= (i < 6) ? temperedFifth : 3/2; // First 6 tempered, rest pure
      while (currentFreq >= 2) currentFreq /= 2; // Reduce to octave
    }

    const octave = Math.floor(noteIndex / 12);
    const note = noteIndex % 12;

    return baseFreq * frequencies[note] * Math.pow(2, octave);
  }
};

/**
 * HISTORICAL ARABIC SYSTEMS
 */
export const ARABIC_MAQAM_24: TuningSystemDef = {
  id: 'arabic-24tet',
  name: 'Arabic 24-Tone System',
  culture: 'Arabic/Middle Eastern',
  era: 'Medieval - Present',
  baseFrequency: 440,
  description: 'Quarter tone system for maqam music',
  characteristics: 'Enables all maqamat with quarter tone precision',
  calculateFrequency: (noteIndex: number, baseFreq: number = 440) => {
    return baseFreq * Math.pow(2, noteIndex / 24);
  }
};

/**
 * CHINESE SYSTEMS
 */
export const CHINESE_LU_SYSTEM: TuningSystemDef = {
  id: 'chinese-lu',
  name: 'Chinese Lü System',
  culture: 'Ancient Chinese',
  era: '2000 BCE - Present',
  baseFrequency: 240,
  description: 'Ancient Chinese system based on bamboo pipe lengths',
  characteristics: 'Cycle of perfect fifths, similar to Pythagorean',
  calculateFrequency: (noteIndex: number, baseFreq: number = 240) => {
    // 12 Lü based on cycle of fifths (similar to Pythagorean)
    const fifthRatio = 3/2;
    const octave = Math.floor(noteIndex / 12);
    const lu = noteIndex % 12;

    let freq = baseFreq;
    for (let i = 0; i < lu; i++) {
      freq *= fifthRatio;
      while (freq >= baseFreq * 2) freq /= 2;
    }

    return freq * Math.pow(2, octave);
  }
};

/**
 * EXPERIMENTAL NON-OCTAVE SYSTEMS
 */
export const BOHLEN_PIERCE: TuningSystemDef = {
  id: 'bohlen-pierce',
  name: 'Bohlen-Pierce Scale',
  culture: 'Modern Experimental',
  era: '1970s - Present',
  baseFrequency: 440,
  description: 'Non-octave scale based on 3:1 ratio (tritave) with 13 steps',
  characteristics: 'Completely alien sound, based on odd harmonics only',
  calculateFrequency: (noteIndex: number, baseFreq: number = 440) => {
    // 13 equal divisions of the tritave (3:1 ratio)
    const tritaveRatio = 3;
    const stepsPerTritave = 13;

    return baseFreq * Math.pow(tritaveRatio, noteIndex / stepsPerTritave);
  }
};

export const CARLOS_ALPHA: TuningSystemDef = {
  id: 'carlos-alpha',
  name: 'Carlos Alpha Scale',
  culture: 'Modern Experimental',
  era: '1980s - Present',
  baseFrequency: 440,
  description: 'Wendy Carlos non-octave scale, 15.385 steps per octave',
  characteristics: 'Used in film score for TRON',
  calculateFrequency: (noteIndex: number, baseFreq: number = 440) => {
    const stepSize = 78.0; // cents
    return baseFreq * Math.pow(2, (noteIndex * stepSize) / 1200);
  }
};

export const CARLOS_BETA: TuningSystemDef = {
  id: 'carlos-beta',
  name: 'Carlos Beta Scale',
  culture: 'Modern Experimental',
  era: '1980s - Present',
  baseFrequency: 440,
  description: 'Wendy Carlos non-octave scale, 18.809 steps per octave',
  characteristics: 'Alternative Carlos tuning, slightly closer to 12-TET',
  calculateFrequency: (noteIndex: number, baseFreq: number = 440) => {
    const stepSize = 63.8; // cents
    return baseFreq * Math.pow(2, (noteIndex * stepSize) / 1200);
  }
};

export const CARLOS_GAMMA: TuningSystemDef = {
  id: 'carlos-gamma',
  name: 'Carlos Gamma Scale',
  culture: 'Modern Experimental',
  era: '1980s - Present',
  baseFrequency: 440,
  description: 'Wendy Carlos scale approximating equal-beating chords',
  characteristics: 'Perfect for electronic timbres',
  calculateFrequency: (noteIndex: number, baseFreq: number = 440) => {
    const stepSize = 35.1; // cents
    return baseFreq * Math.pow(2, (noteIndex * stepSize) / 1200);
  }
};

/**
 * SCIENTIFIC/PHILOSOPHICAL TUNINGS
 */
export const SCIENTIFIC_PITCH: TuningSystemDef = {
  id: 'scientific-pitch',
  name: 'Scientific Pitch (Verdi Tuning)',
  culture: 'Western Scientific',
  era: '1800s - Present',
  baseFrequency: 256, // C4 = 256 Hz (powers of 2)
  description: 'C4 = 256 Hz, A4 = 430.54 Hz - based on powers of 2',
  characteristics: 'Mathematical elegance, octaves are exact powers of 2',
  calculateFrequency: (noteIndex: number, baseFreq: number = 256) => {
    return baseFreq * Math.pow(2, noteIndex / 12);
  }
};

export const CONCERT_PITCH_432: TuningSystemDef = {
  id: 'concert-432',
  name: '432 Hz Tuning',
  culture: 'Alternative/New Age',
  era: '1900s - Present',
  baseFrequency: 432,
  description: 'A4 = 432 Hz - claimed to be more "natural" or "cosmic"',
  characteristics: 'Lower, warmer pitch, popular in alternative music',
  calculateFrequency: (noteIndex: number, baseFreq: number = 432) => {
    return baseFreq * Math.pow(2, noteIndex / 12);
  }
};

export const BAROQUE_PITCH: TuningSystemDef = {
  id: 'baroque-pitch',
  name: 'Baroque Pitch (A415)',
  culture: 'European Baroque',
  era: '1600 - 1750',
  baseFrequency: 415,
  description: 'Historical pitch standard, about a semitone lower than modern',
  characteristics: 'Warmer, darker sound, historically authentic',
  calculateFrequency: (noteIndex: number, baseFreq: number = 415) => {
    return baseFreq * Math.pow(2, noteIndex / 12);
  }
};

/**
 * ALL TUNING SYSTEMS COLLECTION
 */
export const ALL_TUNING_SYSTEMS: TuningSystemDef[] = [
  EQUAL_TEMPERAMENT_12,
  EQUAL_TEMPERAMENT_19,
  EQUAL_TEMPERAMENT_24,
  EQUAL_TEMPERAMENT_31,
  EQUAL_TEMPERAMENT_53,
  JUST_INTONATION,
  SHRUTI_SYSTEM,
  PYTHAGOREAN_TUNING,
  QUARTER_COMMA_MEANTONE,
  THIRD_COMMA_MEANTONE,
  WERCKMEISTER_III,
  KIRNBERGER_III,
  VALLOTTI_YOUNG,
  ARABIC_MAQAM_24,
  CHINESE_LU_SYSTEM,
  BOHLEN_PIERCE,
  CARLOS_ALPHA,
  CARLOS_BETA,
  CARLOS_GAMMA,
  SCIENTIFIC_PITCH,
  CONCERT_PITCH_432,
  BAROQUE_PITCH
];

export const TUNING_CATEGORIES = {
  "Modern Equal Temperament": [EQUAL_TEMPERAMENT_12, EQUAL_TEMPERAMENT_19, EQUAL_TEMPERAMENT_24, EQUAL_TEMPERAMENT_31, EQUAL_TEMPERAMENT_53],
  "Just Intonation": [JUST_INTONATION, SHRUTI_SYSTEM],
  "Historical European": [PYTHAGOREAN_TUNING, QUARTER_COMMA_MEANTONE, THIRD_COMMA_MEANTONE],
  "Well Temperaments": [WERCKMEISTER_III, KIRNBERGER_III, VALLOTTI_YOUNG],
  "Cultural Systems": [ARABIC_MAQAM_24, CHINESE_LU_SYSTEM],
  "Experimental": [BOHLEN_PIERCE, CARLOS_ALPHA, CARLOS_BETA, CARLOS_GAMMA],
  "Pitch Standards": [SCIENTIFIC_PITCH, CONCERT_PITCH_432, BAROQUE_PITCH]
};

console.log(`✨ Loaded ${ALL_TUNING_SYSTEMS.length} tuning systems from across human history`);
