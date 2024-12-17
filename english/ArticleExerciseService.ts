import * as fs from 'node:fs';
import * as path from 'node:path';

class ArticleExerciseService {
  /**
   * Для извлечения текста, который находится между УПРАЖНЕНИЕ <number>
   */
  private regEx = /УПРАЖНЕНИЕ\s+\d+([\s\S]*?)(?=УПРАЖНЕНИЕ\s+\d+|$)/g;

  getAllExercisesFromPseudoDB(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (err, data) => {
        if (err) return reject(`Файла с путем ${path} не существует!`);
        else resolve(data);
      });
    });
  }

  // todo type Error. Not compiled by TS
  // splitToArrayOfExercises(text: string): string[] {
  //   return text.match(this.regEx);
  // }

  createExercise(exercise: string, executedExercise: string): string {
    const placeholder = '…';

    // Разделить тексты на массивы слов
    const words = exercise.replace(/\n/g, ' ').split(/\s+/);
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

  createExerciseFile(filename: string, text: string): void {
    // Указываем полный путь к файлу
    const filePath = path.join(__dirname, filename);

    // Используем fs.writeFile для записи текста
    fs.writeFile(filePath, text, (err) => {
      if (err) {
        console.error('Ошибка при записи файла:', err);
        return;
      }
      console.log(`Файл "${filename}" успешно создан!`);
    });
  }
}
export const articleExerciseService = new ArticleExerciseService();
