#!/usr/bin/env node
import { Command, Option } from 'commander'
import * as dotenv from 'dotenv'
import {
    blockOption,
    parseEthAddressOption,
    parsePositiveIntOption,
    releaseOption,
    rpcProviderOption,
} from './utils'
import {
    originalOwnershipHistory,
    listPrintHolders,
    royaltiesAction,
    snapshotHolders,
    recordAudioAction,
    transcodeAudioAction,
} from './actions'

dotenv.config()

const program = new Command()
    program.description('Welcome to the EulerBeats CLI!')

function addOriginalsCommand() {
    const originalsCommand = program
        .command('originals')
        .description('Commands related to EulerBeats originals')

    originalsCommand
        .command('history')
        .description('Returns historical ownership data (provenance) for all originals')
        .addOption(rpcProviderOption())
        .addOption(blockOption())
        .addOption(releaseOption())
        .action(originalOwnershipHistory)

    originalsCommand
        .command('royalties')
        .description(
            'Queries the royalties received for a particular release.  This command has many options to filter the royalties.'
        )
        .addOption(rpcProviderOption())
        .addOption(blockOption())
        .addOption(releaseOption())
        .addOption(
            new Option('--address <address>', 'Address to filter by.').argParser(
                parseEthAddressOption
            )
        )
        .addOption(
            new Option(
                '-o, --output <format>',
                'The format of the output, either table (default) or csv.'
            )
                .choices(['table', 'csv'])
                .default('table')
        )
        .action(royaltiesAction)
}

function addPrintsCommand() {
    const printsCommand = program
        .command('prints')
        .description('Commands related to EulerBeats prints')

    printsCommand
        .command('holders <track-number>')
        .description(
            'Returns all print holders for the given track number.  Track number must be valid for the given release.'
        )
        .addOption(rpcProviderOption())
        .addOption(blockOption())
        .addOption(releaseOption())
        .addOption(new Option('--no-stakers', 'Exclude stakers'))
        .addOption(
            new Option(
                '-o, --output <format>',
                'The format of the output, either table (default) or csv.'
            )
                .choices(['table', 'csv'])
                .default('table')
        )
        .action(listPrintHolders)
}


function addSnapshotCommand() {
    const printsCommand = program
        .command('snapshot')
        .description('Takes a snapshot of all holders for all tokens')
        .addOption(rpcProviderOption())
        .addOption(blockOption())
        .addOption(
            new Option(
                '-o, --output <format>',
                'The format of the output, either table (default) or csv.'
            )
                .choices(['table', 'csv'])
                .default('table')
        )
        .action(snapshotHolders)
}

function addAudioCommands() {
    const audioCommand = program
        .command('audio')
        .description('Audio recording and transcoding utilities')

    audioCommand
        .command('record')
        .description('Record audio from your microphone')
        .option('-d, --duration <seconds>', 'Recording duration in seconds', parseFloat)
        .option('-o, --output <path>', 'Output file path')
        .option(
            '-f, --format <format>',
            'Output format (mp3, wav, ogg, flac, m4a)',
            'wav'
        )
        .option('-s, --sample-rate <rate>', 'Sample rate in Hz', parseInt, 16000)
        .option('-c, --channels <count>', 'Number of channels', parseInt, 1)
        .option('-t, --transcode', 'Transcode to specified format', false)
        .option('-k, --keep-original', 'Keep original WAV file after transcoding', false)
        .action(recordAudioAction)

    audioCommand
        .command('transcode <input>')
        .description('Transcode audio file to different format')
        .requiredOption(
            '-f, --format <format>',
            'Output format (mp3, wav, ogg, flac, m4a)'
        )
        .option('-o, --output <path>', 'Output file path')
        .option('-b, --bitrate <rate>', 'Audio bitrate (e.g., 192k, 320k)')
        .option('-s, --sample-rate <rate>', 'Sample rate in Hz', parseInt)
        .option('-c, --channels <count>', 'Number of channels', parseInt)
        .action(transcodeAudioAction)
}


async function main() {
    addOriginalsCommand()
    addPrintsCommand()
    addSnapshotCommand()
    addAudioCommands()

    await program.parseAsync()
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
