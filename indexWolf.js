const fs = require('fs');
const { execFileSync } = require('child_process');

const quotes = require("./quotes.json");

const getRandomElementFromArray = (arr = []) => arr[Math.floor(Math.random() * arr.length)];

const getRandomWolf = () => {
   const wolves = fs.readdirSync('./wolfImages');
   return './wolfImages/' + getRandomElementFromArray(wolves);
}

const getRandomQuote = (quotes, type = 'wolf') => {
   return getRandomElementFromArray(quotes[type]);
}

execFileSync("node", ['./createText.js', `--text=${getRandomQuote(quotes, 'wolf')}`], { 'stdio': 'inherit' });
execFileSync("node", ['./createImage.js', `--image=${getRandomWolf()}`], { 'stdio': 'inherit' });