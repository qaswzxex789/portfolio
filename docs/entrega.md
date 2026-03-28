# Documento de Entrega

## O que e o projeto

Ressonancia Universal e um portfolio tematico desenvolvido com HTML, CSS e TypeScript puro.
O assunto escolhido foi a relacao entre musica, astronomia e frequencias. A proposta foi fugir
de temas comuns e construir uma experiencia visual mais madura, com conteudo real e uma identidade
propria.

O site possui tres paginas obrigatorias:

- `index.html`: apresenta o conceito geral e os cards interativos.
- `sobre.html`: explica o tema, a estrutura e o processo de construcao.
- `conteudo.html`: reune repertorio, colecoes e rotas de exploracao.

O principal diferencial visual e o fundo animado de buraco negro criado com HTML5 Canvas.

## Como rodar localmente

1. Instale as dependencias do projeto com `npm install`.
2. Compile o TypeScript com `npx tsc`.
3. Inicie o servidor local com `npm start`.
4. Abra `http://localhost:3000`.

Tambem e possivel hospedar o projeto em um servico estatico, desde que os arquivos HTML, CSS e a
pasta `dist/` estejam publicados juntos.

## O que foi aprendido

- Organizar um projeto front-end sem framework, mantendo os arquivos legiveis.
- Trabalhar com TypeScript strict para evitar erros comuns de DOM e `null`.
- Criar animacoes fluidas com `requestAnimationFrame` e Canvas 2D.
- Pensar em hierarquia visual, contraste, espaco e navegacao em um portfolio real.
- Preparar um projeto para hospedagem publica, sem depender de ambiente local.

## Como apresentar rapidamente

Uma boa ordem para a demonstracao ao vivo e:

1. Abrir a Home e mostrar o fundo animado.
2. Trocar os cards de Musica, Astronomia e Conexao.
3. Ir para a pagina Sobre para explicar as decisoes tecnicas.
4. Finalizar na pagina Conteudo para provar que o site tem repertorio e estrutura.
