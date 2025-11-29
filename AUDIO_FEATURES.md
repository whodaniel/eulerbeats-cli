# Audio Recording and Transcoding Features

The eulerbeats-cli now includes powerful audio recording and transcoding capabilities, allowing you to capture and convert audio directly from the command line.

## Features

- 🎙️ **Audio Recording**: Record audio from your microphone with configurable settings
- 🔄 **Audio Transcoding**: Convert audio files between different formats
- 📁 **Temporary Storage**: Automatically manages temporary files during recording
- ⚙️ **Customizable Settings**: Control sample rate, channels, bitrate, and more

## Prerequisites

Before using the audio features, ensure you have the following installed on your system:

### macOS
```bash
brew install sox ffmpeg
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get install sox ffmpeg libsox-fmt-all
```

### Linux (Fedora/RHEL)
```bash
sudo dnf install sox ffmpeg
```

## Installation

Install the dependencies:

```bash
npm install
# or
yarn install
```

Build the project:

```bash
npm run build
# or
yarn build
```

## Usage

### Recording Audio

#### Basic Recording (Interactive)
```bash
eb-cli audio record
```
This starts an interactive recording session where you press ENTER to start and stop recording.

#### Timed Recording
```bash
eb-cli audio record --duration 10
```
Records audio for 10 seconds.

#### Recording with Custom Settings
```bash
eb-cli audio record \
  --duration 30 \
  --output recording.wav \
  --sample-rate 44100 \
  --channels 2
```

#### Record and Transcode
```bash
eb-cli audio record \
  --duration 15 \
  --format mp3 \
  --transcode \
  --output output.mp3
```

### Recording Options

| Option | Description | Default |
|--------|-------------|---------|
| `-d, --duration <seconds>` | Recording duration in seconds | Interactive |
| `-o, --output <path>` | Output file path | Temp directory |
| `-f, --format <format>` | Output format (mp3, wav, ogg, flac, m4a) | wav |
| `-s, --sample-rate <rate>` | Sample rate in Hz | 16000 |
| `-c, --channels <count>` | Number of channels (1=mono, 2=stereo) | 1 |
| `-t, --transcode` | Transcode to specified format | false |
| `-k, --keep-original` | Keep original WAV file after transcoding | false |

### Transcoding Audio

Convert audio files between different formats:

#### Basic Transcoding
```bash
eb-cli audio transcode input.wav --format mp3
```

#### Transcoding with Custom Settings
```bash
eb-cli audio transcode input.wav \
  --format mp3 \
  --output output.mp3 \
  --bitrate 320k \
  --sample-rate 44100 \
  --channels 2
```

### Transcoding Options

| Option | Description | Required |
|--------|-------------|----------|
| `<input>` | Input file path | Yes |
| `-f, --format <format>` | Output format (mp3, wav, ogg, flac, m4a) | Yes |
| `-o, --output <path>` | Output file path | No |
| `-b, --bitrate <rate>` | Audio bitrate (e.g., 192k, 320k) | No |
| `-s, --sample-rate <rate>` | Sample rate in Hz | No |
| `-c, --channels <count>` | Number of channels | No |

## Supported Formats

- **WAV** - Uncompressed audio (highest quality)
- **MP3** - Compressed audio (good balance of quality and size)
- **OGG** - Open-source compressed format
- **FLAC** - Lossless compression
- **M4A** - AAC audio format

## Examples

### Example 1: Quick Voice Recording
```bash
# Record a quick voice memo
eb-cli audio record --duration 30 --output memo.wav
```

### Example 2: High-Quality Music Recording
```bash
# Record music with high quality settings
eb-cli audio record \
  --duration 120 \
  --sample-rate 44100 \
  --channels 2 \
  --format flac \
  --transcode \
  --output music.flac
```

### Example 3: Convert Audio for Web
```bash
# Convert a WAV file to web-friendly MP3
eb-cli audio transcode recording.wav \
  --format mp3 \
  --bitrate 192k \
  --output web-audio.mp3
```

### Example 4: Batch Recording to MP3
```bash
# Record and automatically convert to MP3
eb-cli audio record \
  --duration 60 \
  --format mp3 \
  --transcode \
  --output podcast.mp3
```

## Temporary Files

The audio recording system uses temporary files to store recordings before transcoding:

- **Location**: System temp directory (`/tmp` on Linux/macOS, `%TEMP%` on Windows)
- **Format**: WAV (uncompressed)
- **Naming**: `audio-recording-{timestamp}.wav`
- **Cleanup**: Automatically removed after successful transcoding (unless `--keep-original` is used)

## Programmatic Usage

You can also use the audio utilities programmatically in your TypeScript/JavaScript code:

```typescript
import { AudioRecorder } from './utils/audioRecorder'
import { AudioTranscoder } from './utils/audioTranscoder'

// Recording
const recorder = new AudioRecorder({
    sampleRate: 16000,
    channels: 1,
})

await recorder.startRecording()
// ... wait for recording ...
const result = await recorder.stopRecording()
console.log(result.path)

// Transcoding
const transcoder = new AudioTranscoder()
const transcodeResult = await transcoder.transcode({
    inputPath: 'input.wav',
    outputPath: 'output.mp3',
    outputFormat: 'mp3',
    bitrate: '192k',
})
```

## Troubleshooting

### "sox: command not found"
Install SoX using your package manager (see Prerequisites section).

### "ffmpeg: command not found"
Install FFmpeg using your package manager (see Prerequisites section).

### Recording has no sound
- Check your microphone permissions
- Verify your default audio input device is set correctly
- Try increasing the recording threshold

### Permission denied on microphone
Grant microphone access to your terminal application in system preferences.

## Technical Details

### Architecture

1. **AudioRecorder**: Uses `node-record-lpcm16` library with SoX backend to capture audio
2. **AudioTranscoder**: Uses `fluent-ffmpeg` wrapper around FFmpeg for format conversion
3. **Temporary Storage**: Leverages OS temp directory for intermediate files
4. **Cleanup**: Automatic cleanup of temporary files after processing

### Recording Flow

```
Microphone → SoX → WAV Buffer → Temp File → [Optional: FFmpeg] → Output File
```

### Transcoding Flow

```
Input File → FFmpeg → Format Conversion → Output File
```

## Future Enhancements

Potential features for future releases:

- Real-time waveform visualization
- Audio normalization and filters
- Silence detection and auto-trimming
- Multiple format output in single command
- Streaming audio processing
- Web interface integration

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

Apache-2.0
