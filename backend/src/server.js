import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║    🎬 StreamBox Backend Server 🎬   ║
║         v1.0.0 - Running              ║
╠═══════════════════════════════════════╣
║ Server: http://localhost:${PORT}         ║
║ API: http://localhost:${PORT}/api        ║
║ Health: http://localhost:${PORT}/health  ║
╚═══════════════════════════════════════╝
  `);
});
