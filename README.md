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
