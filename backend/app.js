import express from "express";
import postRouter from "./router/postRouter.js";
import userRouter from "./router/userRouter.js";
import notificationRouter from "./router/notificationRouter.js";
import appliedjobsRouter from "./router/appliedjobsRouter.js";
import jobalertRouter from "./router/jobalertRouter.js";
import messageRouter from "./router/messageRouter.js";
import applicationRouter from "./router/applicationRouter.js";
import bookmarkRouter from "./router/bookmarkRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./controllers/errorController.js";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const userToSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userToSocketMap[receiverId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId != undefined) userToSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userToSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected->", socket.id);
    delete userToSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userToSocketMap));
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/v1/post", postRouter);
app.use("/api/v1/users", userRouter); // ✅
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/bookmark", bookmarkRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/appliedjobs", appliedjobsRouter);
app.use("/api/v1/jobalerts", jobalertRouter);
app.use(globalErrorHandler);
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

export default app;
