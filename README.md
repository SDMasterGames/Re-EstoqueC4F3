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

#### EndPoints
##### Raiz
- `[GET]/` - só mostra uma mensagem de bem-vindo
##### Produtos
- `[GET]/storage/` - Obter a lista com todos os produtos
  - aceitando query para cada elemento do model, caso queira buscar por nome adicione na query a prop "search"
- `[POST]/storage/` - Cadastra um novo produto.
- `[PUT]/storage/:id` - Muda uma propriedade do produto.
- `[DELETE]/storage:id` - Deleta um produto.
##### Usuários
- `[GET]/user/validate/:token` - Válida se o token informado foi gerado pela aplicação.
- `[POST]/user/register` - Cadastra um novo usuário.
- `[POST]/user/auth` - Autenticação de usuário para gerar o token.
##### Carrinho
- `[GET]/cart/` - Obter a lista com todos os produtos no carrinho.
- `[POST]/cart/` - Adicionar um novo item no carrinho
- `[DELETE]/cart/` - Remove um item do carrinho
  - query = { id }
- `[DELETE]/cart/clear` - Limpa o carrinho removendo todos os itens dele.

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
