# E - Commerce Clothing Website

A full-stack e-commerce clothing website built with modern web technologies. It features a responsive design, dynamic product management, and advanced filters for effortless product discovery. Designed to provide an intuitive and visually appealing shopping experience.

---

## Demo Link

[Live Demo](https://fe-major-project-1.vercel.app/)

---

## Quick Start

```
# Clone the repo
https://github.com/ChethanFrontendDev/FE-Major-Project-1.git

# Go to the project folder
cd <your-repo>

# Install dependencies
npm install

# Start development server
npm run dev  # or `npm start` / `yarn dev`

```

---

## Technologies

- React JS
- React Router
- Bootstrap
- Node JS
- Express
- MongoDB
- Toast JS

---

## Demo Video

Watch a walkthrough (4-5 minutes) of all the major features of this app:
[Loom Video](https://drive.google.com/file/d/1iCxBhtq0YNcthXIcKQ5WHYpfcSYWyYlr/view?usp=sharing)

---

## Features

**Home**

- Multiple collection sections
- Featured products
- New arrivals

**Listing Page**

- View and search products
- Quick filters: Price, Category, Rating, Sort By, Clear
- Product cards with “Add to Cart” and “Save to Wishlist” options

**Product Details Page**

- View detailed product information: name, rating, price, quantity, size, and description
- Check delivery options: Free Delivery, Pay on Delivery, and Secure Payment
- View Return Policy with number of returnable days

**Cart**

- View added products
- Price details with discounts and delivery charges
- Total amount with checkout option

**Checkout**

- Select an existing address to proceed
- Add, edit, or delete addresses
- “Place Order” button to confirm purchase

**Order Placed**

- Order success message with order summary
- Final price breakdown

**Wishlist**

- View all saved products

**Profile**

- View personal info: username, email, phone, and address
- Add new addresses
- Order history section
- View total cart value

---

## API Reference

### **GET /api/products**<br>

Retrieve a list of all products.<br>

Sample Response:<br>

```
[{featuredCategory, categoryName, productName, }, ....]
```

### **GET api/products/featuredCategory**<br>

Retrieve a list of products grouped by their featured category.<br>

Sample Response:<br>

```
[{productName, productUrl, rating, quantity, discountRate, numberOfReturnableDays}, ....]
```

### **GET api/products/featuredCategory/:id**<br>

Retrieve details of a single product by its ID.<br>

Sample Response:<br>

```
[{productName, productUrl, rating, quantity, discountRate, numberOfReturnableDays}, ....]
```

### **POST api/products/featuredCategory/:id**<br>

Update specific product fields<br>

Sample Response:<br>

```
{selectedSize, quantity, isAddedToCart,}
```

### **GET api/profile**<br>

Retrieve user profile details.<br>

Sample Response:<br>

```
[{address:[....], email, name, phone, profilePictureUrl}]
```

### **POST api/profile/user/:id/address**<br>

Add a new address to the user profile.<br>

Sample Response:<br>

```
{addressLine, fullName, landMark, phoneNumber, zipCode,}
```

### **POST api/profile/user/:id/address/:id**<br>

Update an existing address.<br>

Sample Response:<br>

```
{addressLine, fullName, landMark, phoneNumber, zipCode,}
```

### **DELETE api/profile/user/:id/address/:id**<br>

Delete a user address.<br>

Sample Response:<br>

```
message: "address deleted successfully."
```

### **POST api/featuredCategories/placedOrders**<br>

Create or update order details.<br>

Sample Response:<br>

```
{products:[....], address:{....}, products:[], deliveryCharges, totalCartValue, ....}
```
---

## Contact

For bugs or feature request, please reach out to chethankumar.dev@gmail.com





