const textToImage = require("text-to-image");
const IDU = require("image-data-uri");
const fs = require("fs");

async function createText(text) {
  let quotesFile = JSON.parse(fs.readFileSync("./quotes.json"));
  const typeArg = process.argv.find((string) => string.includes("--type"));
  const [_, type] = typeArg.split("=");
  console.log(typeArg)
  if(type === "wolf") {
    if(quotesFile.wolf.length === quotesFile.usedQuotesWolf.length) {
      throw new Error('Wolf quotes are over!');
    }
    await quotesFile.usedQuotesWolf.push(text);
    fs.writeFileSync("./quotes.json", JSON.stringify(quotesFile, null, 4));
  } else if(type === "statham") {
    if(quotesFile.statham.length === quotesFile.usedQuotesStatham.length) {
      throw new Error('Statham quotes are over!');
    }
    await quotesFile.usedQuotesStatham.push(text);
    fs.writeFileSync("./quotes.json", JSON.stringify(quotesFile, null, 4));
  }

  const dataUri = await textToImage.generate(text, {
    maxWidth: 680,
    fontSize: 60,
    lineHeight: 75,
    bgColor: "#00000061",
    textColor: "#fff",
  });

  await IDU.outputFile(dataUri, "text.png");
}

const textArg = process.argv.find((string) => string.includes("--text"));

if (!textArg) {
  throw new Error("Отсутствует --text аргумент!");
}

const [_, textValue] = textArg.split("=");

createText(textValue);
