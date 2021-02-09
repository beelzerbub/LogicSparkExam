# LogicSparkExam

Logic Spark Co.,LTD Exam

---

## Migrate

- `npm run install`
- `npx knex migrate:latest`

---

## Run the app

- `npm run start`

---

## REST API

### - Get List of Categories

- API Method : **GET**
- API Name : **Get All Categories**
- REST : `/api/categories/`
- NON REST : `/getCategories/`

---

### - Get List of Products

- API Method : **GET**
- API Name : **Get All Products**
- REST : `/api/products/`
- NON REST : `/getProducts`

### - Get List of Products with category

- API Method : **GET**
- API Name : **Get All Products with Categories name**
- REST : `/api/products/categories/`
- NON REST : `/getProductWithCategories/`

### - Add New Category

- API Method : **POST**
- API Name : **Add New Category**
- REST : `/api/category/`
- NON REST : `/addCategory`

### - Add New Product

- API Method : **POST**
- API Name : **Add New Product**
- REST : `/api/product/`
- NON REST : `/addProduct`

### - Update Category

- API Method : **PATCH**
- API Name : **Update Category**
- REST : `/api/category/:id`
- NON REST : `/updateCategory`

### - Update Product

- API Method : **PATCH**
- API Name : **Update Product**
- REST : `/api/product/:id`
- NON REST : `/updateProduct`

### - Delete Category

- API Method : **DELETE**
- API Name : **Delete Category**
- REST : `/api/cateogy/:id`
- NON REST : `/deleteCategory`

### - Delete Product

- API Method : **DELETE**
- API Name : **Delete Product**
- REST : `/api/product/:id`
- NON REST : `/deleteProduct`
