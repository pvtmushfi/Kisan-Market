import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import config from "./config/env.js";
import { connectDB } from "./config/db.js";

const startServer = async () => {
  try {
    await connectDB();

    const PORT = config.PORT || 5000;

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
    });

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // 👇 FIX: handle EADDRINUSE instead of crash
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`❌ Port ${PORT} is busy. Try another port.`);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

startServer();
