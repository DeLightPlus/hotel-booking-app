import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import paypalRoutes from "./routes/paypal.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: process.env.PAYPAL_REDIRECT_BASEURL || 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true, 
  }));

app.use(cors());

app.use("/paypal", paypalRoutes)
app.use("/test", (req, res) => { res.send("Server is running!"); })

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });