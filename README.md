# ChatGPT no terminal do Linux
## Cadastro na plataforma

Para usar o ChatGPT via API, você precisa [se cadastrar na plataforma da openAi](https://platform.openai.com/signup)  
Uma vez cadastrado, no seu perfil, clique em `view API Keys`. Em seguida, clique em `+ Create new secret key`. Copie o código criado.  
Abra o arquivo `.env.example` e substitua o conteúdo da variável API_KEI pelo conteúdo da sua chave. Por exemplo, se sua chave tem o conteúdo `1234`, a variável deve ficar assim:
```js
API_KEY=1234
```
:bangbang: Salve o arquivo e ALTERE O NOME desse arquivo para `.env` -- com o ponto e sem o "example"  
O plano FREE da openAI permite utilizar 100.000 tokens por mês em acessos ao serviço. Quando você faz uma solicitação, o conteúdo do texto enviado na requisição, mais o conteúdo do texto da resposta gerada pela ferramenta, são convertidos em `tokens`. Um token não corresponde exatamente a uma palavra, se você quiser saber mais como isso funciona, visite a [página de documentação da openAI](https://platform.openai.com/docs/introduction/key-concepts). Eu ainda estou testando a ferramenta, mas para desenvolver a aplicação atual, passei um dia fazendo testes e só foram cobrados 54 tokens, então acho que dá pra fazer bastante coisa.  

---
## Rodando Localmente

Abra um terminal na raiz do projeto e execute os seguintes comandos:
```bash
  # instale as dependências do projeto
  yarn install
  # OU
  npm install
```
Agora o projeto está funcionando localmente, basta usar o comando
```bash
yarn start
# OU
npm start
```
---
## Rodando globalmente como bash script
Mas você pode usar a funcionalidade de qualquer ambiente, a partir de um novo terminal. Para isso, execute os comandos a seguir:
```bash
  # permitir execução do arquivo principal
  chmod +x chatgpt.js
  # criar um link simbólico para executar o script de qualquer lugar
  sudo ln -s $(pwd)/chatgpt.js /usr/local/bin/chatgpt
```
Isso é no Linux. No Windows e no OSX você deve descobrir como registrar o script por conta própria.
Finalmente, registre o local atual do script nas suas configurações globais:
```bash
export PATH="$PATH:$(pwd)"
```
Isso não funcionou para mim. Abri o arquivo `~/.bashrc` com o vim e alterei a variável `PATH` para incluir o endereço que obtive com o comando `pwd` na raiz do projeto.  
Se tudo der certo, agora você pode abrir um terminal em qualquer local do seu filesystem e executar o comando:
```bash
chatgpt
```
PRONTO! É só curtir!

---
TODO: deixar no .env opções de outras engines e configurações de temperatura, e criar um prompt para selecionar essas opções ao iniciar o programa (por ex.: para criação de código, usar engine code-davinci-3)
