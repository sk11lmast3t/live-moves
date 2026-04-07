import app, { appReady } from './app.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await appReady;

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
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
