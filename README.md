# Infokes Explorer Backend

Backend untuk aplikasi explorer file/folder menggunakan TypeScript, TypeORM, Elysia, dan MySQL.

## Prerequisites

Pastikan Anda memiliki yang berikut terinstall:
- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- [Bun](https://bun.sh/) (untuk runtime yang lebih cepat)
- [MySQL](https://www.mysql.com/) (database server)
- Git (untuk clone repository)

## Instalasi

1. Clone repository ini:
   ```bash
   git clone <url-repository>
   cd infokes-explorer-backend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Setup database:
   - Buat database MySQL baru (misalnya: `explorer_db`)
   - Salin file `.env.example` ke `.env` dan isi konfigurasi database:
     ```
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=explorer_db
     ```

## Build Proyek

Untuk mengkompilasi TypeScript ke JavaScript:
```bash
bun run build
```
File output akan ada di folder `dist/`.

## Menjalankan Proyek

### Development Mode
Jalankan server dengan hot-reload:
```bash
bun run dev
```
Server akan berjalan di `http://localhost:3000` (atau port yang dikonfigurasi).

### Production Mode
Jalankan server dari file yang sudah di-build:
```bash
bun run start
```

## Seeding Database

Untuk mengisi database dengan data sample, jalankan seeder:

```bash
bun run seed
```

Seeder akan menghapus data existing dan memasukkan folder dan file sample dengan struktur hierarki.

## Struktur Proyek

```
infokes-explorer-backend/
├── src/
│   ├── app.ts                 # Setup aplikasi utama
│   ├── server.ts              # Entry point server
│   ├── scripts/
│   │   └── seed.ts            # Script untuk seeding database
│   ├── config/
│   │   └── data-source.ts     # Konfigurasi TypeORM
│   ├── entities/              # Definisi entity database
│   │   ├── Folder.ts
│   │   └── FileEntry.ts
│   ├── controllers/           # Controller API
│   ├── routes/                # Definisi routes
│   ├── services/              # Business logic
│   └── repositories/          # Database queries
├── dist/                      # Output kompilasi
├── package.json
├── tsconfig.json
├── typeorm.config.js
└── README.md
```

## API Endpoints

Server berjalan di `http://localhost:3000` (atau port yang dikonfigurasi di `.env`).

### GET /folders
Mendapatkan semua folder dan semua file.

**Response:**
```json
{
  "data": {
    "folders": [...],
    "files": [...]
  }
}
```

### GET /folders/:id
Mendapatkan subfolder dari folder tertentu beserta files di dalamnya.

**Parameters:**
- `id` (string): UUID folder

**Response:**
```json
{
  "data": {
    "subfolders": [...],
    "filesInFolder": [...]
  }
}
```

### GET /folders_n_files/search?q=<query>
Mencari folder dan file berdasarkan nama (menggunakan LIKE query).

**Query Parameters:**
- `q` (string): Kata kunci pencarian

**Response:**
```json
{
  "data": {
    "folders": [...],
    "files": [...]
  }
}
```

### POST /folders/create
Membuat folder atau file baru.

**Body untuk Folder:**
```json
{
  "type": "folder",
  "name": "Nama Folder",
  "parent_id": "uuid-parent"  // optional
}
```

**Body untuk File:**
```json
{
  "type": "file",
  "name": "nama-file.ext",
  "folder_id": "uuid-folder",
  "size": 12345,              // optional
  "extension": "ext"          // optional
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid-generated",
    "name": "...",
    // ... other fields
    "created_at": "2025-12-14T...",
    "updated_at": "2025-12-14T..."
  }
}
```

### PUT /folders/update
Update folder atau file.

**Body untuk Folder:**
```json
{
  "type": "folder",
  "id": "uuid-folder",
  "name": "Nama Baru",        // optional
  "parent_id": "uuid-parent"  // optional
}
```

**Body untuk File:**
```json
{
  "type": "file",
  "id": "uuid-file",
  "name": "nama-baru.ext",    // optional
  "folder_id": "uuid-folder", // optional
  "size": 67890,              // optional
  "extension": "newext"       // optional
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    // ... updated fields
  }
}
```

### DELETE /folders/delete
Menghapus folder atau file.

**Body:**
```json
{
  "type": "folder",  // atau "file"
  "id": "uuid-item"
}
```

**Response:**
```json
{
  "success": true
}
```

### Contoh Penggunaan dengan curl

```bash
# Get all folders and files
curl http://localhost:3001/folders

# Get subfolders of a specific folder
curl http://localhost:3001/folders/6c1a8b8e-3d8f-4c7e-9f4a-6f7c3e5a91d2

# Search
curl "http://localhost:3001/folders_n_files/search?q=document"

# Create folder
curl -X POST http://localhost:3001/folders/create \
  -H "Content-Type: application/json" \
  -d '{"type": "folder", "name": "New Folder"}'

# Update folder
curl -X PUT http://localhost:3001/folders/update \
  -H "Content-Type: application/json" \
  -d '{"type": "folder", "id": "uuid", "name": "Updated Name"}'

# Delete folder
curl -X DELETE http://localhost:3001/folders/delete \
  -H "Content-Type: application/json" \
  -d '{"type": "folder", "id": "uuid"}'
```

## Troubleshooting

- Jika ada error `ERR_MODULE_NOT_FOUND`, pastikan Anda sudah menjalankan `bun run build`.
- Untuk masalah database, periksa koneksi di file `.env`.
- Jika migration gagal, pastikan schema database sesuai dengan entities.

## Contributing

1. Fork repository
2. Buat branch fitur baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## License

[MIT License](LICENSE)