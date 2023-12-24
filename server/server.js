const app = require('./app');
const connectDatabase = require('./config/db');
const PORT = process.env.PORT || 3001;

connectDatabase();

const server = app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});

function cleanupAndExit() {
    server.close(() => {
      console.log('oops server closed');
      process.exit(0);
    });
  }
  
  process.on('SIGTERM', cleanupAndExit);
  process.on('SIGINT', cleanupAndExit);
