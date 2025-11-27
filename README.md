<h1 align="center"> E-commerce Backend </h1>

## 📌 Sobre

O E-commerce Backend é um projeto desenvolvido desenvolvido em sala de aula da disciplina de Programação, do Centro Universitário Mater Dei - UNIMATER, que é uma API REST. O objetivo do projeto é fornecer todas as operações necessárias para gerenciar categorias, marcas, produtos, clientes e pedidos de um e-commerce completo.

## 🧭 Rotas

### Marcas
- ```GET /brands```
- ```GET /brands/:id```
- ```POST /brands```
- ```PUT /brands/:id```
- ```DELETE /brands/:id```

###  Categorias
- ```GET /categories```
- ```GET /categories/:id```
- ```POST /categories```
- ```PUT /categories/:id```
- ```DELETE /categories/:id```

### Cidades
- ```GET /cities```
- ```GET /cities/:id```
- ```POST /cities```
- ```PUT /cities/:id```
- ```DELETE /cities/:id```

### Estados
- ```GET /states```
- ```GET /states/:id```
- ```POST /states```
- ```PUT /states/:id```
- ```DELETE /states/:id```

### Clientes
- ```GET /customers```
- ```GET /customers/:id```
- ```POST /customers```
- ```PUT /customers/:id```
- ```DELETE /customers/:id```

### Pedidos
- ```GET /orders```
- ```GET /orders/:id```
- ```POST /orders```
- ```PUT /orders/:id```
- ```DELETE /orders/:id```

### Itens do Pedido
- ```GET /order-items```
- ```GET /order-items/:id```
- ```POST /order-items```
- ```PUT /order-items/:id```
- ```DELETE /order-items/:id```

### Produtos
- ```GET /products```
- ```GET /products?categoryId=:categoryId```
- ```GET /products/:id```
- ```POST /products```
- ```PUT /products/:id```
- ```DELETE /products/:id```

### Favoritos
- ```GET /favorites```
- ```GET /favorites?customerId=:customerId```
- ```POST /favorites```

### Reviews
- ```GET /reviews```
- ```GET /reviews?productId=:productId```
- ```POST /reviews```

## 🗄 Banco de Dados

O projeto utiliza **PostgreSQL** hospedado no **Supabase** como banco de dados principal, com **TypeORM** como ORM para mapear entidades, criar relações e realizar operações no banco.

## ⚙️ Variáveis de Ambiente

Para rodar o projeto, é necessário configurar as credenciais do Supabase no arquivo ```.env```:
```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

## 🔌 Conexão com TypeORM

No arquivo ```app.module.ts```, deve-se adicionar a seguinte configuração nos **imports**:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true
})
```

## 🛠 Tecnologias

<div align="center">
  <table>
    <tr>
      <th>NodeJs</th>
      <th>Nest</th>
      <th>Supabase</th>
      <th>TypeScript</th>
    </tr>
    <tr>
      <td align="center"><a href="https://skillicons.dev"><img src="https://skillicons.dev/icons?i=nodejs" alt="Node"></a></td>
      <td align="center"><a href="https://skillicons.dev"><img src="https://skillicons.dev/icons?i=nest" alt="Nest"></a></td>
      <td align="center"><a href="https://skillicons.dev"><img src="https://skillicons.dev/icons?i=supabase" alt="Supabase"></a></td>
      <td align="center"><a href="https://skillicons.dev"><img src="https://skillicons.dev/icons?i=typescript" alt="TypeScript"></a></td>
    </tr>
  </table>
</div>
