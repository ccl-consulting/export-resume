#!/usr/bin/env node
const path = require('path');
const { exportResume } = require(__dirname + '/lib');

// TODO: Auto infer format from filename
// function inferFormatMiddleware(argv) {
//   if (!argv.format && argv.output) {
//     const ext = argv.output.split('.').pop().toLowerCase();
//     if (ext !== argv.output) {
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
          choices: ['pdf', 'md', 'txt', 'html'],
          default: 'pdf',
          describe: 'output file format'
        })
        .option('theme', {
          alias: 't',
          default: 'flat',
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
