# Api EstoqueC4F3

Refatoração do [EstoqueC4F3](https://github.com/DennisArgemiro/EstoqueC4F3).

#### O que foi usado?

- Nodejs
- Sequelize
  - MySQL
- Docker
  - Docker-Compose
- Express
- Bcrypt
- JsonWebToken

#### Instalação

```bash
git clone https://github.com/SDMasterGames/Re-EstoqueC4F3.git

cd Re-EstoqueC4F3

npm install
```

iniciar a aplicação para desenvolvimento usando o docker-compose

```bash
# no linux
sudo docker-compose up --build
```

criação do banco de dados da aplicação

```bash
npx sequelize-cli db:create
```

#### Models

##### Produtos

```json
{
  "name": "string",
  "type": "string",
  "price": "string",
  "expirationIn": "string",
  "lote": "integer",
  "qtd": "integer"
}
```

##### Usuários

```json
{
  "username": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "isAdministrator": "boolean",
  "type": "integer"
}
```

##### Carrinho

```json
{
  "productId": "integer",
  "qtd": "integer"
}
```
