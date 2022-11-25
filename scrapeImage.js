const fs = require("fs");
const puppeteer = require("puppeteer");
const fetch = require("node-fetch");

//получает наименование на русском, возвращает транслитом, с маленькой буквы, заменив пробелы на тире
function generateName(str) {
  var answer = "";
  var converter = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ь: "",
    ы: "y",
    ъ: "",
    э: "e",
    ю: "yu",
    я: "ya",

    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "E",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ь: "",
    Ы: "Y",
    Ъ: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
    " ": "-",
  };

  for (var i = 0; i < str.length; ++i) {
    if (converter[str[i]] == undefined) {
      answer += str[i];
    } else {
      answer += converter[str[i]];
    }
  }

  return answer.toLowerCase();
}

let scrapeImage = async (imageName) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    args: [`--window-size=1920,1080`],
  });
  const page = await browser.newPage();
  await page.goto("https://yandex.ru/images/");
  await page.waitForTimeout(15000);
  await page.type(".input__control.mini-suggest__input", `${imageName} jpeg`);
  await page.keyboard.press("Enter");
  await page.waitForSelector(".serp-list");
  await page.waitForTimeout(4000);
  await page.waitForSelector(".Filter:nth-child(2)");
  await page.click(".Filter:nth-child(2)");
  await page.click('button[data-value="vertical"]');
  await page.waitForTimeout(10000);

  const imagesElements = await page.evaluate(() => {
    let arr = [];
    const serpItems = document.querySelectorAll(".serp-item");
    for (let item of serpItems) {
      arr.push(item.id);
    }
    return arr;
  });

  function downloadImage(url, path) {
    return fetch(url).then((res) => {
      res.body.pipe(fs.createWriteStream(path));
    });
  }

  console.log(imagesElements);

  for (let i = 0; i < imagesElements.length; i++) {
    await page.click(`.serp-item[id='${imagesElements[i]}']`);
    await page.waitForTimeout(5000);
    let getImageSRC = await page.evaluate(() => {
      const imageSRC = document.querySelector(".MMImage-Origin");
      return imageSRC.src;
    });
    let imageSRC = getImageSRC;
    await downloadImage(imageSRC, `./wolfImages/${generateName(imageName)}-${i + 1}.jpeg`)
    await page.click(".MMViewerModal-Close");
  }

  await browser.close();
};

scrapeImage("волк");
