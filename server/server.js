import express from "express";
import dotenv from "dotenv";
import errorHandler from "./src/Middlewares/error/errorHandler.js";
import connectDatabase from "./src/Helpers/database/databaseConnect.js";
import route from "./src/Routers/index.js";

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", route);
app.use(errorHandler);

await connectDatabase();
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`);
});
