async function createText(text) {
  const textToImage = require("text-to-image");
  const IDU = require("image-data-uri");

  const dataUri = await textToImage.generate(text, {
    maxWidth: 680,
    fontSize: 60,
    lineHeight: 75,
    bgColor: "#00000061",
    textColor: "#fff",
  });

  await IDU.outputFile(dataUri, "text.png");
};

const textArg = process.argv.find(string => string.includes('--text'));

if(!textArg) {
  throw new Error('Отсутствует --text аргумент!');
}

const [_, textValue] = textArg.split('=');

createText(textValue);

