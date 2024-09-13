Neste projeto, desenvolvi uma aplicação Fullstack utilizando Next.js, MySQL e React.js. O sistema permite a importação de dados por meio de arquivos CSV, com distribuição automatizada entre os operadores cadastrados.

Para executar a aplicação, é necessário iniciar o servidor disponível em outro repositório. Em seguida, siga os passos abaixo para rodar o frontend:

```bash

npm install

npx prisa generate
#or
npm run generate

npm run dev
```

Caso os dados não apareçam dar um reload

Explicação do projeto:

Página Principal:

A página inicial é voltada para o gerenciamento, exibindo dados estatísticos, como o número de operadores online e o total de operadores cadastrados.
Implementei o CRUD completo para a gestão dos operadores. 
Também trabalhei na responsividade desta página para garantir uma melhor experiência em diferentes dispositivos, utilizando o tailwind para esta tarefa.

Pagina de Cliente:

Implementei uma tabela usando o useReactTable a qual exibe os dados do cliente bem como qual operador responsavel pelo atendimento
Havia o plano de fazer dois filtros, um para pesquisar pelo nome do cliente e uma combobox para selecionar os clientes pelos operadores disponiveis

Essa era a estrutura pensada e desenvolvida parcialmente para o front


