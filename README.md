<div>
<img src="./p2c.ui/public/favicon.ico">
</div>

# P2C

Peer to Peer Communication (P2C) Application

This repository contains the frontend and backend code for the **P2C** (Peer to Peer Communication) application. The frontend is built with **Vite** and the backend is built using **.NET**. Follow the steps below to set up and run both projects.

---

## Demo

Watch the [demo video](https://drive.google.com/file/d/1cPmp0NE_6ot7kGCDObzEr8DYARX9PPdk/view?usp=sharing) to see the project in action:

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Frontend Setup (Vite)](#frontend-setup-vite)
- [Backend Setup (.NET)](#backend-setup-net)
- [Directory Structure](#directory-structure)
- [License](#license)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for the frontend Vite project)
- [NPM](https://www.npmjs.com/) (comes with Node.js)
- [.NET SDK](https://dotnet.microsoft.com/download) (for the backend)
- [Visual Studio Code](https://code.visualstudio.com/) or any text editor (optional but recommended)
- [Git](https://git-scm.com/)

---

## Frontend Setup (Vite)

1. Clone the repository:

   ```bash
   git clone https://github.com/Omarookolosio94/p2c.git
   cd p2c
   ```

2. Navigate to the frontend directory

   ```bash
   cd p2c.ui
   ```

3. Install the necessary dependencies using `npm`:

   ```bash
   npm install
   ```

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

   The Vite server will start, and you should see output like:

   ```bash
   VITE v2.x.x  ready in 123 ms
   Local: http://localhost:5173/
   Network: use --host to expose
   ```

5. Open your browser and navigate to `http://localhost:5173/` to access the frontend.

---

## Backend Setup (.NET)

1. Navigate to the backend directory

   ```bash
   cd p2c.api
   ```

2. Restore the .NET dependencies:

   ```bash
   dotnet restore
   ```

3. Build the .NET application:

   ```bash
   dotnet build
   ```

4. Run the application:

   ```bash
   dotnet run
   ```

   The .NET backend should now be running, and you should see output similar to:

   ```bash
   Now listening on: http://localhost:5000
   ```

5. The backend will be running at `http://localhost:5199`, and your frontend can communicate with it via this API endpoint. View the swagger docs in same url: `http://localhost:5199/swagger`

---

## Directory Structure

The directory structure of the project is as follows:

```bash
p2c/
├── p2c.ui/          # Frontend - Vite project
│
└── p2c.api/         # Backend - .NET project

```

## License

This project is licensed under the **Leisure Coding Open Source License (LCOSL)**. You are free to use, copy, modify, and distribute this project for personal, non-commercial purposes.

For full terms and conditions, see the [LICENSE](./LICENSE.txt) file.

### Summary of LCOSL:

- **Non-commercial use only**: The software cannot be used for commercial purposes.
- **Modifications are allowed**: You can modify and redistribute the software, but you must keep the license intact.
- **No warranty**: The software is provided "as-is" without warranty.
