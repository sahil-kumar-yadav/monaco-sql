# 🏗️ Monaco-SQL Playground

A **client-side SQL playground** built with **Monaco Editor**, **sql.js (SQLite WASM)**, **Chakra UI v3**, and **Next.js 15**.  
Run SQL queries directly in your browser with a modern, responsive interface — no backend required!

---

## ✨ Features

- 🎨 **Monaco Editor** with SQL syntax highlighting, autocomplete, and error markers.
- 🗄️ **In-memory SQLite database** powered by `sql.js` (WASM).
- 👥 Preloaded **sample `users` table** for quick experimentation.
- ▶️ **Execute SQL queries** with instant results displayed in a styled table.
- 🔔 **Toast notifications** for query success, warnings, and errors.
- 🌗 **Light/Dark theme toggle** with Chakra UI v3 color mode support.
- 📱 **Responsive design** for desktop, tablet, and mobile.
- 📝 **Editable schema**: Create, drop, and modify tables on the fly.
- 💾 **Export/Import database** as `.sql` or `.json` files.
- ⌨️ **Keyboard shortcuts**:
  - `Ctrl + Enter` → Run query
  - `Ctrl + S` → Save database snapshot
- 🧩 **Extensible architecture**: Easily add new sample tables or seed data.
- 🔍 **Query history**: View and re-run your past queries.
- 📊 **Aggregations & analytics**: Try advanced SQL functions like `AVG`, `COUNT`, `GROUP BY`.

---

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🖥️ Usage

- Edit SQL in the Monaco editor (default: `SELECT * FROM users;`).
- Click **Run Query** or press `Ctrl + Enter`.
- View results in the table below.
- Try queries like:
  ```sql
  SELECT * FROM users;
  SELECT name, age FROM users WHERE age > 25;
  SELECT AVG(age) AS avg_age FROM users;
  CREATE TABLE test (id INTEGER);
  INSERT INTO test VALUES (1);
  SELECT * FROM test;
  ```

---

## 🛠️ Tech Stack

- ⚡ **Next.js 15** (App Router)
- ⚛️ **React 19**
- 🎨 **Chakra UI v3**
- 📝 **Monaco Editor**
- 🗄️ **sql.js 1.13 (SQLite WASM)**


---

## 📜 Scripts

- `npm run dev` → Start development server
- `npm run build` → Build for production
- `npm run lint` → Lint codebase
- `npm run start` → Run production server

---

## 🧭 Roadmap

- [ ] Add **query visualization** (charts/graphs for results).
- [ ] Support **multiple databases** in one session.
- [ ] Add **CSV/Excel export** for query results.
- [ ] Enable **collaborative editing** with WebRTC.
- [ ] Add **authentication** for saving queries in the cloud.
- [ ] Provide **Docker setup** for deployment.

---

## 🤝 Contributing

Contributions are welcome!  
Please ensure:
- Code is clean and well-documented.
- Features are tested.
- README is updated with new functionality.

---

## 📄 License

MIT License — free to use, modify, and distribute.
