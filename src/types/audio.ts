export interface AudioRecordingOptions {
    sampleRate?: number
    channels?: number
    threshold?: number
    thresholdStart?: number
    thresholdEnd?: number
    silence?: string
    device?: string | null
    audioType?: string
}

export interface AudioRecordingResult {
    filename: string
    path: string
    duration?: number
    format: string
}

export interface TranscodeOptions {
    inputPath: string
    outputPath: string
    outputFormat: 'mp3' | 'wav' | 'ogg' | 'flac' | 'm4a'
    bitrate?: string
    sampleRate?: number
    channels?: number
}

export interface TranscodeResult {
    success: boolean
    outputPath: string
    size?: number
    error?: string
}
