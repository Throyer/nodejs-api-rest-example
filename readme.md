<br />
<p align="center">
  <a href="https://github.com/Throyer/nodejs-api-crud">
    <img src="./assets/node.png" alt="Logo" height="300">
  </a>

  <h3 align="center">CRUD API - Node Js</h3>

  <p align="center">
    Docker, Typescript, Typeorm, JWT, swagger, NestJS e PostgreSQL
    <br />
  </p>
</p>

## Table of Contents

- [Requisitos](#requisitos)
- [Como executar](#como-executar)
- [Coleção no postman](#coleção-no-postman)
- [Docker](#docker)
- [Migrações](#migrações)

## Requisitos:

- `nodejs`
- `postgres`

## Como executar:

> antes de executar, certifique-se de atualizar o arquivo `.env` na raiz do projeto com as variaveis do seu ambiente e atualize o banco de dados com as migrações com o comando: `yarn migration:run`
>
> [(mais informações sobre as migrações aqui)](#migrações)
>
> As migrações iniciais criam um usuario administrador.
>
> ```json
> {
>   "email": "admin@email.com",
>   "password": "admin"
> }
> ```

```sh
git clone git@github.com:Throyer/nodejs-api-crud.git node-crud

cd node-crud

yarn install

cp .env.example .env

yarn migration:run

yarn dev
```

## Coleção no postman

Você pode encontrar a coleção `json` no **postman**/**insomnia** com algumas variaveis setadas [aqui](./assets/postman/node_api.json)

## Docker

```sh
# subir container
yarn up

# derrubar container
yarn stop

# remover container
yarn down
```

## Migrações

<p align="center">
  <img src="./assets/crud_node_deer.png" alt="Logo" height="200">
</p>

```sh
# criar migração a partir de mudanças nos modelos
yarn migration:generate

# criar nova migração manual
yarn migration:create

# rodar migrações na base
yarn migration:run

# mostrar estado do banco
yarn migration:show

# voltar para a migração anterior
yarn migration:rollback

# resetar o schema (cuidado este comando limpa a base e cria novamente)
yarn migration:drop-create

# rodar os seeds
yarn seed:run

# criar novo arquivo de seeds
yarn seed:create
```
