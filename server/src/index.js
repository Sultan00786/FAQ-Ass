import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   return res.send("Hello from server");
});

app.listen(8000, () => console.log("Server running on port 5000"));
