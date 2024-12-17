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

  console.log('exercise: ', exercises?.length);
  console.log('exercisesExecuted: ', exercisesExecuted?.length);
  // exercises?.length && exercises.forEach((e) => console.log('e: ', e));

  // const exercisesForDb =
  // console.log('exerciseRaw: ', exerciseRaw);
  // console.log('exerciseExecutedRaw: ', exerciseExecutedRaw);
}

function createExercise(executed: string, executedExercise: string): string {
  const placeholder = '…';

  // Разделить тексты на массивы слов
  const words = executed.replace(/\n/g, ' ').split(/\s+/);
  const wordsExecuted = executedExercise.replace(/\n/g, ' ').split(/\s+/);

  words.forEach((w, index) => {
    const condition =
      w === placeholder && wordsExecuted[index + 1] !== words[index + 1];
    if (condition) {
      wordsExecuted.splice(index, 0, '[ ]');
    }
  });

  let index = 0;
  const resultWords = wordsExecuted.map((word) => {
    // Если слово в Тексте 1 является "…" (или это пробел после "…"), выделяем "похожее" из Текста 2
    if (words[index] === placeholder) {
      index++;
      return word !== '[ ]' ? `[${word}]` : '[ ]';
    }
    // Иначе проверяем текущее слово и продолжаем дальше
    index++;
    return word;
  });

  // Соединяем обработанный текст
  return resultWords.join(' ');
}

createOmissionExercise();
