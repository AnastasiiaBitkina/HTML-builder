const fs = require('fs');
const path = require('path');

async function copyDir() {
  const srcPath = path.join(__dirname, 'files');
  const destPath = path.join(__dirname, 'files-copy');

  try {
    //  создаем новую папку 
    await fs.promises.mkdir(destPath, { recursive: true });

    // получаем список файлов
    const files = await fs.promises.readdir(srcPath, { withFileTypes: true });

    // копируем каждый файл в новую папку 
    await Promise.all(files.map(async (file) => {
      const srcFilePath = path.join(srcPath, file.name);
      const destFilePath = path.join(destPath, file.name);
      if (file.isFile()) {
        await fs.promises.copyFile(srcFilePath, destFilePath);
      } else if (file.isDirectory()) {
        await copyDirRecursive(srcFilePath, destFilePath);
      }
    }));

    console.log('Директория скопирована!');
  } catch (err) {
    console.error('Ошибка при копировании директории', err);
  }
}

async function copyDirRecursive(srcPath, destPath) {
  
  await fs.promises.mkdir(destPath, { recursive: true });


  const files = await fs.promises.readdir(srcPath, { withFileTypes: true });

  // копируем каждый файл в новую папку 
  await Promise.all(files.map(async (file) => {
    const srcFilePath = path.join(srcPath, file.name);
    const destFilePath = path.join(destPath, file.name);
    if (file.isFile()) {
      await fs.promises.copyFile(srcFilePath, destFilePath);
    } else if (file.isDirectory()) {
      await copyDirRecursive(srcFilePath, destFilePath);
    }
  }));
}

copyDir();
