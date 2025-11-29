import * as recorder from 'node-record-lpcm16'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { AudioRecordingOptions, AudioRecordingResult } from '../types/audio'

export class AudioRecorder {
    private recording: any = null
    private isRecording = false
    private outputPath: string | null = null
    private fileStream: fs.WriteStream | null = null

    constructor(private options: AudioRecordingOptions = {}) {
        this.options = {
            sampleRate: 16000,
            channels: 1,
            threshold: 0.5,
            device: null,
            audioType: 'wav',
            ...options,
        }
    }

    async startRecording(customFilename?: string): Promise<string> {
        if (this.isRecording) {
            throw new Error('Recording is already in progress')
        }

        const tempDir = os.tmpdir()
        const timestamp = Date.now()
        const filename = customFilename || `audio-recording-${timestamp}.wav`
        this.outputPath = path.join(tempDir, filename)

        console.log(`Starting audio recording...`)
        console.log(`Output: ${this.outputPath}`)

        return new Promise((resolve, reject) => {
            try {
                this.fileStream = fs.createWriteStream(this.outputPath!, { encoding: 'binary' })

                this.recording = recorder.record({
                    sampleRate: this.options.sampleRate,
                    channels: this.options.channels,
                    threshold: this.options.threshold,
                    thresholdStart: this.options.thresholdStart,
                    thresholdEnd: this.options.thresholdEnd,
                    silence: this.options.silence,
                    device: this.options.device,
                    recorder: 'sox', // Use sox for recording
                    audioType: this.options.audioType,
                })

                this.recording
                    .stream()
                    .on('error', (err: Error) => {
                        console.error('Recording error:', err)
                        this.isRecording = false
                        reject(err)
                    })
                    .pipe(this.fileStream!)

                this.fileStream!.on('finish', () => {
                    console.log('Recording stream finished')
                })

                this.isRecording = true
                resolve(this.outputPath!)
            } catch (err) {
                reject(err)
            }
        })
    }

    async stopRecording(): Promise<AudioRecordingResult> {
        if (!this.isRecording || !this.recording) {
            throw new Error('No recording in progress')
        }

        return new Promise((resolve, reject) => {
            try {
                this.recording.stop()
                this.isRecording = false

                setTimeout(() => {
                    if (this.outputPath && fs.existsSync(this.outputPath)) {
                        const stats = fs.statSync(this.outputPath)
                        const result: AudioRecordingResult = {
                            filename: path.basename(this.outputPath),
                            path: this.outputPath,
                            format: 'wav',
                            duration: this.calculateDuration(stats.size),
                        }
                        resolve(result)
                    } else {
                        reject(new Error('Recording file not found'))
                    }
                }, 500)
            } catch (err) {
                reject(err)
            }
        })
    }

    private calculateDuration(fileSize: number): number {
        const sampleRate = this.options.sampleRate || 16000
        const channels = this.options.channels || 1
        const bytesPerSample = 2
        const dataSize = fileSize - 44
        const samples = dataSize / (channels * bytesPerSample)
        return samples / sampleRate
    }

    getStatus(): { isRecording: boolean; outputPath: string | null } {
        return {
            isRecording: this.isRecording,
            outputPath: this.outputPath,
        }
    }

    cleanup(): void {
        if (this.outputPath && fs.existsSync(this.outputPath)) {
            fs.unlinkSync(this.outputPath)
            console.log(`Cleaned up temporary file: ${this.outputPath}`)
        }
    }
}

export async function recordAudio(
    durationSeconds: number,
    options?: AudioRecordingOptions
): Promise<AudioRecordingResult> {
    const recorder = new AudioRecorder(options)

    try {
        await recorder.startRecording()

        console.log(`Recording for ${durationSeconds} seconds...`)
        console.log('Press Ctrl+C to stop recording early')

        await new Promise(resolve => setTimeout(resolve, durationSeconds * 1000))

        const result = await recorder.stopRecording()
        console.log(`Recording completed: ${result.path}`)
        console.log(`Duration: ${result.duration?.toFixed(2)}s`)

        return result
    } catch (error) {
        console.error('Recording failed:', error)
        throw error
    }
}
