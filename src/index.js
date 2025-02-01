import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createFAQs } from "./controller/createFAQs.js";
import { PrismaClient } from "@prisma/client";
import { getFAQs } from "./controller/getFAQs.js";
import Redis from "ioredis";

const app = express();
export const prisma = new PrismaClient();
export const redis = new Redis({
   host: process.env.REDIS_HOST || "redis",
   port: process.env.REDIS_PORT || 6379,
 });
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   return res.send("Hello from server");
});

app.post("/faqs", createFAQs);
app.get("/faqs", getFAQs);

app.listen(process.env.PORT, () =>
   console.log(`Server running on port ${process.env.PORT}`)
);
