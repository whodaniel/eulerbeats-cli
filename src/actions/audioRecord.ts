import { AudioRecorder } from '../utils/audioRecorder'
import { AudioTranscoder } from '../utils/audioTranscoder'
import * as readline from 'readline'
import * as path from 'path'

interface RecordOptions {
    duration?: number
    output?: string
    format?: 'mp3' | 'wav' | 'ogg' | 'flac' | 'm4a'
    sampleRate?: number
    channels?: number
    transcode?: boolean
    keepOriginal?: boolean
}

export async function recordAudioAction(options: RecordOptions): Promise<void> {
    const {
        duration,
        output,
        format = 'wav',
        sampleRate = 16000,
        channels = 1,
        transcode = false,
        keepOriginal = false,
    } = options

    const recorder = new AudioRecorder({
        sampleRate,
        channels,
    })

    try {
        console.log('\n🎙️  Audio Recording Utility\n')
        console.log('Configuration:')
        console.log(`  Sample Rate: ${sampleRate} Hz`)
        console.log(`  Channels: ${channels}`)
        console.log(`  Output Format: ${format}`)
        console.log('')

        let recordingPath: string

        if (duration) {
            console.log(`Recording for ${duration} seconds...\n`)
            recordingPath = await recorder.startRecording()
            await new Promise(resolve => setTimeout(resolve, duration * 1000))
        } else {
            console.log('Press ENTER to start recording...')
            await waitForEnter()

            console.log('\nRecording started...')
            console.log('Press ENTER again to stop recording\n')
            recordingPath = await recorder.startRecording()

            await waitForEnter()
        }

        const result = await recorder.stopRecording()
        console.log('\n✅ Recording completed!')
        console.log(`   File: ${result.path}`)
        console.log(`   Duration: ${result.duration?.toFixed(2)}s`)
        console.log(`   Format: ${result.format}`)

        if (transcode && format !== 'wav') {
            console.log(`\n🔄 Transcoding to ${format}...`)
            const transcoder = new AudioTranscoder()

            const outputPath =
                output ||
                path.join(
                    path.dirname(result.path),
                    `${path.basename(result.path, '.wav')}.${format}`
                )

            const transcodeResult = await transcoder.transcode({
                inputPath: result.path,
                outputPath,
                outputFormat: format,
            })

            if (transcodeResult.success) {
                console.log('✅ Transcoding completed!')
                console.log(`   Output: ${transcodeResult.outputPath}`)
                console.log(`   Size: ${(transcodeResult.size! / 1024).toFixed(2)} KB`)

                if (!keepOriginal) {
                    recorder.cleanup()
                    console.log('\n🗑️  Original WAV file removed')
                }
            } else {
                console.error('❌ Transcoding failed:', transcodeResult.error)
            }
        } else if (output) {
            const fs = require('fs')
            fs.copyFileSync(result.path, output)
            console.log(`\n📁 File saved to: ${output}`)
            recorder.cleanup()
        }

        console.log('\n✨ Done!\n')
    } catch (error) {
        console.error('\n❌ Recording failed:', error)
        recorder.cleanup()
        process.exit(1)
    }
}

async function waitForEnter(): Promise<void> {
    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })

        rl.question('', () => {
            rl.close()
            resolve()
        })
    })
}

export async function transcodeAudioAction(
    inputFile: string,
    options: {
        output?: string
        format: 'mp3' | 'wav' | 'ogg' | 'flac' | 'm4a'
        bitrate?: string
        sampleRate?: number
        channels?: number
    }
): Promise<void> {
    const { output, format, bitrate, sampleRate, channels } = options

    const transcoder = new AudioTranscoder()

    try {
        console.log('\n🔄 Audio Transcoding Utility\n')
        console.log(`Input: ${inputFile}`)
        console.log(`Output Format: ${format}`)
        console.log('')

        const outputPath =
            output || path.join(path.dirname(inputFile), `${path.basename(inputFile, path.extname(inputFile))}.${format}`)

        const result = await transcoder.transcode({
            inputPath: inputFile,
            outputPath,
            outputFormat: format,
            bitrate,
            sampleRate,
            channels,
        })

        if (result.success) {
            console.log('\n✅ Transcoding completed!')
            console.log(`   Output: ${result.outputPath}`)
            console.log(`   Size: ${(result.size! / 1024).toFixed(2)} KB`)
        } else {
            console.error('\n❌ Transcoding failed:', result.error)
            process.exit(1)
        }

        console.log('\n✨ Done!\n')
    } catch (error) {
        console.error('\n❌ Error:', error)
        process.exit(1)
    }
}
