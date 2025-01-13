# Product Management API

This project is a simple backend API built with **Node.js**, **Express.js**, and **MongoDB**. It manages products and their association with categories, enabling features like product creation, filtering, and updating.

---

## Features

1. **Category Management**:
   - Create a category.
   - Retrieve all categories.

2. **Product Management**:
   - Create a product with validation for category association.
   - Retrieve products with filters:
     - Filter by category.
     - Search by name (case-insensitive).
     - Pricing calculation (includes original price and final price after discount).
   - Update product details.
   - Delete a product.

3. **Validation**:
   - Ensure products are associated with valid categories.
   - Schema-level validations using Mongoose.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing categories and products.
- **Mongoose**: ODM for MongoDB.

---

## Installation

### Prerequisites
- Node.js installed
- MongoDB Atlas or local MongoDB instance

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/SyedIshmumAhnaf/product_management_backend.git
   cd product_management_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and configure the following variables:
   ```env
   MONGO_URI=use-your-own-mongodb-connection-string
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run start
   ```

5. The API will be available at `http://localhost:5000`.

---

## API Endpoints

### Categories

#### **1. Create a Category**
- **URL**: `/categories`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Electronics"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "64abc123456def7890123456",
      "name": "Electronics",
      "createdAt": "2025-01-09T12:34:56.789Z",
      "updatedAt": "2025-01-09T12:34:56.789Z",
      "__v": 0
    },
    "message": "Category created successfully!"
  }
  ```

#### **2. Get All Categories**
- **URL**: `/categories`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "64abc123456def7890123456",
        "name": "Electronics",
        "createdAt": "2025-01-09T12:34:56.789Z",
        "updatedAt": "2025-01-09T12:34:56.789Z",
        "__v": 0
      }
    ]
  }
  ```

### Products

#### **1. Create a Product**
- **URL**: `/products`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Apple iPhone 16",
    "description": "Our best iPhone ever made!",
    "price": 799,
    "discount": 10,
    "image": "https://example.com/iphone16.jpg",
    "status": "In Stock",
    "category": "64abc123456def7890123456"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "64abc123456def7890123456",
      "name": "Apple iPhone 16",
      "description": "Our best iPhone ever made!",
      "price": 799,
      "discount": 10,
      "image": "https://example.com/iphone16.jpg",
      "status": "In Stock",
      "category": "64abc123456def7890123456",
      "productCode": "p48asd4-0alport8",
      "createdAt": "2025-01-09T12:34:56.789Z",
      "updatedAt": "2025-01-09T12:34:56.789Z",
      "__v": 0
    },
    "message": "Product created successfully!"
  }
  ```

#### **2. Get Products with Filters**
- **URL**: `/products`
- **Method**: `GET`
- **Query Parameters**:
  - `category`: Filter by category ID.
  - `name`: Search by name (case-insensitive).
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "64abc123456def7890123456",
        "name": "Apple iPhone 16",
        "price": 799,
        "discount": 10,
        "category": {
          "_id": "64abc123456def7890123456",
          "name": "Electronics"
        },
        "originalPrice": 799,
        "finalPrice": "719.10"
      }
    ]
  }
  ```

#### **3. Update a Product**
- **URL**: `/products/:id`
- **Method**: `PATCH`
- **Body**:
  ```json
  {
    "price": 899,
    "status": "Stock Out"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "64abc123456def7890123456",
      "price": 899,
      "status": "Stock Out"
    },
    "message": "Product updated successfully!"
  }
  ```

#### **4. Delete a Product**
- **URL**: `/products/:id`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Product deleted successfully!"
  }
  ```

---

## Validation and Consistency

1. **Product-Category Association**:
   - Products must reference a valid category.
   - If the category is invalid or missing, the API responds with an error.

2. **Schema Validation**:
   - Enforced at the schema level using Mongoose.
   - Validates fields like `name`, `price`, and `category`.

---

## License
This project is licensed under the MIT License.

