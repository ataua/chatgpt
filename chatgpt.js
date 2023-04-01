#!/usr/bin/env node

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { Configuration, OpenAIApi } from 'openai'
import path from 'path'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import fs from 'fs'

const dotenvPath = new URL('./.env', import.meta.url).pathname
dotenv.config({ path: dotenvPath })
const file = new URL('./chat.json', import.meta.url).pathname

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({ input, output });

const getFileContents = (file) => {
  const content = JSON.parse(fs.readFileSync(file))
  return content.map(el => `Question: ${ el.Question }\nAnswer: ${ el.Answer }`).join('\n')
}

const updateFileContents = (file, lastChat) => {
  const content = JSON.parse(fs.readFileSync(file))
  if (content.length >= 3) content.shift();
  content.push(lastChat)
  fs.writeFileSync(file, JSON.stringify(content, null, 2))
}

const chat = async () => {
  const question = await rl.question('Question: ')
  const prompt = getFileContents(file) + '\nQuestion: ' + question
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 2,
    max_tokens: 600,
    n: 1,
    top_p: 0.5,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });

  const response = completion.data.choices[ 0 ].text.toString()
  console.log(response);

  updateFileContents(file, { Question: question, Answer: response.toString().substring(9) })
}

async function main () {
  console.log('Bem-vindo ao ChatGPT. Para sair, digite CTRL+C')
  while (true) {
    await chat()
  }
}

main();
