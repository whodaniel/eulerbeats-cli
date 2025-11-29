/**
 * ============================================================================
 * ADVANCED SYNTHESIS ENGINE
 * Cultural Instrument Models & Sound Design
 * ============================================================================
 *
 * This engine provides sophisticated synthesis capabilities inspired by
 * traditional instruments from global musical cultures.
 */

export interface InstrumentVoice {
  id: string;
  name: string;
  culture: string;
  description: string;
  waveformType: OscillatorType | 'custom';
  harmonicProfile?: number[]; // Harmonic amplitudes
  envelope: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
  vibrato?: {
    rate: number;
    depth: number;
  };
  tremolo?: {
    rate: number;
    depth: number;
  };
  filter?: {
    type: BiquadFilterType;
    frequency: number;
    q: number;
  };
}

/**
 * WESTERN INSTRUMENTS
 */
export const WESTERN_INSTRUMENTS: InstrumentVoice[] = [
  {
    id: 'piano',
    name: 'Piano',
    culture: 'Western',
    description: 'Rich harmonic spectrum with quick attack',
    waveformType: 'custom',
    harmonicProfile: [1, 0.6, 0.4, 0.5, 0.3, 0.2, 0.15, 0.1],
    envelope: { attack: 0.002, decay: 0.3, sustain: 0.7, release: 0.5 }
  },
  {
    id: 'organ',
    name: 'Organ',
    culture: 'Western',
    description: 'Sustained harmonic tone, church organ',
    waveformType: 'sine',
    harmonicProfile: [1, 0, 0.8, 0, 0.6, 0, 0.4, 0.3],
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.9, release: 0.3 }
  },
  {
    id: 'violin',
    name: 'Violin',
    culture: 'Western',
    description: 'Expressive bowed string',
    waveformType: 'sawtooth',
    envelope: { attack: 0.05, decay: 0.1, sustain: 0.8, release: 0.3 },
    vibrato: { rate: 5.5, depth: 0.015 },
    filter: { type: 'lowpass', frequency: 3000, q: 1 }
  },
  {
    id: 'flute',
    name: 'Flute',
    culture: 'Western',
    description: 'Pure, breathy tone',
    waveformType: 'sine',
    harmonicProfile: [1, 0.2, 0.1, 0.05, 0.02],
    envelope: { attack: 0.05, decay: 0.1, sustain: 0.7, release: 0.2 },
    filter: { type: 'highpass', frequency: 500, q: 0.7 }
  },
  {
    id: 'brass',
    name: 'Brass',
    culture: 'Western',
    description: 'Bright, bold trumpet/horn sound',
    waveformType: 'square',
    harmonicProfile: [1, 0.8, 0.7, 0.6, 0.5, 0.4],
    envelope: { attack: 0.02, decay: 0.1, sustain: 0.8, release: 0.2 }
  }
];

/**
 * INDIAN INSTRUMENTS
 */
export const INDIAN_INSTRUMENTS: InstrumentVoice[] = [
  {
    id: 'sitar',
    name: 'Sitar',
    culture: 'Indian (Hindustani)',
    description: 'Plucked string with sympathetic resonance',
    waveformType: 'custom',
    harmonicProfile: [1, 0.8, 0.6, 0.7, 0.5, 0.6, 0.4, 0.3, 0.2],
    envelope: { attack: 0.005, decay: 1.5, sustain: 0.3, release: 0.8 }
  },
  {
    id: 'tabla',
    name: 'Tabla',
    culture: 'Indian (Hindustani)',
    description: 'Tuned hand drums with complex overtones',
    waveformType: 'custom',
    harmonicProfile: [1, 0.4, 0.8, 0.3, 0.6, 0.2, 0.4],
    envelope: { attack: 0.001, decay: 0.15, sustain: 0.1, release: 0.1 }
  },
  {
    id: 'bansuri',
    name: 'Bansuri',
    culture: 'Indian',
    description: 'Bamboo flute with breathy tone',
    waveformType: 'sine',
    harmonicProfile: [1, 0.3, 0.2, 0.1, 0.05],
    envelope: { attack: 0.08, decay: 0.1, sustain: 0.75, release: 0.25 },
    vibrato: { rate: 4.5, depth: 0.02 }
  },
  {
    id: 'tanpura',
    name: 'Tanpura',
    culture: 'Indian',
    description: 'Drone instrument with rich overtones',
    waveformType: 'custom',
    harmonicProfile: [1, 0.7, 0.8, 0.6, 0.7, 0.5, 0.6, 0.4, 0.5],
    envelope: { attack: 0.5, decay: 1.0, sustain: 0.9, release: 2.0 }
  },
  {
    id: 'sarangi',
    name: 'Sarangi',
    culture: 'Indian (Hindustani)',
    description: 'Bowed string with vocal quality',
    waveformType: 'sawtooth',
    harmonicProfile: [1, 0.8, 0.6, 0.7, 0.5, 0.4],
    envelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 0.4 },
    vibrato: { rate: 6, depth: 0.03 }
  }
];

/**
 * MIDDLE EASTERN INSTRUMENTS
 */
export const MIDDLE_EASTERN_INSTRUMENTS: InstrumentVoice[] = [
  {
    id: 'oud',
    name: 'Oud',
    culture: 'Arabic/Middle Eastern',
    description: 'Fretless lute with warm, resonant tone',
    waveformType: 'custom',
    harmonicProfile: [1, 0.7, 0.5, 0.4, 0.3, 0.2],
    envelope: { attack: 0.01, decay: 0.8, sustain: 0.4, release: 0.6 }
  },
  {
    id: 'ney',
    name: 'Ney',
    culture: 'Arabic/Persian/Turkish',
    description: 'End-blown flute with breathy, mystical sound',
    waveformType: 'sine',
    harmonicProfile: [1, 0.2, 0.15, 0.08, 0.04],
    envelope: { attack: 0.1, decay: 0.15, sustain: 0.7, release: 0.3 },
    vibrato: { rate: 5, depth: 0.025 }
  },
  {
    id: 'qanun',
    name: 'Qanun',
    culture: 'Arabic/Turkish',
    description: 'Plucked zither with bright, shimmering tone',
    waveformType: 'custom',
    harmonicProfile: [1, 0.6, 0.8, 0.5, 0.6, 0.4, 0.3],
    envelope: { attack: 0.005, decay: 1.0, sustain: 0.3, release: 0.7 },
    tremolo: { rate: 8, depth: 0.2 }
  },
  {
    id: 'darbuka',
    name: 'Darbuka',
    culture: 'Arabic/Middle Eastern',
    description: 'Goblet drum with sharp attack',
    waveformType: 'custom',
    harmonicProfile: [1, 0.3, 0.5, 0.2, 0.4],
    envelope: { attack: 0.001, decay: 0.12, sustain: 0.05, release: 0.08 }
  },
  {
    id: 'santoor',
    name: 'Santoor',
    culture: 'Persian/Kashmiri',
    description: 'Hammered dulcimer with shimmering sound',
    waveformType: 'custom',
    harmonicProfile: [1, 0.7, 0.6, 0.5, 0.4, 0.3],
    envelope: { attack: 0.002, decay: 1.2, sustain: 0.2, release: 0.9 },
    tremolo: { rate: 10, depth: 0.15 }
  }
];

/**
 * EAST ASIAN INSTRUMENTS
 */
export const EAST_ASIAN_INSTRUMENTS: InstrumentVoice[] = [
  {
    id: 'guzheng',
    name: 'Guzheng',
    culture: 'Chinese',
    description: 'Plucked zither with bright, resonant tone',
    waveformType: 'custom',
    harmonicProfile: [1, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2],
    envelope: { attack: 0.003, decay: 1.5, sustain: 0.3, release: 1.0 },
    vibrato: { rate: 4, depth: 0.02 }
  },
  {
    id: 'erhu',
    name: 'Erhu',
    culture: 'Chinese',
    description: 'Two-stringed bowed instrument, vocal quality',
    waveformType: 'sawtooth',
    harmonicProfile: [1, 0.8, 0.6, 0.5, 0.4],
    envelope: { attack: 0.08, decay: 0.15, sustain: 0.8, release: 0.3 },
    vibrato: { rate: 6.5, depth: 0.035 }
  },
  {
    id: 'shakuhachi',
    name: 'Shakuhachi',
    culture: 'Japanese',
    description: 'Bamboo flute with breathy, meditative tone',
    waveformType: 'sine',
    harmonicProfile: [1, 0.25, 0.15, 0.1, 0.05],
    envelope: { attack: 0.15, decay: 0.2, sustain: 0.7, release: 0.4 },
    vibrato: { rate: 4, depth: 0.03 }
  },
  {
    id: 'koto',
    name: 'Koto',
    culture: 'Japanese',
    description: 'Plucked long zither with delicate tone',
    waveformType: 'custom',
    harmonicProfile: [1, 0.6, 0.5, 0.4, 0.3, 0.2],
    envelope: { attack: 0.005, decay: 1.8, sustain: 0.2, release: 1.2 }
  },
  {
    id: 'taiko',
    name: 'Taiko',
    culture: 'Japanese',
    description: 'Large drum with deep, resonant tone',
    waveformType: 'custom',
    harmonicProfile: [1, 0.2, 0.4, 0.1, 0.3],
    envelope: { attack: 0.001, decay: 0.5, sustain: 0.3, release: 0.8 }
  },
  {
    id: 'pipa',
    name: 'Pipa',
    culture: 'Chinese',
    description: 'Plucked lute with percussive attack',
    waveformType: 'custom',
    harmonicProfile: [1, 0.7, 0.5, 0.6, 0.4, 0.3],
    envelope: { attack: 0.002, decay: 0.6, sustain: 0.3, release: 0.5 }
  },
  {
    id: 'gayageum',
    name: 'Gayageum',
    culture: 'Korean',
    description: 'Korean zither with expressive bending',
    waveformType: 'custom',
    harmonicProfile: [1, 0.65, 0.5, 0.45, 0.3, 0.2],
    envelope: { attack: 0.005, decay: 1.4, sustain: 0.3, release: 0.9 },
    vibrato: { rate: 5, depth: 0.025 }
  }
];

/**
 * AFRICAN INSTRUMENTS
 */
export const AFRICAN_INSTRUMENTS: InstrumentVoice[] = [
  {
    id: 'djembe',
    name: 'Djembe',
    culture: 'West African',
    description: 'Hand drum with wide tonal range',
    waveformType: 'custom',
    harmonicProfile: [1, 0.4, 0.6, 0.3, 0.5],
    envelope: { attack: 0.001, decay: 0.15, sustain: 0.1, release: 0.12 }
  },
  {
    id: 'kora',
    name: 'Kora',
    culture: 'West African',
    description: '21-string harp-lute with harp-like tone',
    waveformType: 'custom',
    harmonicProfile: [1, 0.6, 0.5, 0.4, 0.3, 0.2],
    envelope: { attack: 0.005, decay: 1.2, sustain: 0.4, release: 0.8 }
  },
  {
    id: 'mbira',
    name: 'Mbira',
    culture: 'African (Zimbabwe)',
    description: 'Thumb piano with metallic, percussive tone',
    waveformType: 'custom',
    harmonicProfile: [1, 0.8, 0.6, 0.7, 0.5, 0.6],
    envelope: { attack: 0.001, decay: 0.8, sustain: 0.2, release: 0.6 }
  },
  {
    id: 'balafon',
    name: 'Balafon',
    culture: 'West African',
    description: 'Wooden xylophone with gourd resonators',
    waveformType: 'custom',
    harmonicProfile: [1, 0.5, 0.4, 0.3, 0.2],
    envelope: { attack: 0.002, decay: 0.4, sustain: 0.2, release: 0.3 }
  }
];

/**
 * INDONESIAN GAMELAN INSTRUMENTS
 */
export const GAMELAN_INSTRUMENTS: InstrumentVoice[] = [
  {
    id: 'gamelan-gong',
    name: 'Gamelan Gong',
    culture: 'Indonesian',
    description: 'Large bronze gong with shimmering overtones',
    waveformType: 'custom',
    harmonicProfile: [1, 0.6, 0.8, 0.5, 0.7, 0.4, 0.6, 0.3, 0.5],
    envelope: { attack: 0.01, decay: 3.0, sustain: 0.6, release: 5.0 }
  },
  {
    id: 'gamelan-saron',
    name: 'Gamelan Saron',
    culture: 'Indonesian',
    description: 'Metallophone with bright, ringing tone',
    waveformType: 'custom',
    harmonicProfile: [1, 0.7, 0.6, 0.5, 0.4],
    envelope: { attack: 0.002, decay: 0.8, sustain: 0.3, release: 0.6 }
  },
  {
    id: 'gamelan-gender',
    name: 'Gamelan Gender',
    culture: 'Indonesian',
    description: 'Bronze metallophone with tube resonators',
    waveformType: 'custom',
    harmonicProfile: [1, 0.6, 0.7, 0.5, 0.6, 0.4],
    envelope: { attack: 0.005, decay: 1.5, sustain: 0.4, release: 1.2 }
  }
];

/**
 * LATIN AMERICAN INSTRUMENTS
 */
export const LATIN_INSTRUMENTS: InstrumentVoice[] = [
  {
    id: 'congas',
    name: 'Congas',
    culture: 'Afro-Cuban',
    description: 'Tall hand drums with warm tone',
    waveformType: 'custom',
    harmonicProfile: [1, 0.4, 0.5, 0.3, 0.4],
    envelope: { attack: 0.001, decay: 0.2, sustain: 0.15, release: 0.15 }
  },
  {
    id: 'charango',
    name: 'Charango',
    culture: 'Andean',
    description: 'Small guitar-like instrument',
    waveformType: 'custom',
    harmonicProfile: [1, 0.7, 0.5, 0.4, 0.3],
    envelope: { attack: 0.005, decay: 0.5, sustain: 0.4, release: 0.4 }
  },
  {
    id: 'pan-flute',
    name: 'Pan Flute',
    culture: 'Andean',
    description: 'Multiple flutes with ethereal sound',
    waveformType: 'sine',
    harmonicProfile: [1, 0.3, 0.2, 0.1],
    envelope: { attack: 0.06, decay: 0.1, sustain: 0.75, release: 0.25 }
  }
];

/**
 * COMPREHENSIVE INSTRUMENT COLLECTION
 */
export const ALL_INSTRUMENTS = [
  ...WESTERN_INSTRUMENTS,
  ...INDIAN_INSTRUMENTS,
  ...MIDDLE_EASTERN_INSTRUMENTS,
  ...EAST_ASIAN_INSTRUMENTS,
  ...AFRICAN_INSTRUMENTS,
  ...GAMELAN_INSTRUMENTS,
  ...LATIN_INSTRUMENTS
];

export const INSTRUMENT_CATEGORIES = {
  "Western": WESTERN_INSTRUMENTS,
  "Indian": INDIAN_INSTRUMENTS,
  "Middle Eastern": MIDDLE_EASTERN_INSTRUMENTS,
  "East Asian": EAST_ASIAN_INSTRUMENTS,
  "African": AFRICAN_INSTRUMENTS,
  "Indonesian Gamelan": GAMELAN_INSTRUMENTS,
  "Latin American": LATIN_INSTRUMENTS
};

/**
 * SYNTHESIS ENGINE CLASS
 */
export class AdvancedSynthEngine {
  private audioContext: AudioContext;
  private masterGain: GainNode;
  private compressor: DynamicsCompressorNode;
  private reverb: ConvolverNode | null = null;

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;

    // Master output chain
    this.masterGain = audioContext.createGain();
    this.masterGain.gain.value = 0.7;

    this.compressor = audioContext.createDynamicsCompressor();
    this.compressor.threshold.value = -20;
    this.compressor.knee.value = 10;
    this.compressor.ratio.value = 4;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.25;

    this.masterGain.connect(this.compressor);
    this.compressor.connect(audioContext.destination);
  }

  /**
   * Play a note with a specific instrument voice
   */
  playNote(
    frequency: number,
    instrument: InstrumentVoice,
    duration: number = 1.0,
    velocity: number = 1.0
  ): void {
    const now = this.audioContext.currentTime;
    const env = instrument.envelope;

    // Create oscillators for harmonics
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    if (instrument.harmonicProfile && instrument.harmonicProfile.length > 0) {
      // Multi-harmonic synthesis
      instrument.harmonicProfile.forEach((amplitude, index) => {
        if (amplitude > 0.01) {
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();

          osc.frequency.value = frequency * (index + 1); // Harmonics
          osc.type = instrument.waveformType === 'custom' ? 'sine' : instrument.waveformType;

          gain.gain.value = 0;

          osc.connect(gain);
          oscillators.push(osc);
          gains.push(gain);
        }
      });
    } else {
      // Single oscillator
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.frequency.value = frequency;
      osc.type = instrument.waveformType === 'custom' ? 'sine' : instrument.waveformType;
      gain.gain.value = 0;

      osc.connect(gain);
      oscillators.push(osc);
      gains.push(gain);
    }

    // Filter
    let filterNode: BiquadFilterNode | null = null;
    if (instrument.filter) {
      filterNode = this.audioContext.createBiquadFilter();
      filterNode.type = instrument.filter.type;
      filterNode.frequency.value = instrument.filter.frequency;
      filterNode.Q.value = instrument.filter.q;
    }

    // Vibrato
    let vibratoOsc: OscillatorNode | null = null;
    let vibratoGain: GainNode | null = null;
    if (instrument.vibrato) {
      vibratoOsc = this.audioContext.createOscillator();
      vibratoGain = this.audioContext.createGain();

      vibratoOsc.frequency.value = instrument.vibrato.rate;
      vibratoGain.gain.value = frequency * instrument.vibrato.depth;

      vibratoOsc.connect(vibratoGain);
      vibratoOsc.start(now);

      oscillators.forEach(osc => {
        if (vibratoGain) vibratoGain.connect(osc.frequency);
      });
    }

    // Connect nodes
    gains.forEach((gain, index) => {
      const amplitude = instrument.harmonicProfile?.[index] || 1;

      if (filterNode) {
        gain.connect(filterNode);
      } else {
        gain.connect(this.masterGain);
      }

      // ADSR Envelope
      const targetAmplitude = amplitude * velocity * 0.3;

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(targetAmplitude, now + env.attack);
      gain.gain.linearRampToValueAtTime(
        targetAmplitude * env.sustain,
        now + env.attack + env.decay
      );
      gain.gain.setValueAtTime(
        targetAmplitude * env.sustain,
        now + duration
      );
      gain.gain.linearRampToValueAtTime(0, now + duration + env.release);
    });

    if (filterNode) {
      filterNode.connect(this.masterGain);
    }

    // Start oscillators
    oscillators.forEach(osc => osc.start(now));

    // Stop and cleanup
    const stopTime = now + duration + env.release + 0.1;
    oscillators.forEach(osc => osc.stop(stopTime));
    if (vibratoOsc) vibratoOsc.stop(stopTime);
  }

  setMasterVolume(volume: number): void {
    this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
  }

  getMasterVolume(): number {
    return this.masterGain.gain.value;
  }
}

console.log(`✨ Loaded ${ALL_INSTRUMENTS.length} cultural instrument models from ${Object.keys(INSTRUMENT_CATEGORIES).length} traditions`);
