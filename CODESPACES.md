# Running this project in GitHub Codespaces

This repo uses a small Express server to proxy Google Sheets (server/) and a Vite React frontend (root).

Quick steps to run everything in Codespaces:

1. Open the repository in Codespaces (default Linux environment).
2. Build and run the backend server (the server is compiled to JS before running):

```bash
# from repo root
# set this to where you place your credentials JSON inside the container
export GOOGLE_APPLICATION_CREDENTIALS_PATH=$PWD/src/config/credentials.json

# install server deps and run compiled server
npm --prefix server install
npm --prefix server run run
```

3. In a second terminal, start the frontend dev server:

```bash
npm install
npm run dev
```

4. Open the forwarded port from Codespaces for the frontend (usually 3000). The frontend will call the backend on port 3001 inside the Codespace; Codespaces forwards both ports when you add them.

Notes:
- Do NOT commit real credentials to the repo. Keep `src/config/credentials.json` in `.gitignore`.
- If you prefer, set `GOOGLE_APPLICATION_CREDENTIALS_PATH` to an absolute path where you place the real credentials JSON inside the Codespace.

Troubleshooting:
- If the server fails to start due to missing credentials, ensure `GOOGLE_APPLICATION_CREDENTIALS_PATH` points to a readable JSON file.
- If the frontend cannot reach the backend, confirm port forwarding is enabled for both 3000 and 3001 in Codespaces.
