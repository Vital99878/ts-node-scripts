import * as fs from 'fs';
import * as path from 'path';

function createReactComponent() {
  const [component, hasComponents] = process.argv.slice(2);

  const templatePath = path.join(__dirname, '../text-templates/FC.tsx'); // замените 'source.txt' на ваш файл

  // Укажите путь к директории, где будет создан новый файл
  const componentDirectoryPath = path.join(__dirname, `${component}`);

  // const emptyDirectories = ['utils', 'hooks', 'const', 'types'];

  const tsxFilePath = path.join(componentDirectoryPath, `${component}.tsx`);
  const scssFilePath = path.join(
    componentDirectoryPath,
    `${component}.module.scss`
  );
  const indexFilePath = path.join(componentDirectoryPath, `index.ts`);

  // Создание папки, если она не существует
  if (!fs.existsSync(componentDirectoryPath)) {
    fs.mkdirSync(componentDirectoryPath, { recursive: true });
  }

  // Чтение содержимого из исходного файла
  fs.readFile(templatePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return;
    }

    data = data.replace(new RegExp('Component', 'g'), component);

    // Запись содержимого в новый файл
    fs.writeFile(tsxFilePath, data, (err) => {
      if (err) {
        console.error('Ошибка записи файла:', err);
        return;
      }

      console.log('Файл успешно создан и наполнен содержимым!');
    });
  });

  fs.writeFile(scssFilePath, '.wrapper', (err) => {
    if (err) {
      console.error(`Ошибка записи в файл ${component}.module.scss:`, err);
      return;
    }

    console.log('Файл стилей успешно создан');
  });

  fs.writeFile(
    indexFilePath,
    `export { default } from './${component}';`,
    (err) => {
      if (err) {
        console.error(`Ошибка записи в файл index.ts`, err);
        return;
      }

      console.log('Файл index.ts успешно создан');
    }
  );

  if (hasComponents) {
    const directoryPath = path.join(__dirname, `${component}/components`);

    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        return console.error('Ошибка при создании папки:', err);
      }
      console.log('Папка успешно components создана:', directoryPath);
    });
  }
}

createReactComponent();
