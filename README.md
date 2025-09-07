# NexChat 💬

NexChat is a modern, full-stack real-time chat application designed for seamless, secure, and fun conversations. Built with the latest web technologies, NexChat offers a beautiful, responsive interface and robust backend, making it perfect for friends, teams, or communities who want to stay connected.

## 🚀 Features

- 🔒 User authentication (signup, login, logout)
- 🟢 Online/offline user status
- 💬 Real-time 1:1 chat
- 🖼️ Image sharing with preview & download
- 📱 Responsive design (mobile & desktop)
- 🧑‍🤝‍🧑 Sidebar with online users first
- 🕵️‍♂️ Profile pictures & user info
- 🕓 Message timestamps
- 🖱️ Click-to-enlarge images (lightbox)
- 📥 Download images
- 🌙 Dark mode (with DaisyUI)
- ⚡ Fast, modern UI (Vite + Tailwind + DaisyUI)

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Zustand, Tailwind CSS, DaisyUI, Lucide Icons
- **Backend:** Express.js, MongoDB (Mongoose), Socket.io, Cloudinary (for image uploads)

## 📦 Folder Structure

```
NexChat/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── page/
│   │   ├── store/
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## �️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/NexChat.git
cd NexChat
```

### 2. Setup the backend

```bash
cd backend
npm install
# Create a .env file with your MongoDB URI, JWT secret, and Cloudinary keys
npm run dev
```

### 3. Setup the frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Open in your browser

Go to [http://localhost:5173](http://localhost:5173)

## ✨ Usage

- Sign up or log in
- See who's online in the sidebar
- Click a user to start chatting
- Send text or images (click images to enlarge or download)
- Enjoy real-time updates!

## 📝 Environment Variables

Backend `.env` example:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

MIT

---

Made with ❤️ for chat lovers!
