# LogicSparkExam

Logic Spark Co.,LTD Exam

---

## POSTMAN

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7b27e3869f3920791cbe)

---

## Migrate

- `npm run install`
- `npx knex migrate:latest`

#### _For rollback use command_

- `npx knex migrate:rollback`

---

## Run the app

- **Production Environment**

```
npm run start
```

- **Development Environment**

```
npm run start:dev
```

---

## REST API

### - Get List of Categories

- API Method : **GET**
- API Name : **Get All Categories**
- REST : `/api/categories/`

````
Params

- Category_name ```string```
````

---

### - Get List of Products

- API Method : **GET**
- API Name : **Get All Products**
- REST : `/api/products/`

### - Get List of Products with category

- API Method : **GET**
- API Name : **Get All Products with Categories name**
- REST : `/api/products/categories/`

### - Add New Category

- API Method : **POST**
- API Name : **Add New Category**
- REST : `/api/category/`

### - Add New Product

- API Method : **POST**
- API Name : **Add New Product**
- REST : `/api/product/`

### - Update Category

- API Method : **PATCH**
- API Name : **Update Category**
- REST : `/api/category/:id`

### - Update Product

- API Method : **PATCH**
- API Name : **Update Product**
- REST : `/api/product/:id`

### - Delete Category

- API Method : **DELETE**
- API Name : **Delete Category**
- REST : `/api/cateogy/:id`

### - Delete Product

- API Method : **DELETE**
- API Name : **Delete Product**
- REST : `/api/product/:id`

### - Get Product Join With Category

- API Methods : **GET**
- API Name : **Get Movies**
- REST : `/api/movies`

---

## Task List

- [x] : Get List of All Category
- [x] : Get List of Category with Simple Condition
- [x] : Add New Single Rows of Category
- [x] : Add New Multiple Rows of Category
- [x] : Update Single Rows of Category
- [x] : Delete Single Rows of Category
- [x] : Get List of Products
- [x] : Get List of Products with Simple Condition
- [x] : Add New Single Rows of Product with Single Category
- [x] : Add New Multiples Rows of Product with Single Category
- [x] : Add New Single Rows of Product with Multiples Category
- [x] : Add New Multiples Rows of Product with Multiples Category
- [x] : Update Single Rows of Product
- [x] : Delete Single Rows of Product
- [ ] : Get List of Product
- [x] : Get List of Product Joined With Category
- [ ] : Get List of Category with dynamic condition (And / Or)
- [ ] : Get List of Product with dynamic condition (And / Or)
- [ ] : Add New Product without Category
- [ ] : Update Product to Add / Remove Category
