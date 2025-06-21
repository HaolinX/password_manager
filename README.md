# Author

Built by **Haolin Xie** – a student developer

---

# Password Manager

A secure command-line password manager built with **Node.js** and **MySQL**, supporting admin authentication, encrypted storage, and optional guest access.

---

# Features

- **Admin authentication** using bcrypt-hashed password
- **AES-256 encryption** for storing viewable passwords securely
- **MySQL-based** credential storage with timestamps
- **Guest mode**: view records without seeing actual passwords
- **CRUD operations** (Add, View, Edit, Delete)
- Configurable via `.env` with security best practices

---

# Setup Instructions

### 1. 📦 Install Dependencies

```bash
npm install
```

### 2. 🧪 Configure Environment

Create a `.env` file using the provided `.env.example`:

```bash
cp .env.example .env
```

Then fill in:
- `ADMIN_HASH` → bcrypt hash of your chosen admin password
- `VIEW_KEY` → AES 256-bit hex key (64 characters)
- `DB_PASSWORD` → your MySQL password

### 3. 💾 Set up the Database

Login to MySQL and run:

```sql
SOURCE db/schema.sql;
```

Or manually:

```sql
CREATE DATABASE password_manager;
USE password_manager;
CREATE TABLE credentials (...); -- from schema.sql
```

### 4. ▶️ Run the App

```bash
node src/app.js
```

You'll be prompted as guest or admin.

---

# Security Notes

- All passwords are encrypted with **AES-256** for viewing, and **bcrypt-hashed** for login safety
- `.env` is **ignored from Git** via `.gitignore`
- Safe defaults for production and test use