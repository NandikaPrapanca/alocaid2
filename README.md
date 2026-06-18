# 👝 Aloca.id — Fullstack Financial Management App

> Aplikasi manajemen keuangan berbasis **sistem kantong** yang membantu kamu mengalokasikan uang secara terstruktur, memantau pemasukan & pengeluaran, serta mencapai target tabungan.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://mysql.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docker.com)

---

## Daftar Isi

1. [Fitur Utama](#fitur-utama)
2. [Architecture Overview](#architecture-overview)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Instalasi & Setup](#instalasi--setup)
   - [Opsi A — Docker (Disarankan)](#opsi-a--docker-disarankan)
   - [Opsi B — Manual (Tanpa Docker)](#opsi-b--manual-tanpa-docker)
6. [Menjalankan Aplikasi](#menjalankan-aplikasi)
7. [Akun & Role](#akun--role)
8. [API Endpoints](#api-endpoints)
9. [Struktur Project](#struktur-project)
10. [Troubleshooting](#troubleshooting)

---

## Fitur Utama

### 👤 User
| Fitur | Deskripsi |
|-------|-----------|
| **Autentikasi** | Register & login dengan JWT, session tersimpan di localStorage |
| **Dashboard** | Ringkasan total saldo, statistik pemasukan/pengeluaran, transaksi terbaru |
| **Kantong** | Buat beberapa kantong keuangan, set target tabungan (goal), lihat progress |
| **Pemasukan** | Catat uang masuk dengan kategori dan tanggal |
| **Pengeluaran** | Catat uang keluar dengan validasi saldo |
| **Transfer** | Pindah saldo antar kantong dengan pencatatan otomatis |
| **Riwayat** | Lihat log transaksi dengan filter dan pagination |
| **Profil** | Kelola informasi akun |

### 🛡️ Admin
| Fitur | Deskripsi |
|-------|-----------|
| **Dashboard Statistik** | Total user, total transaksi, nominal per tipe, jumlah kategori |
| **Kategori Pemasukan** | CRUD kategori beserta upload icon (PNG/JPG/SVG) |
| **Kategori Pengeluaran** | CRUD kategori beserta upload icon (PNG/JPG/SVG) |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser User                         │
└──────────────────────────┬──────────────────────────────────┘
                           │  HTTP Request
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND  (React + Vite)                       │
│              http://localhost:5173                          │
│                                                             │
│  ┌─────────────────┐   ┌──────────────┐   ┌─────────────┐  │
│  │  AuthContext    │   │  Services.js │   │   Pages     │  │
│  │  (JWT & state)  │◄──│  (API calls) │◄──│  (UI layer) │  │
│  └─────────────────┘   └──────┬───────┘   └─────────────┘  │
└─────────────────────────────┼────────────────────────────── ┘
                              │  REST API (JSON)
                              │  Authorization: Bearer <token>
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND  (Node.js + Express)                   │
│              http://localhost:3000                          │
│                                                             │
│  Routes → Middleware (JWT + Role) → Controllers → DB Pool   │
│                                                             │
│  /api/auth        /api/kantong     /api/transaksi           │
│  /api/kategori    /api/admin                                │
└──────────────────────────┬──────────────────────────────────┘
                           │  mysql2 (connection pool)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              DATABASE  (MySQL 8.0)                          │
│              localhost:3306                                 │
│                                                             │
│  users   kantong   saldo   log_transaksi                    │
│  kategori_pemasukan   kategori_pengeluaran                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Lapisan | Teknologi | Versi |
|---------|-----------|-------|
| **Frontend** | React, React Router DOM, Tailwind CSS | React 19, RR 7 |
| **Build Tool** | Vite | v8 |
| **UI Icons** | Lucide React | Latest |
| **Notifikasi** | React Hot Toast | v2 |
| **Backend** | Node.js, Express.js | Express 4 |
| **Database** | MySQL | 8.0 |
| **ORM/Driver** | mysql2 (connection pool) | v3 |
| **Auth** | JWT (jsonwebtoken) + bcryptjs | — |
| **Upload** | Multer | v2 |
| **Container** | Docker, Docker Compose | — |

---

## Prerequisites

Pastikan salah satu dari setup berikut tersedia di komputermu:

**Untuk Opsi A (Docker):**
- [Docker Desktop](https://www.docker.com/products/docker-desktop) — Latest

**Untuk Opsi B (Manual):**
- [Node.js](https://nodejs.org) v18+
- [MySQL Server](https://www.mysql.com) 8.0
- [Git](https://git-scm.com)

---

## Instalasi & Setup

### Opsi A — Docker (Disarankan)

Cara tercepat. Satu perintah untuk menjalankan MySQL, Backend, dan phpMyAdmin sekaligus.

#### 1. Clone Repository

```bash
git clone https://github.com/NandikaPrapanca/alocaid2.git
cd alocaid2
```

#### 2. Jalankan Semua Service

```bash
cd Aloca-Backend
docker compose up -d --build
```

Docker akan otomatis:
- ✅ Menjalankan **MySQL 8.0** di port `3306`
- ✅ Menjalankan **Express Backend** di port `3000`
- ✅ Menjalankan **phpMyAdmin** di port `8080`
- ✅ Menjalankan **semua migrasi SQL** secara otomatis

Verifikasi semua container berjalan:

```bash
docker compose ps
```

Output yang diharapkan:
```
NAME                    STATUS
aloca_mysql_db          running
aloca_express_backend   running
aloca_phpmyadmin        running
```

Cek backend aktif:
```bash
curl http://localhost:3000/api/health
# atau buka di browser: http://localhost:3000/api/health
```

#### 3. Install & Jalankan Frontend

```bash
# Di terminal baru, dari root directory
cd Aloca-Frontend
npm install
npm run dev
```

Buka `http://localhost:5173` di browser. ✅ Selesai!

---

### Opsi B — Manual (Tanpa Docker)

#### Langkah 1 — Clone Repository

```bash
git clone <url-repository>
cd alocaid2
```

#### Langkah 2 — Setup Database MySQL

Login ke MySQL dan jalankan perintah berikut:

```sql
CREATE DATABASE aloca_management_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER 'aloca_user'@'localhost' IDENTIFIED BY 'aloca_password_123';

GRANT ALL PRIVILEGES ON aloca_management_db.* TO 'aloca_user'@'localhost';

FLUSH PRIVILEGES;
```

#### Langkah 3 — Migrasi Tabel Database

Jalankan file SQL berikut **secara berurutan** (urutan penting karena ada foreign key):

```bash
cd Aloca-Backend

mysql -u aloca_user -p aloca_management_db < migrate/001_create_users_table.sql
mysql -u aloca_user -p aloca_management_db < migrate/002_create_kategori_tables.sql
mysql -u aloca_user -p aloca_management_db < migrate/003_create_kantong_table.sql
mysql -u aloca_user -p aloca_management_db < migrate/004_create_saldo_table.sql
mysql -u aloca_user -p aloca_management_db < migrate/005_create_log_transaksi_table.sql
mysql -u aloca_user -p aloca_management_db < migrate/006_seed_users.sql
mysql -u aloca_user -p aloca_management_db < migrate/007_seed_kategori.sql
```

Tabel yang terbentuk:

```
users                 → data akun & role
kategori_pemasukan    → kategori uang masuk (admin)
kategori_pengeluaran  → kategori uang keluar (admin)
kantong               → kantong keuangan per user
saldo                 → saldo terkini per kantong (1:1)
log_transaksi         → semua history transaksi
```

> **File 006 & 007 adalah seed data** — berisi data demo siap pakai (3 akun + 7 kategori).
> Aman dijalankan ulang karena menggunakan `INSERT IGNORE`.

#### Langkah 4 — Konfigurasi Backend (.env)

```bash
cd Aloca-Backend
cp .env.example .env
```

Buka `.env` dan isi nilainya:

```env
# ── Server ────────────────────────────────────
PORT=3000
NODE_ENV=development

# ── Database ──────────────────────────────────
DB_HOST=localhost
DB_PORT=3306
DB_USER=aloca_user
DB_PASSWORD=aloca_password_123
DB_NAME=aloca_management_db

# ── JWT ───────────────────────────────────────
# WAJIB diganti! Gunakan string acak yang panjang.
# Generate dengan: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=ganti_dengan_string_sangat_panjang_dan_acak_minimal_32_karakter
JWT_EXPIRES_IN=7d

# ── CORS ──────────────────────────────────────
# Saat development, biarkan * atau isi dengan URL frontend
CORS_ORIGIN=http://localhost:5173
```

> ⚠️ **Jangan commit file `.env`** ke repository. File ini sudah ada di `.gitignore`.

#### Langkah 5 — Install & Jalankan Backend

```bash
cd Aloca-Backend
npm install
npm run dev
```

Backend berjalan di `http://localhost:3000`.

#### Langkah 6 — Konfigurasi & Jalankan Frontend

Secara default frontend sudah mengarah ke `http://localhost:3000`. Jika port berbeda, edit dua baris ini:

**`Aloca-Frontend/src/context/AuthContext.jsx`** baris 5:
```js
const API_URL = "http://localhost:3000/api";
```

**`Aloca-Frontend/src/services/Services.js`** baris 1:
```js
const API_URL = "http://localhost:3000/api";
```

Kemudian jalankan frontend:

```bash
cd Aloca-Frontend
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`. ✅ Selesai!

---

## Menjalankan Aplikasi

### Menggunakan Docker (setelah setup awal)

```bash
# Dari folder Aloca-Backend
cd Aloca-Backend

# Start semua service
docker compose up -d

# Stop semua service
docker compose down

# Rebuild setelah ada perubahan kode backend
docker compose build --no-cache aloca-backend
docker compose up -d --force-recreate aloca-backend
```

### Tanpa Docker

Buka **dua terminal terpisah**:

```bash
# Terminal 1 — Backend
cd Aloca-Backend
npm run dev
# → http://localhost:3000

# Terminal 2 — Frontend
cd Aloca-Frontend
npm run dev
# → http://localhost:5173
```

### Ringkasan Port

| Service | Port | URL |
|---------|------|-----|
| Frontend (Vite) | `5173` | http://localhost:5173 |
| Backend (Express) | `3000` | http://localhost:3000 |
| MySQL | `3306` | `mysql://localhost:3306` |
| phpMyAdmin | `8080` | http://localhost:8080 (Docker only) |

---

## Akun & Role

### Register Akun Baru

Buka `http://localhost:5173/register` dan isi form. Akun baru otomatis mendapat role `user`.

Saat register berhasil, backend otomatis membuat:
- Satu kantong bernama **"Utama"** dengan saldo Rp 0
- Record saldo terkait

### Akun Demo (Seed)

Setelah menjalankan file migrasi seed, database sudah memiliki **3 akun demo siap pakai**:

| Email | Password | Role | Keterangan |
|-------|----------|------|------------|
| `admin@aloca.id` | `password123` | `admin` | Akses penuh termasuk panel admin |
| `user1@aloca.id` | `password123` | `user` | Akun user biasa |
| `user2@aloca.id` | `password123` | `user` | Akun user biasa |

Setiap akun demo sudah memiliki kantong **"Utama"** dengan saldo Rp 0 yang siap digunakan.

Kategori transaksi berikut juga sudah tersedia secara otomatis:

| Kategori Pemasukan | Kategori Pengeluaran |
|-------------------|---------------------|
| Gaji | Makan |
| Bonus | Transportasi |
| Freelance | Belanja |
| — | Listrik/Air |

### Membuat Akun Admin

Setelah register normal, update role via MySQL:

```sql
UPDATE users SET role = 'admin' WHERE email = 'email_kamu@example.com';
```

Kemudian **logout dan login ulang** agar JWT token baru menyertakan role `admin`.

Akses panel admin di `http://localhost:5173/admin`.

---

## API Endpoints

### Publik (tanpa autentikasi)

```
POST  /api/auth/register    → Daftar akun baru
POST  /api/auth/login       → Login, mendapat JWT token
GET   /api/health           → Cek status server
```

### User (butuh header `Authorization: Bearer <token>`)

```
# Kantong
GET    /api/kantong           → Semua kantong + saldo terkini
POST   /api/kantong           → Buat kantong baru
PUT    /api/kantong/:id       → Edit nama/deskripsi/goal
DELETE /api/kantong/:id       → Hapus kantong (non-default)

# Transaksi
GET    /api/transaksi              → Riwayat (params: limit, offset, kantong_id, tipe)
POST   /api/transaksi/pemasukan    → Catat pemasukan
POST   /api/transaksi/pengeluaran  → Catat pengeluaran (cek saldo)
POST   /api/transaksi/pindah-saldo → Transfer antar kantong

# Kategori (read-only untuk user)
GET    /api/kategori/pemasukan     → Daftar kategori pemasukan
GET    /api/kategori/pengeluaran   → Daftar kategori pengeluaran
```

### Admin (butuh role `admin`)

```
# Kategori Pemasukan
POST   /api/kategori/pemasukan        → Buat kategori + upload icon
PUT    /api/kategori/pemasukan/:id    → Edit kategori
DELETE /api/kategori/pemasukan/:id    → Hapus kategori

# Kategori Pengeluaran
POST   /api/kategori/pengeluaran        → Buat kategori + upload icon
PUT    /api/kategori/pengeluaran/:id    → Edit kategori
DELETE /api/kategori/pengeluaran/:id    → Hapus kategori

# Statistik
GET    /api/admin/stats    → Total user, transaksi, nominal per tipe
```

### Format Response Standar

```json
{
  "status": "success",
  "message": "Deskripsi aksi",
  "data": { }
}
```

```json
{
  "status": "error",
  "message": "Pesan error",
  "statusCode": 400
}
```

---

## Struktur Project

```
alocaid2/                          ← Root repository
│
├── README.md                      ← File ini
│
├── Aloca-Backend/                 ← REST API (Node.js + Express)
│   ├── migrate/                   ← File SQL (jalankan urut 001→007)
│   │   ├── 001_create_users_table.sql
│   │   ├── 002_create_kategori_tables.sql
│   │   ├── 003_create_kantong_table.sql
│   │   ├── 004_create_saldo_table.sql
│   │   ├── 005_create_log_transaksi_table.sql
│   │   ├── 006_seed_users.sql          ← Seed: 3 akun demo
│   │   └── 007_seed_kategori.sql       ← Seed: 7 kategori transaksi
│   │
│   ├── src/
│   │   ├── app.js                 ← Entry point Express
│   │   ├── config/
│   │   │   ├── database.js        ← MySQL connection pool
│   │   │   └── multer.js          ← Upload file handler
│   │   ├── controllers/           ← Logic bisnis per fitur
│   │   │   ├── authController.js
│   │   │   ├── kantongController.js
│   │   │   ├── transaksiController.js
│   │   │   ├── kategoriController.js
│   │   │   └── adminController.js
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js  ← verifyToken + verifyAdmin
│   │   │   └── errorHandler.js
│   │   ├── routes/                ← Definisi endpoint
│   │   │   ├── index.js
│   │   │   ├── auth.routes.js
│   │   │   ├── kantong.routes.js
│   │   │   ├── transaksi.routes.js
│   │   │   ├── kategori.routes.js
│   │   │   └── admin.routes.js
│   │   └── utils/
│   │       └── responseHelper.js  ← Format response standar
│   │
│   ├── uploads/icons/             ← Icon kategori (auto-generated)
│   ├── .env                       ← Konfigurasi lokal (jangan di-commit!)
│   ├── .env.example               ← Template konfigurasi
│   ├── docker-compose.yml         ← MySQL + Backend + phpMyAdmin
│   ├── Dockerfile
│   └── package.json
│
└── Aloca-Frontend/                ← UI (React + Vite + Tailwind)
    ├── src/
    │   ├── App.jsx                ← Root routing & layout
    │   ├── main.jsx               ← Entry point React
    │   │
    │   ├── context/
    │   │   └── AuthContext.jsx    ← State global: user, login, logout, register
    │   │
    │   ├── services/
    │   │   └── Services.js        ← Semua fungsi API call (fetchWithAuth)
    │   │
    │   ├── components/
    │   │   ├── layouts/
    │   │   │   ├── AppLayout.jsx       ← Layout utama + proteksi rute
    │   │   │   ├── Sidebar.jsx         ← Navigasi desktop
    │   │   │   ├── DesktopHeader.jsx   ← Header desktop
    │   │   │   └── BottomNav.jsx       ← Navigasi mobile
    │   │   ├── ui/                     ← Komponen UI reusable
    │   │   │   ├── Button.jsx
    │   │   │   ├── Card.jsx
    │   │   │   ├── Input.jsx
    │   │   │   ├── Modal.jsx
    │   │   │   ├── Badge.jsx
    │   │   │   └── LoadingSpinner.jsx
    │   │   └── ProtectedRoute.jsx      ← Guard rute privat
    │   │
    │   ├── pages/
    │   │   ├── auth/
    │   │   │   ├── LoginPage.jsx
    │   │   │   └── RegisterPage.jsx
    │   │   ├── user/
    │   │   │   ├── BerandaPage.jsx     ← Dashboard
    │   │   │   ├── TransaksiPage.jsx   ← Input & riwayat transaksi
    │   │   │   ├── KantongPage.jsx     ← Manajemen kantong
    │   │   │   └── ProfilPage.jsx      ← Profil & logout
    │   │   └── admin/
    │   │       └── AdminPage.jsx       ← Statistik & manajemen kategori
    │   │
    │   └── utils/
    │       └── format.js              ← formatRupiah, formatDate, formatDateTime
    │
    ├── public/
    └── package.json
```

---

## Troubleshooting

### Backend tidak bisa start

| Gejala | Penyebab | Solusi |
|--------|----------|--------|
| `ECONNREFUSED 3306` | MySQL belum jalan | `docker compose up -d aloca-db` atau start MySQL service |
| `ER_ACCESS_DENIED_ERROR` | Kredensial DB salah | Cek `DB_USER` dan `DB_PASSWORD` di `.env` |
| `Error: JWT_SECRET not set` | File `.env` belum dibuat | `cp .env.example .env` lalu isi `JWT_SECRET` |

### Error di Browser (DevTools → Network)

| Status | Endpoint | Penyebab | Solusi |
|--------|----------|----------|--------|
| `404` | `/api/auth/login` | Instance backend lama masih jalan | Matikan proses node lama, restart backend |
| `401` | Endpoint apapun | Token expired atau tidak ada | Logout dan login ulang |
| `403` | `/api/admin/*` | Role bukan `admin` | Update role di DB, login ulang |
| `CORS error` | Semua endpoint | URL frontend tidak diizinkan | Set `CORS_ORIGIN=http://localhost:5173` di `.env` |

### Halaman Putih / Infinite Loading

```js
// Buka DevTools → Console, jalankan:
localStorage.clear();
// Lalu refresh halaman (Ctrl+R)
```

Ini membersihkan token lama yang mungkin korup.

### Login Berhasil tapi Langsung Balik ke /login

Token lama di localStorage mungkin menyimpan `role: 'user'` padahal di DB sudah `admin`. Solusi:

```js
// DevTools → Console
localStorage.removeItem('aloca_token');
localStorage.removeItem('aloca_user');
// Lalu login ulang
```

### Docker — Perubahan Kode Tidak Ter-apply

```bash
cd Aloca-Backend
docker compose build --no-cache aloca-backend
docker compose up -d --force-recreate aloca-backend
```

### Cek Log Container

```bash
# Log backend real-time
docker compose logs aloca-backend -f

# Log semua service
docker compose logs -f
```

---

## Kontribusi

1. Fork repository ini
2. Buat branch fitur: `git checkout -b feat/nama-fitur`
3. Commit perubahan: `git commit -m "feat: deskripsi singkat"`
4. Push ke branch: `git push origin feat/nama-fitur`
5. Buat Pull Request

### Konvensi Commit

```
feat:     Fitur baru
fix:      Perbaikan bug
docs:     Perubahan dokumentasi
style:    Perubahan format/style (bukan logika)
refactor: Refactoring kode
```

---

<div align="center">
  <p>Dibuat untuk tugas <strong>Perancangan Sistem Digital — Semester 6</strong></p>
  <p>👝 <strong>Aloca.id</strong> — Kelola keuanganmu dengan lebih cerdas</p>
</div>
