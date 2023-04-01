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

const getFileContents = () => JSON.parse(fs.readFileSync(file))

const updateFileContents = (messages) => {
  while (messages.length >= 6) messages.shift();
  fs.writeFileSync(file, JSON.stringify(messages, null, 2))
}

const chat = async () => {
  const question = await rl.question('Question: ')
  const messages = getFileContents()
  messages.push({ role: 'user', content: question })

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages
  });

  const response = completion.data.choices[ 0 ].message
  console.log('Answer: ', response.content, '\n');

  messages.push(response)
  updateFileContents(messages)
}

async function main () {
  console.clear()
  console.log('Bem-vindo ao ChatGPT. Para sair, digite CTRL+C\n')
  while (true) {
    await chat()
  }
}

main();
