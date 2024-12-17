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
      return console.log('File does not exist');
    } else {
      exercise += data;
    }
  });

  fs.readFile(
    `${currentDirectory}/english/${exExPath}`,
    'utf8',
    (err, data) => {
      if (err) {
        return console.log('File does not exist');
      } else {
        executedExercise += data;
        createExercise(exercise, executedExercise);
      }
    }
  );
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
