const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    input = line.split('');
    const a = parseInt(input[0]);
    const b = parseInt(input[1]);
    console.log(a+b);
})
.on('close', function () {
    console.log(input[0] + input[1]);
    process.exit();
});