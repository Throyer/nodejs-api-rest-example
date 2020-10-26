<p align="center">
    <a href="www.google.com"><img width="200" src="./assets/node.png"></a>
</p>
<br>
    <h1 align="center">NodeJS + Typescript + TypeOrm</h1>
<br>
<br>
<p>
    Projeto simples de crud com TypeOrm.
</p>

## Requisitos:
- `nodejs`
- `mariadb ou mysql`

## Como executar:
> antes de executar, certifique-se de criar um arquivo `.env` na raiz do projeto com as variaveis do seu ambiente e atualize o banco de dados com as migrações com o comando: `yarn migration:run`
>
> [(mais informações sobre as migrações aqui)](https://github.com/Throyer/nodejs-crud#migra%C3%A7%C3%B5es)
> 
> As migrações iniciais criam um usuario administrador.
> ```json
> {
>     "email": "admin@email.com",
>     "password": "admin"
> }
> ```

```shell
git clone git@github.com:Throyer/nodejs-crud.git

cd nodejs-crud

yarn install

yarn dev
```
# Coleção `json` no postman
Você pode encontrar a coleção no postman com algumas variaveis setadas [aqui](./assets/postman/node_api.json)

# Docker
```
# subir container
yarn docker:up

# derrubar container
yarn docker:stop

# remover container
yarn docker:down
```

## Migrações

```
# criar migração a partir de mudanças nos modelos
yarn migration:generate

# criar nova migração manual
yarn migration:create

# rodar migrações na base
yarn migration:run

# mostrar estado do banco
yarn migration:show

# voltar para a migração anterior
yarn migration:revert

# resetar o schema (cuidado este comando limpa a base e cria novamente)
yarn migration:restart
```
