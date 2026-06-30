# ⚡ Baileys Base — Profesional WhatsApp Bot Starter

<p align="center">
  <img src="https://raw.githubusercontent.com/rtwone/baileys-base/main/assets/banner.png" alt="Baileys Base" width="100%"/>
</p>

Baileys Base adalah starter kit ringan dan modular untuk membangun WhatsApp bot berbasis library Baileys. Dirancang untuk pengembangan cepat, struktur yang bersih, dan perluasan berbasis plugin sehingga Anda bisa fokus pada logika fitur tanpa mengulang boilerplate koneksi dan pengelolaan session.

- Bahasa utama: JavaScript (Node.js 18+)
- Tujuan: cepat membangun bot WA yang dapat diperluas, diuji, dan dijalankan di produksi

---

## Ringkasan fitur
- Koneksi Baileys yang stabil dan manajemen session otomatis
- Sistem perintah (commands) modular — tambahkan file per perintah
- Modul chat/handler terpisah untuk pipeline pesan (mis. AI responder)
- Utility umum di library (lib/) untuk pengiriman pesan, serialisasi, logging, dan helper
- Template untuk integrasi AI (contoh: modul gemini.js)

---

## Stack
- Language(s): JavaScript (Node.js 18+)
- Runtime: Node.js
- Notable libraries: Baileys (WhatsApp Web), plus util internal untuk sendMessage / serialize / database / gemini

---

## Struktur repo (top-level)
```text
.env                  # environment sample (sensitive values kept local)
config.js             # konfigurasi global
index.js              # entrypoint aplikasi (koneksi + bootstrap)
package.json          # dependensi & scripts
commands/             # perintah bot (plugins/commands)
  ├─ ping.js
  └─ menu.js
chats/                # pipeline chat handlers (contoh: AI responder)
  └─ ai.js
lib/                  # helper & utilities (sendMessage, serialize, db, logger, gemini, dll)
  ├─ Collection.js
  ├─ database.js
  ├─ functions.js
  ├─ gemini.js
  ├─ logger.js
  ├─ sendMessage.js
  └─ serialize.js
prompts/              # prompt templates (mis. chatbot.txt)
database/             # tempat file/adapter database (lokal/opsional)
events/               # event hooks
handlers/             # handler utilities / glue code
```

How it fits together:

- index.js bootstrap aplikasi dan membuka koneksi ke WhatsApp via Baileys.
- Saat pesan masuk, file di lib/ men-serialize payload, lalu dispatcher memanggil perintah dari commands/ atau handler di chats/ sesuai prioritas.
- Modul lib/sendMessage.js dan lib/serialize.js menyediakan API konsisten untuk mengirim dan memformat pesan.
- Integrasi AI (jika dikonfigurasi) di lib/gemini.js digunakan oleh handler AI di chats/ai.js.

---

## Quickstart — dari clone ke jalan
Prerequisites:

- Node.js 18+ (versi LTS direkomendasikan)
- Git

Langkah singkat:

```bash
git clone https://github.com/rtwone/baileys-base.git
cd baileys-base
npm install
```

Menjalankan:

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

Catatan: perintah di atas mengasumsikan skrip tersedia di package.json (cek dan sesuaikan bila perlu).

---

## Konfigurasi environment
Buat file `.env` di root (jangan commit nilai sensitif). Contoh variabel yang umum dipakai:

```env
# Contoh (isi sesuai kebutuhan)
NODE_ENV=development
PORT=3000
PREFIX=!               # prefix perintah (opsional)
GEMINI_API_KEY=your_api_key_here   # jika menggunakan modul gemini
SESSION_PATH=./auth    # tempat menyimpan session (pastikan folder ada)
```
Pastikan folder untuk session/auth tersedia dan dapat ditulis oleh proses Node.

---

## Menambah Perintah (Commands)
Perintah sederhana ditempatkan di folder `commands/` sebagai file modul ES:

```javascript
// commands/ping.js
export default {
  name: "ping",
  aliases: ["p"],
  category: "main",
  cooldown: 3,
  async execute({ m, sock }) {
    return m.reply("Pong!")
  }
}
```
- Fields umum: name, aliases, category, cooldown, execute
- execute menerima konteks pesan (mis. `m`) dan instance koneksi (`sock`)

---

## Handler Chat & AI
Folder `chats/` berisi handler pipeline, contoh `ai.js` memanggil fungsi helper `askGemini` dari `lib/gemini.js`. Gunakan `m.stop()` pada handler untuk menghentikan pipeline jika pesan sudah ditangani.

---

## Utilities & Helpers
- lib/functions.js — helper utilitas (format waktu, fetch, file JSON, dll.)
- lib/sendMessage.js — adapter pengiriman pesan agar code perintah konsisten
- lib/serialize.js — normalisasi pesan masuk agar mudah diproses per-command
- lib/database.js — adapter penyimpanan sederhana (file-based/opsional)

---

## Logging & Debugging
- lib/logger.js menangani format dan level log.
- Untuk debugging, jalankan dengan NODE_ENV=development dan periksa output terminal untuk QR code saat pertama kali koneksi.

---

## Deployment & Produksi
- Jalankan di proses manager (pm2/systemd) untuk memastikan otomatis restart.
- Pastikan session disimpan di lokasi yang persisten (bukan ephemeral container storage) jika ingin mempertahankan login.
- Backup session/auth file secara aman.

---

## Keamanan & Kebijakan penggunaan
- Proyek ini menggunakan WhatsApp Web API via Baileys — tidak ada afiliasi resmi dengan WhatsApp/Meta.
- Gunakan bot sesuai kebijakan WhatsApp dan hukum setempat. Hindari spam dan penggunaan otomatis yang melanggar ketentuan layanan.

---

## Kontribusi
1. Fork repo
2. Buat branch fitur: git checkout -b feat/namafitur
3. Tambah test / dokumentasi bila relevan
4. Buka Pull Request dengan deskripsi perubahan

Silakan buka issue untuk diskusi fitur atau bug sebelum implementasi besar.

---

## Lisensi
MIT © rtwone

---

## Kontak
Author: rtwone — https://github.com/rtwone
