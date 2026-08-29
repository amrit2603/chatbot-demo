# chatbot-demo

Simple Node.js + Express chatbot demo with a minimal web UI.

Prereqs
- Node 18+
- An OpenAI-compatible API key (set OPENAI_API_KEY)

Quick start
1. git clone https://github.com/amrit2603/chatbot-demo
2. cd chatbot-demo
3. cp .env.example .env && edit .env to add your key
4. npm install
5. npm start
6. Open http://localhost:3000

Notes
- This is a minimal demo. Replace the API endpoint or model name in server.js to match your provider.
- Consider adding rate limiting, request validation, and server-side session handling for production.
