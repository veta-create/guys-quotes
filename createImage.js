const sharp = require("sharp");

async function createImage(imagePath, textImagePath, typeValue) {
  await sharp(imagePath)
    .resize(720, 1520)
    .composite([{ input: textImagePath }])
    .toFile(`result-${typeValue}.png`);
}

const imageArg = process.argv.find((string) => string.includes("--image"));
const typeArg = process.argv.find((string) => string.includes("--type"));

if (!imageArg) {
  throw new Error("Отсутствует --image аргумент");
}

if (!typeArg) {
  throw new Error("Отсутствует --type аргумент");
}

const [_, imageValue] = imageArg.split("=");
const [__, typeValue] = typeArg.split("=");

createImage(`${imageValue}`, "./text.png", typeValue);
