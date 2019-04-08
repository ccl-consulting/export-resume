#!/usr/bin/env node

const path = require('path');
const {
  exportResume,
  SUPPORTED_OUTPUT_FORMATS,
} = require(__dirname + '/lib');

const DEFAULT_THEME = 'stackoverflow';

// TODO: Auto infer format from filename
// function inferFormatMiddleware(argv) {
//   if (!argv.format && argv.output) {
//     const ext = argv.output.split('.').pop().toLowerCase();
//     if (ext !== argv.output && SUPPORTED_OUTPUT_FORMATS.includes(ext)) {
//       argv.format = ext;
//     } else {
//       argv.format = 'pdf';
//     }
//   }
// }

function inferOutputMiddleware(argv) {
  if (!argv.output && argv.format) {
    argv.output = 'resume.' + argv.format;
  }
}

function resolveInputMiddleware(argv) {
  argv.resume = path.resolve(argv.resume);
}

const argv = require('yargs') // eslint-disable-line
.middleware(resolveInputMiddleware)
// .middleware(inferFormatMiddleware)
.middleware(inferOutputMiddleware)  
    .usage('$0 [output]', 'Export JSON Resume to human readable formats', (yargs) => {
      yargs
        .positional('output', {
          describe: 'path to output file',
        })
        .option('format', {
          alias: 'f',
          choices: SUPPORTED_OUTPUT_FORMATS,
          default: 'pdf',
          describe: 'output file format'
        })
        .option('theme', {
          alias: 't',
          default: DEFAULT_THEME,
          describe: 'JSON Resume theme name'
        })
    }, (argv) => {
      return exportResume(argv.resume, argv.output, argv.format, argv.theme);
    })
    .option('resume', {
      alias: 'r',
      default: './resume.json',
      describe: 'path to JSON Resume file'
    })
    .option('verbose', {
      alias: 'v',
      default: false
    })
    .argv
