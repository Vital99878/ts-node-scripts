#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';

function createOmissionExercise() {
  const currentDirectory = process.cwd();
  const [exPath, exExPath] = process.argv.slice(2);

  let exercise = '';
  let executedExercise = '';

  fs.readFile(`${currentDirectory}/english/${exPath}`, 'utf8', (err, data) => {
    if (err) {
      console.log('File does not exist');
    } else {
      exercise += data;
    }
  });

  fs.readFile(
    `${currentDirectory}/english/${exExPath}`,
    'utf8',
    (err, data) => {
      if (err) {
        console.log('File does not exist');
      } else {
        executedExercise += data;
      }

      // todo создать Упражение здесь
      // console.log('exercise: ', exercise);
      // console.log('executedExercise: ', executedExercise);
    }
  );
}

createOmissionExercise();
