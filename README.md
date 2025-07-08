Client Page.
![Screenshot 2025-07-08 183153](https://github.com/user-attachments/assets/ae80f872-24af-4e01-9f35-5425bc02dde8)
![Screenshot 2025-07-08 183204](https://github.com/user-attachments/assets/9d45b95b-2e8c-4a17-a641-447eacbfa730)
![Screenshot 2025-07-08 183249](https://github.com/user-attachments/assets/f1ec40e3-1d00-4e7d-8134-5ebc5ec0025c)
![Screenshot 2025-07-08 183301](https://github.com/user-attachments/assets/8c96fcd3-4b3c-4dde-b720-4150972385e4)
![Screenshot 2025-07-08 183312](https://github.com/user-attachments/assets/cec1d82c-7328-420a-956f-d3ea85091ed1)
![Screenshot 2025-07-08 183220](https://github.com/user-attachments/assets/ac9a63b4-bc93-475a-8290-43cd761f3158)
![Screenshot 2025-07-08 183229](https://github.com/user-attachments/assets/d414a50c-ae7e-4cae-88f2-f85911d3b6a2)



# 🚀 AsAutoMotors - Motorbike Sales Management Platform

AsAutoMotors is a full-stack web platform designed for second hand motorbike sales and management. It provides separate interfaces for admins (to manage products, promotions, bookings) and clients (to explore and book bikes). It also features a built-in chatbot powered by DeepInfra for user interaction.

## 🔧 Tech Stack

### 🖥️ Frontend (Admin & Client)
- **React.js** – Component-based UI
- **Tailwind CSS** – Fast, utility-first CSS styling
- **Axios** – API integration with the backend
- **React Hot Toast** – Real-time user notifications

### 🌐 Backend
- **Node.js** – JavaScript runtime environment
- **Express.js** – Web framework for REST APIs
- **JWT (jsonwebtoken)** – Authentication & Authorization
- **MongoDB** – NoSQL database with Mongoose ODM
- **CORS** – Cross-origin request handling
- **Multer** – File uploads handler (image upload)
- **Cloudinary** – Cloud image storage & optimization
- **Axios** – Backend API and chatbot communication
- **Chatbot (DeepInfra)** – AI interaction assistant

### 🔧 Tools
- **Postman** – REST API testing
- **Cloudinary Dashboard** – Image hosting and delivery

## 🔐 Authentication

- Admin login is secured using **JWT tokens**.
- Tokens are stored in **HTTP-only cookies**.
- Role-based access control for admin routes.

## 🖼️ Features

### 🧑‍💼 Admin Panel
- Login with secure authentication
- Add, list, and delete motorbike products
- Upload images via **Multer + Cloudinary**
- Add and manage promotions with images
- View and delete customer bookings
- View customer inquiries
- Real-time success/error feedback via **Toastify**

### 👨‍👩‍👧‍👦 Client/User View
- Browse all listed motorbikes
- View bike details
- Book a motorbike (stored in MongoDB)
- View current promotional offers
- Use chatbot for assistance

### 🤖 AI Chatbot
- Integrated chatbot using **DeepInfra**
- Handles customer queries and interacts using AI
- Uses **Axios** for API calls to the chatbot backend

Installation & Setup for frontend

### 1. Clone the repository

Clone the repository =>  git clone https://github.com/mhmdfashan16/AsAutoMotors.git cd AsAutoMotors
Change the directory => cd client
install dependencies => npm install
to run the backend => npm run dev

### 2. for Admin

Clone the repository =>  git clone https://github.com/mhmdfashan16/AsAutoMotors.git cd AsAutoMotors
Change the directory => cd admin
install dependencies => npm install
to run the backend => npm run admin


**Installation Guide for backend**

Clone the repository =>  git clone https://github.com/mhmdfashan16/AsAutoMotors.git cd AsAutoMotors
Change the directory => cd backend
install dependencies => npm install
to run the backend => npm run backend
