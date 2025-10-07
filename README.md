# Quick-Chat

Quick-Chat is a simple, real-time messaging app built mainly with JavaScript. It’s designed to get you chatting with friends or teammates in seconds, with minimal setup and a clean interface. Perfect for quick projects, events, or learning how chat apps work.

---

## Features

- **Instant Messaging:** Chat in real time with others.
- **Minimal UI:** Clean, user-friendly interface.
- **Quick Start:** Just clone, install, and run—no fuss.
- **Cross-Browser:** Works in all modern browsers.

---

## Project Structure

```text
Quick-Chat/
├── public/              # Static files (HTML, CSS, images)
├── src/                 # Main JavaScript code (UI, logic)
│   ├── components/      # Reusable UI components
│   ├── utils/           # Helper functions
│   └── ...              # App logic and more
├── package.json         # App dependencies and scripts
└── README.md            # Project info (this file)
```

---

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node)

---

## Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/Honey-pg/Quick-Chat.git
    cd Quick-Chat
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Start the app**
    ```bash
    npm start
    ```

4. **Open in your browser**
    - Visit [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

---

## Usage

- Enter your name or nickname and join the chat.
- Start sending messages instantly.
- No extra configuration needed.

---

## Configuration

If you want to change the server port or add environment variables, check for a `.env` or config section in the code.  
Typical options include:
- `PORT` (default: 3000)

---

## Troubleshooting

- **Port Already in Use:** Change the port or close other apps using the same port.
- **Can't Connect?**: Make sure Node.js is installed and you ran `npm install`.

---

## Contributing

Found a bug or want to add a feature?  
1. Fork the repo  
2. Make a new branch  
3. Commit your changes  
4. Open a pull request  
Suggestions and improvements are always welcome!

---

## License

This project is currently unlicensed.  
If you plan to open-source or distribute it, please add a license file.

---

Happy chatting!
