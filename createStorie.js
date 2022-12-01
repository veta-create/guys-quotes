const FormData = require("form-data");
const fs = require("fs");
const fetch = require("node-fetch");

const access_token = require('./env.js');

async function createStorie(path) {
  const urlRequest = await fetch(
    `https://api.vk.com/method/stories.getPhotoUploadServer?v=5.131&access_token=${access_token}&add_to_news=1`
  );

  const urlRequestJSON = await urlRequest.json();

  // загружаем картинку по полученному url
  const form = new FormData();
  form.append("photo", fs.createReadStream(path));
  const imageUploadRequest = await fetch(urlRequestJSON.response.upload_url, {
    method: "POST",
    body: form,
  });

  const imageUploadRequestJSON = await imageUploadRequest.json();

  // сохраняем историю
  const saveStoryRequest = await fetch(
    `https://api.vk.com/method/stories.save?v=5.131&access_token=${access_token}&upload_results=${imageUploadRequestJSON.response.upload_result}`,
    { method: "POST" }
  );

  const saveStoryRequestJSON = await saveStoryRequest.json();
}

module.exports = createStorie