const fs = require('fs').promises;
const path = require('path');

// выделем путь к стилям
const stylesDir = path.join(__dirname, 'styles');
// выделяем путь к файлу к стилям в папке project-dist
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
// создаем массив для стилей, проверяем, что это файл и имеет расширение стилей и добавалем его содержимое в массив со стилями
fs.readdir(stylesDir)
  .then((stylesFiles) => {
  
    const stylesArray = [];

    const filePromises = stylesFiles.map((file) => {
      
      const filePath = path.join(stylesDir, file);
      return fs.stat(filePath)
        .then((stat) => {
          if (stat.isFile() && path.extname(file) === '.css') {
            return fs.readFile(filePath, 'utf8')
              .then((data) => {
                stylesArray.push(data);
              });
          }
        });
    });

    return Promise.all(filePromises)
      .then(() => {
        // записываем все стили в выходной файл bundle.css
        return fs.writeFile(bundleFilePath, stylesArray.join('\n'));
      });
  })
  .catch((err) => {
    console.error(err);
  });
