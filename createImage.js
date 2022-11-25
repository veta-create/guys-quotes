const sharp = require("sharp");

async function createImage(imagePath, textImagePath) {
  await sharp(imagePath)
    .resize(720, 1520)
    .composite([{ input: textImagePath }])
    .toFile("result.png");
};

const imageArg = process.argv.find(string => string.includes('--image'));

if(!imageArg) {
  throw new Error('Отсутствует --image аргумент');
}

const [_, imageValue] = imageArg.split('=');

createImage(`${imageValue}`, "./text.png");

