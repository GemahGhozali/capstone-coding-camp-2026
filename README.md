# Capstone Coding Camp 2026

## Overview Project

**EssayGrader** adalah aplikasi web yang dirancang untuk membantu pendidik dalam mengoreksi jawaban essay siswa secara otomatis dengan bantuan teknologi AI. Dengan EssayGrader, proses koreksi yang biasanya memakan waktu berjam-jam dapat diselesaikan hanya dalam hitungan detik.

## Fitur Utama

- **Koreksi Essay Otomatis :** Input soal, referensi jawaban, dan jawaban siswa, lalu biarkan AI yang mengoreksi
- **Analisis Kemiripan :** Mengukur tingkat kemiripan jawaban siswa dengan referensi jawaban menggunakan model NLP
- **Skor Penilaian :** Memberikan skor akhir (0 - 100) dengan kategori relevansi: Sangat Relevan, Cukup Relevan, dan Kurang Relevan
- **Skor Kemiripan :** Menampilkan persentase (0 - 100%) kemiripan jawaban siswa dengan referensi jawaban
- **Feedback Naratif :** Menghasilkan feedback evaluasi yang detail dan konstruktif dalam Bahasa Indonesia
- **Multiple Referensi Jawaban :** Mendukung lebih dari satu referensi jawaban untuk penilaian yang lebih akurat
- **Riwayat Koreksi :** Menyimpan semua hasil koreksi secara otomatis dan dapat diakses kapan saja
- **Koreksi Ulang :** Memungkinkan pengguna mengedit dan mengoreksi ulang essay yang sudah pernah dikoreksi
- **Filter dan Pencarian :** Memudahkan pencarian riwayat koreksi berdasarkan kata kunci atau kategori nilai

## Panduan Setup Aplikasi Secara Local

### 1. Requirements

Pastikan sistem anda sudah terinstall :

- GIT
- Node.js
- NPM
- PostgreSQL

### 2. Clone Repository

```bash
git clone https://github.com/GemahGhozali/capstone-coding-camp-2026.git
```

Struktur folder aplikasi akan memiliki hierarki seperti ini :6

```
capstone-coding-camp-2026/
├── client/
├── server/
└── README.md
```

---

### 3. Setup Backend (Server)

#### 3.1 Masuk Ke Directory `server`

```bash
cd server
```

#### 3.2 Install Dependencies

```bash
npm install
```

#### 3.3 Setup Environment Variables

Buat `.env` didalam folder `server`, lalu sesuaikan isinya dengan sesuai dengan contoh pada file `.env.example` :

```env
NODE_ENV=development
HOST=localhost
PORT=3000
CLIENT_URL=http://localhost:5173
AI_MODEL_REST_API_URL=https://alfikrah-essay-grader-api.hf.space
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database_name]?schema=public"
JWT_ACCESS_TOKEN_SECRET=your_jwt_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_jwt_refresh_token_secret
GROQ_API_KEY=your_groq_api_key
```

Untuk variable `DATABASE_URL`, `JWT_ACCESS_TOKEN_SECRET`, `JWT_ACCESS_TOKEN_SECRET` dan `GROQ_API_KEY` bisa disesuaikan masing-masing

#### 3.4 Setup Prisma

Sebelum setup Prisma, pastikan database PostgreSQL di sistem local anda sudah dijalankan.

##### Jalankan Migration

```bash
npx prisma migrate dev
```

##### Generate Prisma Client

```bash
npx prisma generate
```

#### 3.5 Jalankan RESTful API

```bash
npm run dev
```

Server akan berjalan di :

```text
http://localhost:3000
```

---

### 4. Setup Frontend (Client)

#### 4.1 Masuk Ke Directory `client`

```bash
cd client
```

#### 4.2 Install Dependencies

```bash
npm install
```

#### 4.3 Setup Environment Variables

Buat `.env` didalam folder `client`, lalu sesuaikan isinya dengan sesuai dengan contoh pada file `.env.example` :

```env
VITE_API_BASE_URL=http://localhost:3000
```

#### 4.4 Jalankan Aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di :

```text
http://localhost:5173
```

---

### Link Terkait :

- **Link Deployment Aplikasi :** https://essaygrader-sand.vercel.app/
- **Link Deployment RESTful API :** https://essaygrader-restful-api.onrender.com/
- **Link Deployment RESTful API Model AI :** https://alfikrah-essay-grader-api.hf.space/
- **Link Source Code Training :** https://colab.research.google.com/drive/1-2b1Mnk86EcNw5AkoVOjcFYMHe71dj8G
- **Link Model Machine Learning :** https://drive.google.com/drive/folders/1TaLjUGhX1D170qUdwtNDVptjhOeAIfui
- **Link Source Code Machine Learning :** https://drive.google.com/drive/folders/1k2LNz5i5in3iGWv7ODXg6ZiPbK3IyhtI?usp=drive_link
