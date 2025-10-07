import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { server } from "./app.js";

dotenv.config();

const DATABASE = process.env.DATABASE_SERVER.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DATABASE).then(() => {
  console.log("DB is successfully connected");
});
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Server is running on port 5000");
});
