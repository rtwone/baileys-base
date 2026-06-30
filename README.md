# ⚡ Baileys Base

<p align="center">
  <img src="https://raw.githubusercontent.com/rtwone/baileys-base/main/assets/banner.png" width="100%" />
</p>

<p align="center">
  <b>Lightweight WhatsApp Bot Base using Baileys</b><br/>
  Build fast. Scale easy. Customize freely.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Baileys-WA%20API-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
</p>

---

## ✨ What is this?

**Baileys Base** is a clean starter template for building WhatsApp bots using the Baileys WebSocket library.

Built for:
- ⚡ Fast development
- 🧠 Clean architecture
- 🔥 Easy scaling
- 🧩 Plugin-based features

---

## 🚀 Why use this?

✔ No messy structure  
✔ Ready-to-use command system  
✔ Auto session management  
✔ Easy to extend  
✔ Production-ready base  

---

## 🧰 Tech Stack

- Node.js (18+)
- Baileys WhatsApp Web API
- JavaScript / TypeScript
- Event-driven architecture

---

## ⚙️ Installation

```bash
git clone https://github.com/rtwone/baileys-base.git
cd baileys-base
npm install
```

---

## 🚀 Run Bot

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

---

## 🔐 Login System

1. **Run bot untuk pertama kali**
2. **Scan QR Code di terminal**
3. **Session otomatis tersimpan di folder `auth/`**
4. **Tidak perlu login ulang selama session masih ada**

---

## 🧩 Create New Command

Tambahkan file di: `src/plugins/`

### Example Command
```javascript
export default {
  name: "ping",
  description: "Check bot response",

  execute: async ({ sock, m }) => {
    await sock.sendMessage(m.key.remoteJid!, {
      text: "🏓 Pong!"
    })
  }
}
```

---

## 💡 You Can Build

- 🔥 Auto responder bot
- 👥 Group management bot
- 📥 Downloader bot (YouTube, TikTok, IG)
- 🤖 AI chat bot
- 🛒 Store / payment bot
- ⏰ Reminder system

---

## ⚠️ Disclaimer

This project uses WhatsApp Web API via Baileys.

- Not affiliated with WhatsApp / Meta
- Use at your own risk
- Avoid spam or abuse

---

## ⭐ Support

If you like this project:

👉 Give a ⭐ on GitHub — it really helps!

---

## 👨‍💻 Author

**rtwone**  
GitHub: https://github.com/rtwone

---

## 📝 License

MIT License © rtwone
