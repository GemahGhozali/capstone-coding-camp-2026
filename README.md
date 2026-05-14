# Capstone Coding Camp 2026

Pastikan sistem anda sudah terinstall :

- Node.js
- NPM
- PostgreSQL

---

## Setup Backend (Server)

### 1. Masuk Ke Directory `server`

```bash
cd server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env` didalam folder `server`, lalu sesuaikan isinya dengan contoh berikut :

```env
NODE_ENV=development
HOST=localhost
PORT=3000
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://user:password@localhost:5432/database_name
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Untuk variable `DATABASE_URL`, `JWT_ACCESS_TOKEN_SECRET`, dan `JWT_REFRESH_TOKEN_SECRET` bisa disesuaikan masing-masing

### 4. Setup Prisma

Sebelum setup Prisma, pastikan database PostgreSQL di sistem local anda sudah dijalankan.

#### Jalankan Migration

```bash
npx prisma migrate dev
```

#### Generate Prisma Client

```bash
npx prisma generate
```

### 5. Jalankan RESTful API

```bash
npm run dev
```

Server akan berjalan di :

```text
http://localhost:3000
```

---

## Setup Frontend (Client)

### 1. Masuk Ke Directory `client`

```bash
cd client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env` didalam folder `client`, lalu sesuaikan isinya dengan contoh berikut :

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Jalankan Aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di :

```text
http://localhost:5173
```
