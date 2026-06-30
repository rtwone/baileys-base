# ⚡ Baileys Base

<div align="center">

**Profesional WhatsApp Bot Starter Kit**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-100%25-f7df1e?logo=javascript)](https://www.javascript.com/)
[![Baileys](https://img.shields.io/badge/Baileys-WhatsApp%20API-25D366?logo=whatsapp)](https://github.com/WhiskeySockets/Baileys)

[🚀 Mulai Cepat](#-quickstart) • [📚 Dokumentasi](#-dokumentasi) • [🎯 Fitur](#-fitur) • [🤝 Kontribusi](#-kontribusi)

</div>

---

## 🎯 Fitur

✨ **Lightweight & Modular** — Struktur bersih, mudah diperluas  
🔌 **Plugin System** — Tambah command dan handler kapan saja  
🤖 **AI Integration** — Built-in support untuk Google Gemini  
📦 **Production Ready** — Session management & error handling otomatis  
🛠️ **Developer Friendly** — TypeScript-ready, hot reload support  
⚙️ **Configurable** — Environment-based configuration  

---

## 📋 Tech Stack

| Teknologi | Versi | Tujuan |
|-----------|-------|--------|
| **Node.js** | 18+ | Runtime |
| **Baileys** | Latest | WhatsApp Web API |
| **JavaScript** | ES2020+ | Language |
| **Google Gemini** | Optional | AI Responses |

---

## 📂 Struktur Proyek

```
baileys-base/
├── 📄 index.js              # Entry point aplikasi
├── 📄 config.js             # Konfigurasi global
├── 📄 package.json          # Dependencies
├── 📁 commands/             # 🔌 Command plugins
│   ├── ping.js
│   └── menu.js
├── 📁 chats/                # 💬 Chat handlers & pipeline
│   └── ai.js
├── 📁 lib/                  # 🛠️ Utilities & helpers
│   ├── Collection.js
│   ├── database.js
│   ├── functions.js
│   ├── gemini.js
│   ├── logger.js
│   ├── sendMessage.js
│   └── serialize.js
├── 📁 prompts/              # 📝 AI prompt templates
├── 📁 database/             # 💾 Data storage
├── 📁 events/               # 🎪 Event hooks
├── 📁 handlers/             # 🔄 Handler utilities
└── 📄 .env                  # Environment variables (git ignored)
```

### 🔄 Alur Kerja

```
Pesan Masuk
    ↓
lib/serialize.js (normalize payload)
    ↓
Command dispatcher (cek prefix & command)
    ↓
commands/ atau chats/ (execute handler)
    ↓
lib/sendMessage.js (kirim response)
    ↓
Pesan Keluar
```

---

## 🚀 Quickstart

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **Git** untuk clone repo
- **Koneksi Internet** stabil

### Setup (5 menit)

```bash
# 1️⃣ Clone repository
git clone https://github.com/rtwone/baileys-base.git
cd baileys-base

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment
cp .env.example .env
# Edit .env sesuai kebutuhan (lihat section berikutnya)

# 4️⃣ Jalankan
npm run dev
```

### Jalankan Aplikasi

**Development Mode** (dengan auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

---

## ⚙️ Konfigurasi Environment

Buat file `.env` di root directory:

```env
# Application
NODE_ENV=development
PORT=3000

# WhatsApp Bot
PREFIX=!
SESSION_PATH=./auth
SESSION_NAME=baileys

# AI (optional)
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-1.5-flash

# Database (optional)
DB_TYPE=file
DB_PATH=./database
```

> ⚠️ **Important**: Jangan commit `.env` ke git — file ini berisi secrets!

---

## 🔌 Membuat Command Baru

Commands disimpan di folder `commands/`. Buat file baru dengan struktur:

```javascript
// commands/hello.js
export default {
  name: "hello",
  aliases: ["hi", "hey"],
  category: "fun",
  cooldown: 5,
  description: "Ucapkan hello ke bot",
  
  async execute({ m, sock, args, prefix }) {
    const text = args.join(" ") || "World";
    return m.reply(`Hello ${text}! 👋`);
  }
}
```

**Opsi tersedia:**
- `name` (required) — Nama command
- `aliases` — Alias command lainnya
- `category` — Kategori command
- `cooldown` — Delay antar eksekusi (dalam detik)
- `description` — Deskripsi singkat
- `execute` — Fungsi handler

---

## 💬 Chat Handlers & AI

Handlers di `chats/` dijalankan untuk semua pesan sebelum command dispatcher:

```javascript
// chats/ai.js
import { askGemini } from "../lib/gemini.js";

export async function chatHandler(m, sock) {
  // Cek apakah ada prefix (jika ada, skip handler ini)
  if (m.text?.startsWith(m.prefix)) return;

  // Respons dengan AI jika diaktifkan
  const response = await askGemini(m.text);
  return m.reply(response);
}
```

Gunakan `m.stop()` untuk menghentikan pipeline.

---

## 🛠️ Built-in Utilities

### `lib/sendMessage.js`
Wrapper untuk mengirim pesan dengan berbagai tipe:
```javascript
m.reply(text)          // Reply text
m.send(text)           // Send message
m.react(emoji)         // React dengan emoji
m.edit(newText)        // Edit pesan
m.delete()             // Delete pesan
```

### `lib/serialize.js`
Normalisasi pesan masuk:
```javascript
m.text              // Teks pesan
m.sender            // ID pengirim
m.isGroup           // Apakah group chat
m.prefix            // Bot prefix
m.command           // Command yang digunakan
m.args              // Argumen command
m.quoted            // Pesan yang di-reply
```

### `lib/functions.js`
Helper utilities:
- `formatDate()` — Format tanggal
- `formatTime()` — Format waktu
- `delay()` — Sleep/delay
- `fetch()` — HTTP requests
- `randomChoice()` — Pilih random dari array

### `lib/database.js`
Penyimpanan data sederhana (file-based):
```javascript
db.set(key, value)
db.get(key)
db.delete(key)
db.all()
```

---

## 🤖 Integrasi AI (Google Gemini)

### Setup

1. Dapatkan API key dari [Google AI Studio](https://aistudio.google.com/apikey)
2. Masukkan ke `.env`:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. Gunakan di handler:
```javascript
import { askGemini } from "./lib/gemini.js";

const response = await askGemini("Your question here");
m.reply(response);
```

---

## 📊 Logging & Debugging

Logger tersedia di `lib/logger.js`:

```javascript
import logger from "./lib/logger.js";

logger.info("Bot started");
logger.warn("Low storage");
logger.error("Connection failed");
logger.debug("Payload:", payload);
```

**Tips debugging:**
- Jalankan dengan `NODE_ENV=development` untuk verbose logging
- Cek QR code di terminal saat pertama kali koneksi
- Monitor session file di folder `./auth`

---

## 🌐 Deployment

### Menggunakan PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start aplikasi
pm2 start index.js --name "baileys-bot"

# Setup auto-restart
pm2 startup
pm2 save

# Monitor
pm2 monit
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
CMD ["npm", "start"]
```

### Best Practices

✅ Simpan session di lokasi persistent  
✅ Backup auth folder secara berkala  
✅ Monitor resource usage  
✅ Setup proper error handling & logging  
✅ Gunakan environment variables untuk secrets  

---

## 🔒 Keamanan & Disclaimer

⚠️ **Important:**

- Proyek ini **tidak berafiliasi** dengan WhatsApp/Meta
- Penggunaan bot harus sesuai dengan [WhatsApp Terms of Service](https://www.whatsapp.com/legal)
- **Jangan** gunakan untuk spam atau aktivitas ilegal
- Tanggung jawab penggunaan ada di tangan Anda
- Selalu backup session file Anda

---

## 🤝 Kontribusi

Kami menerima kontribusi! Berikut cara berkontribusi:

1. **Fork** repository ini
2. **Buat branch** fitur: `git checkout -b feat/amazing-feature`
3. **Commit** perubahan: `git commit -m 'Add amazing feature'`
4. **Push** ke branch: `git push origin feat/amazing-feature`
5. **Buka Pull Request** dengan deskripsi detail

### Guidelines

- Follow code style yang ada
- Tambahkan comments untuk kode kompleks
- Test di development sebelum push
- Update dokumentasi jika diperlukan

---

## 📖 Dokumentasi Lengkap

| Topik | Link |
|-------|------|
| Command API | [commands/](./commands/) |
| Chat Handlers | [chats/](./chats/) |
| Utilities | [lib/](./lib/) |
| Examples | [examples/](./examples/) |

---

## 📝 Lisensi

```
MIT License © 2026 rtwone

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

Lihat file [LICENSE](./LICENSE) untuk detail lengkap.

---

## 💬 Hubungi Kami

| Platform | Link |
|----------|------|
| **GitHub** | [@rtwone](https://github.com/rtwone) |
| **Issues** | [Buka Issue](https://github.com/rtwone/baileys-base/issues) |
| **Discussions** | [Mulai Diskusi](https://github.com/rtwone/baileys-base/discussions) |

---

<div align="center">

**Made with ❤️ by [rtwone](https://github.com/rtwone)**

Jika proyek ini membantu Anda, jangan lupa ⭐ star repository ini!

</div>
