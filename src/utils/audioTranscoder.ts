import ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { TranscodeOptions, TranscodeResult } from '../types/audio'

export class AudioTranscoder {
    async transcode(options: TranscodeOptions): Promise<TranscodeResult> {
        const { inputPath, outputPath, outputFormat, bitrate, sampleRate, channels } = options

        if (!fs.existsSync(inputPath)) {
            return {
                success: false,
                outputPath: '',
                error: `Input file not found: ${inputPath}`,
            }
        }

        console.log(`Transcoding ${inputPath} to ${outputFormat}...`)

        return new Promise((resolve, reject) => {
            let command = ffmpeg(inputPath)

            if (bitrate) {
                command = command.audioBitrate(bitrate)
            }

            if (sampleRate) {
                command = command.audioFrequency(sampleRate)
            }

            if (channels) {
                command = command.audioChannels(channels)
            }

            command
                .toFormat(outputFormat)
                .on('start', commandLine => {
                    console.log('FFmpeg command:', commandLine)
                })
                .on('progress', progress => {
                    if (progress.percent) {
                        console.log(`Processing: ${Math.round(progress.percent)}% done`)
                    }
                })
                .on('end', () => {
                    console.log('Transcoding completed successfully')
                    const stats = fs.statSync(outputPath)
                    resolve({
                        success: true,
                        outputPath,
                        size: stats.size,
                    })
                })
                .on('error', (err, stdout, stderr) => {
                    console.error('Transcoding error:', err.message)
                    if (stderr) {
                        console.error('FFmpeg stderr:', stderr)
                    }
                    resolve({
                        success: false,
                        outputPath: '',
                        error: err.message,
                    })
                })
                .save(outputPath)
        })
    }

    async transcodeToFormat(
        inputPath: string,
        outputFormat: 'mp3' | 'wav' | 'ogg' | 'flac' | 'm4a',
        outputDir?: string
    ): Promise<TranscodeResult> {
        const dir = outputDir || os.tmpdir()
        const baseName = path.basename(inputPath, path.extname(inputPath))
        const outputPath = path.join(dir, `${baseName}.${outputFormat}`)

        const options: TranscodeOptions = {
            inputPath,
            outputPath,
            outputFormat,
        }

        if (outputFormat === 'mp3') {
            options.bitrate = '192k'
        } else if (outputFormat === 'ogg') {
            options.bitrate = '128k'
        }

        return this.transcode(options)
    }

    async getAudioInfo(filePath: string): Promise<any> {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(filePath, (err, metadata) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(metadata)
                }
            })
        })
    }

    async extractAudioSegment(
        inputPath: string,
        outputPath: string,
        startTime: number,
        duration: number
    ): Promise<TranscodeResult> {
        console.log(
            `Extracting segment from ${inputPath}: start=${startTime}s, duration=${duration}s`
        )

        return new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .setStartTime(startTime)
                .setDuration(duration)
                .on('end', () => {
                    console.log('Segment extraction completed')
                    const stats = fs.statSync(outputPath)
                    resolve({
                        success: true,
                        outputPath,
                        size: stats.size,
                    })
                })
                .on('error', err => {
                    console.error('Extraction error:', err.message)
                    resolve({
                        success: false,
                        outputPath: '',
                        error: err.message,
                    })
                })
                .save(outputPath)
        })
    }

    async normalize(inputPath: string, outputPath: string): Promise<TranscodeResult> {
        console.log(`Normalizing audio: ${inputPath}`)

        return new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .audioFilters('loudnorm')
                .on('end', () => {
                    console.log('Normalization completed')
                    const stats = fs.statSync(outputPath)
                    resolve({
                        success: true,
                        outputPath,
                        size: stats.size,
                    })
                })
                .on('error', err => {
                    console.error('Normalization error:', err.message)
                    resolve({
                        success: false,
                        outputPath: '',
                        error: err.message,
                    })
                })
                .save(outputPath)
        })
    }

    cleanup(filePath: string): void {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
            console.log(`Cleaned up file: ${filePath}`)
        }
    }
}

export async function transcodeAudio(
    inputPath: string,
    outputFormat: 'mp3' | 'wav' | 'ogg' | 'flac' | 'm4a',
    outputPath?: string
): Promise<TranscodeResult> {
    const transcoder = new AudioTranscoder()

    if (outputPath) {
        return transcoder.transcode({
            inputPath,
            outputPath,
            outputFormat,
        })
    } else {
        return transcoder.transcodeToFormat(inputPath, outputFormat)
    }
}
