import express from 'express'; 
const app = express();

import dotenv from "dotenv";
//const cors= require("cors");
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import transactionRoutes from "./routes/Transaction.js";
import swaggerUi from 'swagger-ui-express';

import {logger} from "./middlewares/logger.js"
import { Notfound } from './middlewares/NotFound.js';
import uploadRoutes from "./routes/upload.js"

const PORT = process.env.PORT  || 5000;
import {limiter} from "./middlewares/ratelimit.js"
import { swaggerSpec } from './utils/Swagger.js';

const users=[
    { id: 1, name: "John Doe", email: "axmed@gmail.com"},
    { id: 2, name: "Jane Smith", email: "jane@gmail.com"},
    { id: 3, name: "Alice Johnson", email: "alice@gmail.com"}
]
app.use(limiter);

// const now = new Date();
// const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
// const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

// console.log("Start of Month:", startOfMonth);
// console.log("End of Month:", endOfMonth);

app.use(cors(
    {
        origin: ["http://localhost:5173", "https://dugsiiye.com","http://localhost:5173"]
    }
))


// Middleware to log requests
app.use(logger);
// Middleware to handle 404 Not Found

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/docs/Transaction', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth",authRoutes)

app.use("/api/transactions",transactionRoutes);
app.use("/admin",adminRoutes);
app.use("/api/upload",uploadRoutes);



app.get("/", (req, res) => {
    res.send(users);
});


app.get("/users", (req, res) => {
    res.send(users);
}
);

app.use(Notfound);

// mongoose.connect(process.env.NODE_ENV =="development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URL_PRO)
// mongoose.connect(process.env.NODE_ENV === "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URL_PRO)

//   .then(() => console.log('✅ MongoDB connected locally'))
//   .catch(err => console.error('❌ Connection error:', err));

mongoose.connect(process.env.NODE_ENV =="development"? process.env.MONGO_URI_DEV : process.env.MONGO_URL_PRO)
  .then(() => console.log('✅ MongoDB connected locally'))
  .catch(err => console.error('❌ Connection error:', err));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});