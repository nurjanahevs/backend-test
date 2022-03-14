const express = require("express");

const connectDB = require("./configs/db");
const router = require("./routers/routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to My App");
});

app.use("/api", router)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App Running in http://localhost:${port}`);
});
