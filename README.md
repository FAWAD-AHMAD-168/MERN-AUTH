

# 💻 MERN Authentication System (Full-Stack Project)

A **secure, production-oriented authentication system** built using the MERN stack.
This project implements complete user authentication flow including **OTP email verification, JWT-based login system, password recovery, and protected routes**.

---

## 📌 1- Project Overview

This project demonstrates a **real-world authentication architecture** used in modern web applications. It includes:

* Secure user registration with OTP verification (via email)
* JWT-based authentication using HTTP-only cookies
* Forgot password & password reset system
* Protected user routes
* Rate-limited and secure API endpoints

The goal of this project is to implement a **scalable, secure, and modular authentication system** using industry best practices.

---

## ✨ 2 - Features

* User Registration with Email OTP Verification
* Login with JWT Authentication
* HTTP-only Cookie-based Session Management
* Forgot Password & Reset Password Flow
* Change Password (Authenticated Users)
* Protected Routes (Frontend + Backend)
* Rate Limiting for Security (OTP & APIs)
* User Profile Fetching after Authentication
* Logout Functionality
* Fully Responsive UI

---

## 🛠️ 3 - Tech Stack

### 🔹3.1 - Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* bcrypt (Password Hashing)
* cookie-parser
* Resend (Email Service for OTP)
* express-rate-limit
* dotenv

### 🔹 3.2 - Frontend

* React (Vite)
* Redux Toolkit (API State Management)
* React Router DOM
* React Hook Form
* React Toastify
* Tailwind CSS
* Lucide React

---
## 📡 4 - API Endpoints

###  4.1 Auth Routes

* `POST   /api/auth/register`
* `POST   /api/auth/verify-otp`
* `POST   /api/auth/resend-otp`
* `POST   /api/auth/login`
* `POST   /api/auth/reset-otp`
* `POST   /api/auth/verify-reset-otp`
* `POST   /api/auth/reset-password`
* `POST   /api/auth/change-password`
* `POST   /api/auth/logout`
### 4.2  User Routes

*  `GET /api/user/user-data`

###  4.3 API TESTING  - (POSTMAN Screenshots)

<details>
     <summary>📸 View All Project Screenshots</summary>

  ### 🔐 Register API
  ![Register](./screenshots/register.jpeg)

  ### 🔑 Login API
  ![Login](./screenshots/login.jpeg)

  ### 📧 OTP Verification
  ![OTP](./screenshots/verifyotp.jpeg)

  ### 👤 Protected User Data
  ![User Data](./screenshots/user-data.jpeg)

  ### 🔓 Reset Otp
  ![Reset OTP](./screenshots/resetotp.jpeg)

  ### 🔓 Verify Reset OTP
  ![Verify Reset OTP](./screenshots/verifyresetotp.jpeg)

  ### 🔓 Forgot Password
  ![Reset Password](./screenshots/reset-password.jpeg)

  ### 🔓 change Password
  ![Change Password](./screenshots/change-password.jpeg)

  ### 🔓 Login After Changed Password
  ![Login With new password](./screenshots/login1.jpeg)


  ### 🔓 Logout 
  ![Logout ](./screenshots/logout.jpeg)



  </details>

---


---

## 📁5 - Project Structure

### 🔹 5.1 -  Backend Structure

```
Backend/
├── config/
│   ├── db.js
│   └── resendEmail.js
├── controllers/
│   ├── authControllers.js
│   └── userControllers.js
├── middlewares/
│   ├── authenticateUser.js
│   ├── rateLimiter.js
│   ├── verifyLimiter.js
│   └── verifyUser.js
├── models/
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
├── server.js
├── .env
```

---

### 🔹5.2 -  Frontend Structure

```
Frontend/
auth/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── VerifyOtp.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetOTP.jsx
│   │   ├── NewPassword.jsx
│   │   ├── ChangePassword.jsx
│   │   ├── UserProfile.jsx
│   │   ├── Home.jsx
│   │   └── Notfound.jsx
│   ├── services/
│   │   ├── authApi.js
│   │   └── userApi.js
│   ├── App.jsx
│   ├── router.jsx
│   ├── main.jsx
│   └── index.css
```

---

## 🔐6 -  Authentication Flow

###   6.1 - Registration Flow

* User registers with email/password
* Server generates **short-lived verification token**
* OTP sent via email using Resend
* User verifies OTP → account activated

---

### 6.2 -  Login Flow

* User logs in with credentials
* Server issues **JWT token (HTTP-only cookie)**
* Token used to access protected routes

---

### 6.3 -   Protected User Access

* JWT verified via middleware
* User data fetched and displayed on Home/Profile page

---

### 6.4 -   Forgot Password Flow

* User requests password reset
* OTP sent to registered email
* OTP verified
* User sets new password

---

### 6.5 -   Password Management

* Change password (logged-in users)
* Reset password (forgot flow)
* Secure hashing with bcrypt

---

## ⚙️7 Installation & Setup

### 7.1 -  Clone Repository

```bash
git clone <repo-url>
cd project-folder
```

---

### 7.2 - Backend Setup

```bash
cd Backend
npm install
npm run dev
```

---

### 7.3 -  Frontend Setup

```bash
cd Frontend/auth
npm install
npm run dev
```

---

### 🔐 7.4 -  Environment Variables

Create a `.env` file in backend:

```
PORT=3000
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb+srv://fawadahmad0059_db_user:e74c487OnwFBuyFz@cluster0.no49d5r.mongodb.net/MERN_AUTH?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=wanindu Hasaranga
RESEND_API_KEY=re_4Fkp7rLv_2hThYHgWCFxgHJTJnh3Y4p17
NODE_ENV=development
SAME_SITE=lax


```

---



## 🧠 8 -  Key Learnings

* Implementing secure authentication architecture
* Working with JWT & HTTP-only cookies
* Email-based OTP verification system
* Backend security (rate limiting, middleware protection)
* Scalable React + Redux Toolkit integration
* Full-stack API communication flow

---

## 🚀 9 -  Future Improvements

* Deploy This Project for practice purposes
* OAuth login (Google / GitHub)


---

Made with ❤️ and dedication by **Fawad Ahmad**


🔗 LinkedIn:  [Connect with me](https://www.linkedin.com/in/fawad-ahmad-b9a286319/)

---

This project is open-source .


