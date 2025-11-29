import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Play, Square, Grid, Settings, Volume2, Info, Activity,
  AlertTriangle, Dna, Box, Layers, RefreshCw, Maximize2,
  Minimize2, Pause, MousePointer2, Music, Globe, Wand2,
  Save, Download, Mic, Radio, Zap, Clock, Target, BookOpen
} from 'lucide-react';

// Import our comprehensive libraries
import { ALL_SCALES, SCALE_CATEGORIES, Scale } from './data/globalScales';
import { ALL_TUNING_SYSTEMS, TUNING_CATEGORIES, TuningSystemDef } from './engines/tuningSystem';
import { ALL_RHYTHMS, RHYTHM_CATEGORIES, RhythmPattern, patternToTimeEvents } from './data/rhythmPatterns';
import { ALL_INSTRUMENTS, INSTRUMENT_CATEGORIES, InstrumentVoice, AdvancedSynthEngine } from './engines/synthEngine';

console.log(' = LOADING GLOBAL MUSICAL KNOWLEDGE SYSTEM = ');
console.log(`📚 ${ALL_SCALES.length} Scales | ${ALL_TUNING_SYSTEMS.length} Tuning Systems`);
console.log(`🥁 ${ALL_RHYTHMS.length} Rhythm Patterns | 🎵 ${ALL_INSTRUMENTS.length} Instruments`);

/**
 * ============================================================================
 * THE MOST ADVANCED DIGITAL MUSIC PRODUCTION UI
 * Representing the Complete Knowledge of Human Musical Traditions
 * ============================================================================
 */

const BASE_TUNING_SCIENTIFIC = 256; // C4
const BASE_TUNING_CONCERT = 293.665; // D4 approx
const SPEED_OF_LIGHT = 299792458; // m/s
const BASE_PAIR_LENGTH = 3.4e-10; // meters

// Human Genome Base Pairs
const CHROMOSOME_BP: Record<string, number> = {
  '1': 248956422, '2': 242193529, '3': 198295559, '4': 190214555,
  '5': 181538259, '6': 170805979, '7': 159345973, '8': 145138636,
  '9': 138394717, '10': 133797422, '11': 135086622, '12': 133275309,
  '13': 114364328, '14': 107043718, '15': 101991189, '16': 90338345,
  '17': 83257441, '18': 80373285, '19': 58617616, '20': 64444167,
  '21': 46709983, '22': 50818468, 'X': 156040895, 'Y': 57227415
};

const PITCH_COLORS = [
  '#ff3b30', '#ff9500', '#ffcc00', '#ffe629', '#4cd964', '#28cd41',
  '#00c7be', '#59adc4', '#007aff', '#5856d6', '#af52de', '#ff2d55'
];

/**
 * MATH & ACOUSTIC ENGINE
 */
const foldOctave = (ratio: number) => {
  if (ratio <= 0) return 0.001;
  return Math.pow(2, Math.log2(ratio) - Math.floor(Math.log2(ratio)));
};

const getPitchColor = (ratio: number) => {
  const folded = foldOctave(ratio);
  const semitones = Math.log2(folded) * 12;
  const index = Math.round(semitones) % 12;
  return PITCH_COLORS[index] || '#888';
};

const calculateHarmonicValue = (x: number, y: number) => {
  if (x === 0 || y === 0) return 0;
  const termX = Math.pow(Math.abs(x), x / Math.abs(x));
  const termY = Math.pow(Math.abs(y), y / Math.abs(y));
  return termX * termY;
};

const calculateCents = (frequency: number, baseFreq: number) => {
  if (frequency <= 0) return 0;
  const foldedFreq = foldOctave(frequency / baseFreq) * baseFreq;
  const semitonesFromBase = 12 * Math.log2(foldedFreq / baseFreq);
  const nearestSemitone = Math.round(semitonesFromBase);
  return Math.round((semitonesFromBase - nearestSemitone) * 100);
};

const getNoteName = (frequency: number, baseFreq: number, baseName: string = 'C') => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const ratio = frequency / baseFreq;
  const semitones = 12 * Math.log2(ratio);
  const octaveOffset = Math.floor(semitones / 12);
  const normalizedSemitone = Math.round(semitones - (octaveOffset * 12));

  const baseIndex = notes.indexOf(baseName);
  let targetIndex = (baseIndex + normalizedSemitone) % 12;
  if (targetIndex < 0) targetIndex += 12;

  const octave = Math.floor(semitones / 12) + 4;
  return `${notes[targetIndex]}${octave}`;
};

const calculateChromosomeFreq = (bp: number) => {
  const wavelength = bp * BASE_PAIR_LENGTH;
  const rawFreq = SPEED_OF_LIGHT / wavelength;
  const target = 256;
  return rawFreq * Math.pow(2, Math.floor(Math.log2(target / rawFreq)));
};

export default function App() {
  // View State
  const [mainMode, setMainMode] = useState<'MATRIX' | 'SCALE_EXPLORER' | 'RHYTHM_LAB' | 'COMPOSER'>('MATRIX');
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [matrixMode, setMatrixMode] = useState<'LAMBDOMA' | 'HARMONIC' | 'GOLDEN' | 'CHROMOSOMAL'>('LAMBDOMA');

  // Audio State
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [activeCell, setActiveCell] = useState<any>(null);

  // Matrix State
  const [gridSize, setGridSize] = useState(8);
  const [showFolded, setShowFolded] = useState(true);

  // Scale Explorer State
  const [selectedScale, setSelectedScale] = useState<Scale>(ALL_SCALES[0]);
  const [selectedTuning, setSelectedTuning] = useState<TuningSystemDef>(ALL_TUNING_SYSTEMS[0]);
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentVoice>(ALL_INSTRUMENTS[0]);
  const [scaleRootFreq, setScaleRootFreq] = useState(256);

  // Rhythm Lab State
  const [selectedRhythm, setSelectedRhythm] = useState<RhythmPattern>(ALL_RHYTHMS[0]);
  const [rhythmBPM, setRhythmBPM] = useState(120);
  const [isPlaying Rhythm, setIsPlayingRhythm] = useState(false);

  // Composer State
  const [recording, setRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState<any[]>([]);

  // Education State
  const [showEducation, setShowEducation] = useState(false);

  // Audio Engine
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthEngineRef = useRef<AdvancedSynthEngine | null>(null);
  const rhythmIntervalRef = useRef<number | null>(null);
  const activeOscillators = useRef(new Map());

  // Initialize Audio
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
      synthEngineRef.current = new AdvancedSynthEngine(audioCtxRef.current);
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    setAudioEnabled(!audioEnabled);
  }, [audioEnabled]);

  // Play tone with selected instrument
  const playToneWithInstrument = useCallback((freq: number, duration: number = 1.0) => {
    if (!audioCtxRef.current || !synthEngineRef.current || !audioEnabled) return;
    synthEngineRef.current.playNote(freq, selectedInstrument, duration, volume);
  }, [audioEnabled, selectedInstrument, volume]);

  // Play scale
  const playScale = useCallback(() => {
    if (!audioEnabled || !selectedScale) return;

    const baseFreq = scaleRootFreq;
    selectedScale.intervals.forEach((cents, index) => {
      setTimeout(() => {
        const freq = baseFreq * Math.pow(2, cents / 1200);
        playToneWithInstrument(freq, 0.5);
      }, index * 300);
    });
  }, [audioEnabled, selectedScale, scaleRootFreq, playToneWithInstrument]);

  // Play rhythm pattern
  const toggleRhythm = useCallback(() => {
    if (isPlayingRhythm) {
      if (rhythmIntervalRef.current) {
        clearInterval(rhythmIntervalRef.current);
        rhythmIntervalRef.current = null;
      }
      setIsPlayingRhythm(false);
    } else {
      if (!selectedRhythm || !audioEnabled) return;

      const events = patternToTimeEvents(selectedRhythm, rhythmBPM);
      const cycleDuration = (60 / rhythmBPM) * (selectedRhythm.subdivisions / 4);

      let eventIndex = 0;
      const playNextEvent = () => {
        const event = events[eventIndex % events.length];
        const freq = 200 + (event.velocity * 100); // Vary pitch by velocity
        playToneWithInstrument(freq, 0.1);

        eventIndex++;
        if (eventIndex >= events.length) eventIndex = 0;
      };

      playNextEvent();
      rhythmIntervalRef.current = window.setInterval(playNextEvent, (cycleDuration / events.length) * 1000);
      setIsPlayingRhythm(true);
    }
  }, [isPlayingRhythm, selectedRhythm, rhythmBPM, audioEnabled, playToneWithInstrument]);

  // Matrix data generation (from original code)
  const matrixData = useMemo(() => {
    const grid = [];
    const baseFreq = selectedTuning.baseFrequency;

    if (matrixMode === 'CHROMOSOMAL') {
      const chromNames = Object.keys(CHROMOSOME_BP).sort((a, b) => {
        const numA = parseInt(a) || (a === 'X' ? 23 : 24);
        const numB = parseInt(b) || (b === 'X' ? 23 : 24);
        return numA - numB;
      });

      const cols = 6;
      let row: any[] = [];

      chromNames.forEach((name, index) => {
        const bp = CHROMOSOME_BP[name];
        const freq = calculateChromosomeFreq(bp);
        const ratio = freq / baseFreq;
        const color = getPitchColor(ratio);
        const cents = calculateCents(freq, baseFreq);

        row.push({
          x: index % cols, y: Math.floor(index / cols),
          realX: index % cols, realY: Math.floor(index / cols),
          ratio, frequency: freq, label: `${name}`,
          cents, color, octave: 4, isActive: false, isFolded: true,
          details: `${(bp / 1000000).toFixed(1)}M bp`
        });

        if (row.length === cols) {
          grid.push(row);
          row = [];
        }
      });
      if (row.length > 0) grid.push(row);
      return grid;
    }

    // Standard Math Modes
    const size = parseInt(gridSize.toString());
    let xStart = 1, yStart = 1, xEnd = size, yEnd = size;

    if (matrixMode === 'HARMONIC') {
      const half = size;
      xStart = -half; xEnd = half;
      yStart = -half; yEnd = half;
    }

    const range = [];
    for (let i = xStart; i <= xEnd; i++) {
      if (matrixMode === 'HARMONIC' && i === 0) continue;
      range.push(i);
    }

    const xRange = range;
    const yRange = matrixMode === 'HARMONIC' ? [...range].reverse() : range;

    yRange.forEach((y, rIndex) => {
      const rowData: any[] = [];
      xRange.forEach((x, cIndex) => {
        let ratio = 1;
        let label = '';
        let isFolded = false;

        if (matrixMode === 'LAMBDOMA') {
          ratio = y / x;
          label = `${y}:${x}`;
        } else if (matrixMode === 'GOLDEN') {
          const absX = Math.abs(x);
          const absY = Math.abs(y);
          if (absY === 1 && absX === 1) ratio = 1.61803;
          else ratio = (absX + absY) / absX;
          label = `(${absX},${absY})`;
        } else {
          ratio = calculateHarmonicValue(x, y);
          if (x > 0 && y > 0) label = `${x}*${y}`;
          else if (x < 0 && y < 0) label = `1/${Math.abs(x * y)}`;
          else label = `${x},${y}`;
        }

        const rawFreq = baseFreq * ratio;
        let playFreq = rawFreq;
        const safeMax = 12000;
        const safeMin = 20;

        if (rawFreq > safeMax || rawFreq < safeMin) {
          playFreq = baseFreq * foldOctave(ratio);
          isFolded = true;
        }

        const cents = calculateCents(playFreq, baseFreq);
        const color = getPitchColor(showFolded ? foldOctave(ratio) : ratio);

        rowData.push({
          x: cIndex, y: rIndex, realX: x, realY: y,
          ratio, frequency: playFreq, label, cents, color,
          octave: Math.floor(Math.log2(Math.abs(ratio) || 1)),
          isActive: false, isFolded
        });
      });
      grid.push(rowData);
    });

    return grid;
  }, [matrixMode, gridSize, selectedTuning, showFolded]);

  // Handle cell interactions
  const handleCellEnter = (cell: any) => {
    if (!cell) return;
    setActiveCell({ x: cell.x, y: cell.y, realX: cell.realX, realY: cell.realY });
    playToneWithInstrument(cell.frequency, 0.5);

    if (recording) {
      setRecordedNotes(prev => [...prev, { ...cell, timestamp: Date.now() }]);
    }
  };

  const handleCellLeave = (cell: any) => {
    if (!cell || viewMode !== '2D') return;
    setActiveCell(null);
  };

  const currentCellData = useMemo(() => {
    if (!activeCell || !matrixData || matrixData.length === 0) return null;
    const row = matrixData[activeCell.y];
    return row?.find((c: any) => c.x === activeCell.x);
  }, [activeCell, matrixData]);

  useEffect(() => {
    if (synthEngineRef.current) {
      synthEngineRef.current.setMasterVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (rhythmIntervalRef.current) clearInterval(rhythmIntervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center selection:bg-teal-500/30">

      {/* HEADER */}
      <header className="w-full max-w-[1600px] mb-8 border-b border-slate-800/60 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-light tracking-tight text-white flex items-center gap-3">
              <Globe className="text-teal-400" size={42} />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
                UNIVERSAL
              </span>
              <span>Music Production System</span>
            </h1>
            <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Activity size={14} className="text-teal-500" />
              THE COMPLETE KNOWLEDGE OF HUMAN MUSICAL TRADITIONS
            </p>
            <div className="flex gap-4 text-xs text-slate-500 mt-1">
              <span>📚 {ALL_SCALES.length} Scales</span>
              <span>🎹 {ALL_TUNING_SYSTEMS.length} Tunings</span>
              <span>🥁 {ALL_RHYTHMS.length} Rhythms</span>
              <span>🎵 {ALL_INSTRUMENTS.length} Instruments</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800 backdrop-blur-sm">
            <button
              onClick={initAudio}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-xs transition-all ${
                audioEnabled
                  ? 'bg-teal-500/10 text-teal-400 border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.2)]'
                  : 'bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:shadow-lg'
              }`}
            >
              {audioEnabled ? <><Activity size={16} className="animate-pulse"/> ENGINE ACTIVE</> : <><Play size={16} /> INITIALIZE AUDIO</>}
            </button>
          </div>
        </div>

        {/* MODE SELECTOR */}
        <div className="flex gap-2 mt-6 flex-wrap">
          {[
            { id: 'MATRIX', label: 'Harmonic Matrix', icon: Grid },
            { id: 'SCALE_EXPLORER', label: 'Scale Explorer', icon: Music },
            { id: 'RHYTHM_LAB', label: 'Rhythm Laboratory', icon: Radio },
            { id: 'COMPOSER', label: 'Composer Studio', icon: Wand2 }
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setMainMode(mode.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                mainMode === mode.id
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <mode.icon size={16} />
              {mode.label}
            </button>
          ))}
        </div>
      </header>

      <div className="w-full max-w-[1600px] flex flex-col xl:flex-row gap-8 items-start">

        {/* LEFT SIDEBAR - CONTROLS */}
        <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0">

          {/* GLOBAL SETTINGS PANEL */}
          <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-slate-300">
              <Settings size={16} className="text-teal-400"/>
              <span className="font-bold text-xs tracking-widest uppercase">Global Controls</span>
            </div>

            <div className="space-y-4">
              {/* Tuning System */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block">Tuning System</label>
                <select
                  value={selectedTuning.id}
                  onChange={(e) => setSelectedTuning(ALL_TUNING_SYSTEMS.find(t => t.id === e.target.value) || ALL_TUNING_SYSTEMS[0])}
                  className="w-full bg-slate-800 text-white p-2 rounded text-xs border border-slate-700 focus:border-teal-500 outline-none"
                >
                  {Object.entries(TUNING_CATEGORIES).map(([category, tunings]) => (
                    <optgroup key={category} label={category}>
                      {tunings.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="text-[10px] text-slate-500 mt-1">{selectedTuning.description}</div>
              </div>

              {/* Instrument */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block">Instrument Voice</label>
                <select
                  value={selectedInstrument.id}
                  onChange={(e) => setSelectedInstrument(ALL_INSTRUMENTS.find(i => i.id === e.target.value) || ALL_INSTRUMENTS[0])}
                  className="w-full bg-slate-800 text-white p-2 rounded text-xs border border-slate-700 focus:border-teal-500 outline-none"
                >
                  {Object.entries(INSTRUMENT_CATEGORIES).map(([category, instruments]) => (
                    <optgroup key={category} label={category}>
                      {instruments.map(inst => (
                        <option key={inst.id} value={inst.id}>{inst.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="text-[10px] text-slate-500 mt-1">{selectedInstrument.description}</div>
              </div>

              {/* Volume */}
              <div>
                <div className="flex justify-between text-xs mb-2 text-slate-400 font-medium">
                  <span className="flex items-center gap-2"><Volume2 size={12}/> Master Volume</span>
                  <span className="text-white bg-slate-800 px-2 rounded">{(volume * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range" min="0" max="1" step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>
            </div>
          </div>

          {/* MODE-SPECIFIC CONTROLS */}
          {mainMode === 'MATRIX' && (
            <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-slate-300">
                <Layers size={16} className="text-blue-400"/>
                <span className="font-bold text-xs tracking-widest uppercase">Matrix Mode</span>
              </div>
              <div className="flex flex-col gap-2">
                {['LAMBDOMA', 'HARMONIC', 'GOLDEN', 'CHROMOSOMAL'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMatrixMode(m as any)}
                    className={`px-4 py-3 text-xs font-medium rounded-lg text-left transition-all flex items-center justify-between border ${
                      matrixMode === m
                        ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-[inset_0_0_10px_rgba(37,99,235,0.2)]'
                        : 'bg-slate-800/50 border-transparent hover:border-slate-600 hover:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <span>
                      {m === 'LAMBDOMA' && 'Lambdoma Matrix'}
                      {m === 'HARMONIC' && 'Harmonic Field'}
                      {m === 'GOLDEN' && 'Phi Sequence'}
                      {m === 'CHROMOSOMAL' && 'Human Genome'}
                    </span>
                    {m === 'CHROMOSOMAL' && <Dna size={14} className="text-teal-400"/>}
                  </button>
                ))}
              </div>

              {matrixMode !== 'CHROMOSOMAL' && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-2 text-slate-400">
                    <span>Grid Size</span>
                    <span className="bg-slate-800 px-2 rounded">{gridSize}</span>
                  </div>
                  <input
                    type="range" min="4" max="16" step="1"
                    value={gridSize}
                    onChange={(e) => setGridSize(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              )}

              <div className="mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('2D')}
                    className={`flex-1 px-3 py-2 rounded text-xs font-bold transition ${
                      viewMode === '2D' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    2D
                  </button>
                  <button
                    onClick={() => setViewMode('3D')}
                    className={`flex-1 px-3 py-2 rounded text-xs font-bold transition ${
                      viewMode === '3D' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    3D
                  </button>
                </div>
              </div>
            </div>
          )}

          {mainMode === 'SCALE_EXPLORER' && (
            <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-slate-300">
                <Music size={16} className="text-purple-400"/>
                <span className="font-bold text-xs tracking-widest uppercase">Scale Selection</span>
              </div>

              <select
                value={`${selectedScale.culture}-${selectedScale.name}`}
                onChange={(e) => {
                  const [culture, ...nameParts] = e.target.value.split('-');
                  const name = nameParts.join('-');
                  setSelectedScale(ALL_SCALES.find(s => s.culture === culture && s.name === name) || ALL_SCALES[0]);
                }}
                className="w-full bg-slate-800 text-white p-2 rounded text-xs border border-slate-700 focus:border-purple-500 outline-none mb-3"
              >
                {Object.entries(SCALE_CATEGORIES).map(([category, scales]) => (
                  <optgroup key={category} label={category}>
                    {scales.map(scale => (
                      <option key={`${scale.culture}-${scale.name}`} value={`${scale.culture}-${scale.name}`}>
                        {scale.name} ({scale.culture})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <div className="bg-slate-800/50 p-3 rounded-lg text-xs space-y-2 mb-3">
                <div><strong className="text-teal-400">Culture:</strong> {selectedScale.culture}</div>
                <div><strong className="text-teal-400">Region:</strong> {selectedScale.region}</div>
                <div><strong className="text-teal-400">Era:</strong> {selectedScale.era}</div>
                <div className="text-slate-400 text-[10px] leading-relaxed">{selectedScale.description}</div>
                {selectedScale.emotionalCharacter && (
                  <div className="text-purple-300 text-[10px]">✨ {selectedScale.emotionalCharacter}</div>
                )}
              </div>

              <button
                onClick={playScale}
                disabled={!audioEnabled}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg font-bold text-sm hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Play size={16} /> Play Scale
              </button>
            </div>
          )}

          {mainMode === 'RHYTHM_LAB' && (
            <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-slate-300">
                <Radio size={16} className="text-orange-400"/>
                <span className="font-bold text-xs tracking-widest uppercase">Rhythm Pattern</span>
              </div>

              <select
                value={`${selectedRhythm.culture}-${selectedRhythm.name}`}
                onChange={(e) => {
                  const [culture, ...nameParts] = e.target.value.split('-');
                  const name = nameParts.join('-');
                  setSelectedRhythm(ALL_RHYTHMS.find(r => r.culture === culture && r.name === name) || ALL_RHYTHMS[0]);
                }}
                className="w-full bg-slate-800 text-white p-2 rounded text-xs border border-slate-700 focus:border-orange-500 outline-none mb-3"
              >
                {Object.entries(RHYTHM_CATEGORIES).map(([category, rhythms]) => (
                  <optgroup key={category} label={category}>
                    {rhythms.map(rhythm => (
                      <option key={`${rhythm.culture}-${rhythm.name}`} value={`${rhythm.culture}-${rhythm.name}`}>
                        {rhythm.name} ({rhythm.culture})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <div className="bg-slate-800/50 p-3 rounded-lg text-xs space-y-2 mb-3">
                <div><strong className="text-orange-400">Culture:</strong> {selectedRhythm.culture}</div>
                <div><strong className="text-orange-400">Cycle:</strong> {selectedRhythm.subdivisions} beats</div>
                <div className="text-slate-400 text-[10px]">{selectedRhythm.description}</div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs mb-2 text-slate-400">
                  <span className="flex items-center gap-2"><Clock size={12}/> BPM</span>
                  <span className="bg-slate-800 px-2 rounded">{rhythmBPM}</span>
                </div>
                <input
                  type="range" min="40" max="240" step="1"
                  value={rhythmBPM}
                  onChange={(e) => setRhythmBPM(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              <button
                onClick={toggleRhythm}
                disabled={!audioEnabled}
                className={`w-full px-4 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition ${
                  isPlayingRhythm
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-lg'
                } disabled:opacity-50`}
              >
                {isPlayingRhythm ? <><Square size={16} /> Stop</> : <><Play size={16} /> Play Pattern</>}
              </button>
            </div>
          )}

          {mainMode === 'COMPOSER' && (
            <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-slate-300">
                <Wand2 size={16} className="text-pink-400"/>
                <span className="font-bold text-xs tracking-widest uppercase">Composer Tools</span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setRecording(!recording)}
                  className={`w-full px-4 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition ${
                    recording
                      ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                      : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:shadow-lg'
                  }`}
                >
                  <Mic size={16} />
                  {recording ? 'Stop Recording' : 'Start Recording'}
                </button>

                <div className="bg-slate-800/50 p-3 rounded text-xs">
                  <div className="text-slate-400 mb-1">Recorded Notes:</div>
                  <div className="text-white font-bold">{recordedNotes.length}</div>
                </div>

                {recordedNotes.length > 0 && (
                  <>
                    <button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <Save size={14} /> Save Composition
                    </button>
                    <button
                      onClick={() => setRecordedNotes([])}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-xs font-bold"
                    >
                      Clear
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* INFO PANEL */}
          <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl flex-grow min-h-[200px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-slate-300">
              <Info size={16} className="text-purple-400"/>
              <span className="font-bold text-xs tracking-widest uppercase">Inspector</span>
            </div>

            {currentCellData ? (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between border-b border-slate-700/50 pb-2">
                  <span className="text-xs text-slate-500 uppercase">Target</span>
                  <span className="text-lg font-bold text-white">
                    {matrixMode === 'CHROMOSOMAL' ? `Chr ${currentCellData.label}` : `(${currentCellData.realX}, ${currentCellData.realY})`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase mb-0.5">Frequency</div>
                    <div className="text-sm font-mono text-teal-300">{currentCellData.frequency.toFixed(2)} Hz</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase mb-0.5">Ratio</div>
                    <div className="text-sm font-mono text-blue-300">{currentCellData.ratio.toFixed(4)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase mb-0.5">Pitch</div>
                    <div className="text-sm font-bold text-white">
                      {getNoteName(currentCellData.frequency, selectedTuning.baseFrequency)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase mb-0.5">Cents</div>
                    <div className={`text-sm font-bold ${currentCellData.cents === 0 ? 'text-slate-400' : currentCellData.cents > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {currentCellData.cents > 0 ? '+' : ''}{currentCellData.cents}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-600 flex flex-col items-center gap-3 flex-grow justify-center">
                <MousePointer2 size={32} className="opacity-20" />
                <span className="text-sm">Hover to inspect</span>
              </div>
            )}
          </div>
        </div>

        {/* MAIN VIEWPORT */}
        <div className="flex-grow w-full bg-slate-900/30 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {mainMode === 'MATRIX' && viewMode === '2D' && (
            <div className="overflow-auto h-[700px] p-8 flex items-center justify-center">
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${matrixData[0]?.length || 1}, minmax(60px, 80px))` }}
              >
                {matrixData.map((row) => (
                  row.map((cell: any) => {
                    const isActive = currentCellData?.x === cell.x && currentCellData?.y === cell.y;
                    return (
                      <div
                        key={`${cell.x}-${cell.y}`}
                        className={`relative aspect-square rounded-lg border transition-all cursor-pointer ${
                          isActive ? 'border-white bg-slate-800 scale-110 shadow-lg z-20' : 'border-slate-800 bg-slate-900/40 hover:border-slate-600'
                        }`}
                        style={{ borderBottomWidth: 4, borderBottomColor: cell.color }}
                        onMouseEnter={() => handleCellEnter(cell)}
                        onMouseLeave={() => handleCellLeave(cell)}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                          {matrixMode === 'CHROMOSOMAL' ? (
                            <>
                              <span className={`text-[10px] uppercase font-bold ${isActive ? 'text-teal-300' : 'text-slate-600'}`}>CHR</span>
                              <span className={`text-xl font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>{cell.label}</span>
                            </>
                          ) : (
                            <>
                              <span className={`text-[9px] font-mono ${isActive ? 'text-teal-300' : 'text-slate-600'}`}>{cell.label}</span>
                              <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                {cell.frequency < 1000 ? cell.frequency.toFixed(0) : (cell.frequency / 1000).toFixed(1) + 'k'}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })
                ))}
              </div>
            </div>
          )}

          {mainMode === 'SCALE_EXPLORER' && (
            <div className="p-8 h-[700px] overflow-auto">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {selectedScale.name}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {selectedScale.intervals.map((cents, idx) => {
                    const freq = scaleRootFreq * Math.pow(2, cents / 1200);
                    return (
                      <button
                        key={idx}
                        onClick={() => playToneWithInstrument(freq, 1.0)}
                        className="bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg p-4 transition group"
                      >
                        <div className="text-xs text-slate-500 mb-1">Degree {idx + 1}</div>
                        <div className="text-2xl font-bold text-white group-hover:text-purple-400">{cents}</div>
                        <div className="text-[10px] text-slate-600">cents</div>
                        <div className="text-xs text-teal-400 mt-2">{freq.toFixed(1)} Hz</div>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-3 text-purple-300">Cultural Context</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong>Traditional Use:</strong> {selectedScale.traditionalUse}</p>
                    {selectedScale.emotionalCharacter && (
                      <p><strong>Emotional Character:</strong> {selectedScale.emotionalCharacter}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {mainMode === 'RHYTHM_LAB' && (
            <div className="p-8 h-[700px] overflow-auto">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  {selectedRhythm.name}
                </h2>

                {/* Visual Pattern */}
                <div className="bg-slate-800/50 p-6 rounded-xl mb-6">
                  <div className="flex gap-1 justify-center flex-wrap">
                    {selectedRhythm.pattern.map((hit, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-16 rounded ${
                          hit >= 2 ? 'bg-red-500' : hit >= 1 ? 'bg-orange-500' : 'bg-slate-700'
                        } transition-all`}
                        style={{ opacity: hit > 0 ? 1 : 0.3 }}
                      />
                    ))}
                  </div>
                  <div className="text-center text-xs text-slate-400 mt-3">
                    Red = Accent | Orange = Hit | Gray = Rest
                  </div>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-3 text-orange-300">Rhythm Details</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong>Region:</strong> {selectedRhythm.region}</p>
                    <p><strong>Subdivisions:</strong> {selectedRhythm.subdivisions}</p>
                    <p><strong>Traditional Use:</strong> {selectedRhythm.traditionalUse}</p>
                    {selectedRhythm.tempo && (
                      <p><strong>Traditional Tempo:</strong> {selectedRhythm.tempo.min}-{selectedRhythm.tempo.max} BPM</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {mainMode === 'COMPOSER' && (
            <div className="p-8 h-[700px] overflow-auto">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Composition Studio
                </h2>

                {recording && (
                  <div className="bg-red-900/20 border border-red-500 rounded-xl p-6 mb-6 animate-pulse">
                    <div className="flex items-center justify-center gap-3 text-red-400">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                      <span className="font-bold">RECORDING IN PROGRESS</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      Hover over the matrix to record notes
                    </div>
                  </div>
                )}

                <div className="bg-slate-800/50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-4 text-pink-300">Recorded Sequence</h3>
                  {recordedNotes.length === 0 ? (
                    <p className="text-slate-500 text-sm">No notes recorded yet. Enable recording and start playing!</p>
                  ) : (
                    <div className="max-h-96 overflow-auto space-y-2">
                      {recordedNotes.map((note, idx) => (
                        <div key={idx} className="bg-slate-700/50 p-3 rounded flex justify-between items-center text-xs">
                          <span className="font-mono text-teal-400">{note.frequency.toFixed(2)} Hz</span>
                          <span className="text-slate-400">{note.label}</span>
                          <span className="text-slate-500">{new Date(note.timestamp).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full max-w-[1600px] mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <div>
          Universal Music Production System © 2029 • Complete Human Musical Knowledge
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <span className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${audioEnabled ? 'bg-teal-500 animate-pulse' : 'bg-slate-700'}`}></div>
            {audioEnabled ? 'Active' : 'Standby'}
          </span>
        </div>
      </footer>
    </div>
  );
}
