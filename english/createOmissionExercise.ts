#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';
import { articleExerciseService } from './ArticleExerciseService';

async function createOmissionExercise() {
  const currentDirectory = process.cwd();
  const [exPath, exExPath] = process.argv.slice(2);

  let exerciseRaw = '';
  let exerciseExecutedRaw = '';

  try {
    exerciseRaw = await articleExerciseService.getAllExercisesFromPseudoDB(
      'C:\\Users\\Office\\OneDrive\\Рабочий стол\\node-ts Scripts\\english\\db\\article-exercises.txt'
    );
    exerciseExecutedRaw =
      await articleExerciseService.getAllExercisesFromPseudoDB(
        'C:\\Users\\Office\\OneDrive\\Рабочий стол\\node-ts Scripts\\english\\db\\article-exercises-executed.txt'
      );
  } catch (e) {
    return console.error(e);
  }

  let exercises = articleExerciseService.splitToArrayOfExercises(exerciseRaw);
  let exercisesExecuted =
    articleExerciseService.splitToArrayOfExercises(exerciseExecutedRaw);

  const exercisesForDB: string[] = [];
  exercises.forEach((e, index) =>
    exercisesForDB.push(
      articleExerciseService.createExercise(e, exercisesExecuted[index])
    )
  );

  console.log('exercisesForDB: ', exercisesForDB);
  // console.log('exercisesExecuted: ', exercisesExecuted);
}

function createExercise(executed: string, executedExercise: string): string {
  const placeholder = '…';

  // Разделить тексты на массивы слов
  const words = executed.replace(/\n/g, ' ').split(/\s+/);
}

createOmissionExercise();
