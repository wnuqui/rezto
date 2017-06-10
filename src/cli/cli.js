#!/usr/bin/env node

import program from 'commander'
import onFind from './onFind'
import { version } from '../../package.json'

program
  .version(`rezto version ${version}`)
  .usage('find [options]')
  .description('List restaurants (found in some of CBD in Philippines) via CLI. \n  Results are from TripAdvisor.')

  .option('-p, --place <place>',                'place')
  .option('-t, --type <type>',                  'type')
  .option('-s, --sort-by <sort_by>',            'sort results (valid values are: name, rank)')
  .option('-b, --batch-number <batch_number>',  'batch number of restaurants')

  .command('find')
  .action(onFind)

program.parse(process.argv)

if (!program.args.length) program.help()
