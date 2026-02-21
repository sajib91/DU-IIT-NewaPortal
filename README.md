 <img width="1500" height="1000" alt="image" src="https://github.com/user-attachments/assets/a93868d7-27e2-4c12-bed9-831c17ced77c" />

 <img width="1500" height="1000" alt="image" src="https://github.com/user-attachments/assets/a884e9fc-5ba3-4efe-960e-a7bf6260c4ee" />

 <img width="1500" height="1000" alt="image" src="https://github.com/user-attachments/assets/3cf1ef6b-9c22-44e7-8625-d44a155de9d1" />

 <img width="1500" height="1000" alt="image" src="https://github.com/user-attachments/assets/cef6ed2f-6396-42d9-9931-d9998db8a34d" />



## 🚀 Tech Stack

**Frontend:**
* HTML5 & CSS3 (Custom CSS Grid/Flexbox UI)
* Vanilla JavaScript (ES6+)
* Fetch API for backend communication

**Backend:**
* Node.js & Express.js
* PostgreSQL (Database)
* Prisma ORM (v6)
* JSON Web Tokens (JWT) for secure authentication
* bcrypt (Password hashing)
* express-validator (Data validation)

## ✨ Features

* **Public News Feed:** Beautiful, responsive grid displaying published articles with images, categories, and author details.
* **Admin Dashboard:** Protected route for authorized personnel to draft and publish new content.
* **Authentication:** Secure login portal with token-based session management.
* **RESTful API:** Modular backend architecture following the MVC (Model-View-Controller) pattern.

---

## 📂 Project Structure

This repository is divided into two main parts:

* `/newsportal-frontend`: The user interface (HTML, CSS, JS).
* `/newsportal-backend`: The API server, database configuration, and business logic.

---

## 🛠️ Installation & Local Setup

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/)

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd newsportal-backend

```

Install the dependencies:

```bash
npm install

```

Set up your Environment Variables:
Create a `.env` file in the `newsportal-backend` folder and add your local configuration. Note that the server runs on port 5001 to avoid conflicts with macOS AirPlay.

```env
PORT=5001
DATABASE_URL="postgresql://YOUR_USERNAME@localhost:5432/newsportal"
JWT_SECRET="your_super_secret_jwt_key"

```

Initialize the database and run migrations:

```bash
npx prisma migrate dev --name init_schema

```

Seed the database with default categories and the admin user:

```bash
npx prisma db seed

```

*(Default Admin Credentials - Email: admin@newsportal.com | Password: admin123)*

Start the development server:

```bash
npm run dev

```

### 2. Frontend Setup

The frontend does not require a local server to run the basics.

1. Open the `/newsportal-frontend` folder.
2. Ensure your backend server is actively running in the background.
3. Double-click the `index.html` file to open it in your web browser, or use an extension like VS Code Live Server.

---



