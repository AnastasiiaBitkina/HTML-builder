const fs = require('fs');
const readline = require('readline');

// поток
const fileStream = fs.createWriteStream('output.txt');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


console.log('Введите текст. Для завершения введите "exit" или нажмите "ctrl + c".');


function processInput(input) {
  
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Пока!');
    process.exit();
  } else {
  
    fileStream.write(input + '\n');
  }
}

// ввод
rl.on('line', (input) => {
  processInput(input);
});

// завершение
process.on('SIGINT', () => {
  console.log('Завершение работы программы.');
  process.exit();
});
