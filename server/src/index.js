import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createFAQs } from "./controller/createFAQs.js";
import { PrismaClient } from "@prisma/client";

const app = express();
export const prisma = new PrismaClient();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   return res.send("Hello from server");
});

app.post("/faqs", createFAQs);

app.listen(process.env.PORT, () =>
   console.log(`Server running on port ${process.env.PORT}`)
);
