const fs = require("fs");
const { execFileSync } = require("child_process");

const quotes = require("./quotes.json");

const getRandomElementFromArray = (arr = []) =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomBackground = (imgPath) => {
  const images = fs.readdirSync(imgPath);
  return imgPath + "/" + getRandomElementFromArray(images);
};

const getRandomQuote = (quotes, type = "statham") => {
  return getRandomElementFromArray(quotes[type]);
};

function createWolf() {
  execFileSync(
    "node",
    ["./createText.js", `--text=${getRandomQuote(quotes, "wolf")}`],
    { stdio: "inherit" }
  );
  execFileSync(
    "node",
    ["./createImage.js", `--image=${getRandomBackground("./wolfImages")}`, '--type=wolf'],
    { stdio: "inherit" }
  );

}

function createStatham() {
  execFileSync(
    "node",
    ["./createText.js", `--text=${getRandomQuote(quotes, "statham")}`],
    { stdio: "inherit" }
  );
  execFileSync(
    "node",
    ["./createImage.js", `--image=${getRandomBackground("./stathamImages")}`, '--type=statham'],
    { stdio: "inherit" }
  );
}

const typeArg = process.argv.find((string) => string.includes("--type"));

if (!typeArg) {
  throw new Error("Отсутствует --type аргумент!");
}

const [_, typeValue] = typeArg.split("=");

if(typeValue === 'wolf') {
  createWolf()
} else if(typeValue === 'statham') {
  createStatham()
}
