import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

// ✅ LOCAL ONLY
if (process.env.NODE_ENV !== "production") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// ✅ VERCEL
export default app;
