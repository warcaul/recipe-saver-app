# Recipe Saver

## Overview  
**Recipe Saver** is a modern web application that enables users to create, organize, and share their favorite recipes. The app offers an intuitive user interface, personalized profiles, rating and liking system, image uploads, and powerful search capabilities. Built using **Node.js**, **Express**, **Handlebars**, and **LowDB**, it offers a lightweight yet full-featured recipe management experience.

## ✨ Features

### 🌐 Core Functionality
- 📖 **Catalogue View** – Paginated recipe catalogue with sorting (by date or rating).
- 🔍 **Advanced Search** – Search by name, filter by allergies, vegetarian preference, and rating.
- 📝 **Recipe Forms** – Add, edit, and delete recipes with cooking steps and allergy metadata.
- ❤️ **Like System** – Users can like/unlike recipes; ratings are automatically calculated.
- 📷 **Image Uploads** – Upload avatars and recipe photos via **Cloudinary** integration.

### 👤 User Features
- 👨‍🍳 **Profile Page** – Shows user statistics (number of recipes, average rating).
- 🧾 **My Recipes** – View and manage all personal recipes.
- 🔐 **Authentication** – Secure login and profile update options, including password changes.
- 🗑️ **Account Deletion** – Users can delete their account and all associated data.

## 📦 Tech Stack

- **Backend**:  
  - Node.js  
  - Express.js  
  - LowDB (JSON-based NoSQL)  
  - Cloudinary (image hosting)

- **Frontend**:  
  - Express-Handlebars  
  - Fomantic UI  
  - Vanilla JavaScript  

- **Utilities**:  
  - Winston logger  
  - FileUpload middleware  
  - Custom helpers (e.g., pagination, formatting)

## 📁 Project Structure

```
.
├── controllers/       # Route controllers (views & logic)
├── models/            # Data store logic (LowDB, Cloudinary)
├── views/             # Handlebars templates
├── public/            # Static files (CSS, icons)
├── utils/             # Logger, helpers
├── .data/             # Environment variables (cloudinary)
└── db.json            # JSON database
```

## 🚀 What's New in Version 2.0.0

- ✅ Full image upload support for user avatars and recipe photos  
- ✅ Improved mobile-responsive navigation and layout  
- ✅ New like/thumbs-up rating system  
- ✅ Full search + filtering logic by name, dietary tags, and rating  
- ✅ Sort catalogue by date or popularity  
- ✅ Display authors and interactive buttons per recipe  
- ✅ Pagination for all major pages  
- ✅ Refactored and modular controller structure  

## 🏫 License

This project was developed for educational purposes as part of an assignment at **SETU Waterford**.
