const fs = require('fs');
const path = require('path');
// выделем путь к стилям
const stylesDir = path.join(__dirname, 'styles');
// выделяем путь к файлу к стилям в папке project-dist
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesFiles = fs.readdirSync(stylesDir);
// создаем массив для стилей
const stylesArray = [];
// проверяем, что это файл и имеет расширение стилей и добавалем его содержимое в массив со стилями
stylesFiles.forEach(file => {
  if (fs.statSync(path.join(stylesDir, file)).isFile() && path.extname(file) === '.css') {
    stylesArray.push(fs.readFileSync(path.join(stylesDir, file), 'utf8'));
  }
});
// записываем стили в файл
fs.writeFileSync(bundleFilePath, stylesArray.join('\n'));
