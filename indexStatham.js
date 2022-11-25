const fs = require('fs');
const { execFileSync } = require('child_process');

const quotes = require("./quotes.json");

const getRandomElementFromArray = (arr = []) => arr[Math.floor(Math.random() * arr.length)];

const getRandomWolf = () => {
   const stathams = fs.readdirSync('./stathamImages');
   return './stathamImages/' + getRandomElementFromArray(stathams);
}

const getRandomQuote = (quotes, type = 'statham') => {
   return getRandomElementFromArray(quotes[type]);
}

execFileSync("node", ['./createText.js', `--text=${getRandomQuote(quotes, 'statham')}`], { 'stdio': 'inherit' });
execFileSync("node", ['./createImage.js', `--image=${getRandomWolf()}`], { 'stdio': 'inherit' });