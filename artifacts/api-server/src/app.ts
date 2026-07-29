import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route to fix 404 error
app.get("/", (req, res) => {
  res.send("Vayrox API Server is running!");
});

app.use("/api", router);

export default app;
