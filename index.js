const fs = require("fs");
const { execFileSync } = require("child_process");
const createStorie = require("./createStorie");
const quotes = require("./quotes.json");

const getRandomElementFromArray = (arr = []) =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomBackground = (imgPath) => {
  const images = fs.readdirSync(imgPath);
  return imgPath + "/" + getRandomElementFromArray(images);
};

const getRandomQuote = (quotes, type = "statham") => {
  const quotesFile = JSON.parse(fs.readFileSync("./quotes.json"));
  let randomQuote = getRandomElementFromArray(quotes[type]);
  if (type === "wolf") {
    while (quotesFile.usedQuotesWolf.includes(randomQuote)) {
      randomQuote = getRandomElementFromArray(quotes[type]);
    }
  }
  if (type === "statham") {
    while (quotesFile.usedQuotesStatham.includes(randomQuote)) {
      randomQuote = getRandomElementFromArray(quotes[type]);
    }
  }

  return randomQuote;
};

function createWolf() {
  execFileSync(
    "node",
    [
      "./createText.js",
      `--text=${getRandomQuote(quotes, "wolf")}`,
      "--type=wolf",
    ],
    { stdio: "inherit" }
  );
  execFileSync(
    "node",
    [
      "./createImage.js",
      `--image=${getRandomBackground("./wolfImages")}`,
      "--type=wolf",
    ],
    { stdio: "inherit" }
  );
}

function createStatham() {
  execFileSync(
    "node",
    [
      "./createText.js",
      `--text=${getRandomQuote(quotes, "statham")}`,
      "--type=statham",
    ],
    { stdio: "inherit" }
  );
  execFileSync(
    "node",
    [
      "./createImage.js",
      `--image=${getRandomBackground("./stathamImages")}`,
      "--type=statham",
    ],
    { stdio: "inherit" }
  );
}

const typeArg = process.argv.find((string) => string.includes("--type"));

if (!typeArg) {
  throw new Error("Отсутствует --type аргумент!");
}

const [_, typeValue] = typeArg.split("=");

(async () => {
  if (typeValue === "wolf") {
    createWolf();
    createStorie("./result-wolf.png");
  } else if (typeValue === "statham") {
    createStatham();
    createStorie("./result-statham.png");
  }
})();
