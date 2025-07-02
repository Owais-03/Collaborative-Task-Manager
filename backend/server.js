import express from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import methodoverride from "method-override";
import ExpressError from "../backend/utils/ExpressError.js";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";
import User from "./models/user.model.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5007;

const corsOptions = {
  origin: ["http://localhost:5173", "*"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["Set-Cookie"],
  optionsSuccessStatus: 200,
};

// CORS configuration
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// Additional CORS headers for better compatibility
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization,Cookie"
  );
  next();
});

const sessionOptions = {
  secret: process.env.SECRET_KEY, // Ensure SECRET_KEY is set
  resave: true, // Avoid unnecessary session resaving
  saveUninitialized: false, // Do not save uninitialized sessions
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true, // Prevent client-side access to cookies
  }
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodoverride("_method"));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(logger("dev"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use((req, res, next) => {
  console.log(`Incoming request from origin: ${req.headers.origin}`); // Log request origin
  console.log(`${req.method} ${req.url}`); // Log incoming requests
  next();
});

//database connection
connectDB();

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);
app.get("/", (_, res) => {
  res.send("Server Running");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something Went Wrong!";
  console.error(err);
  res.status(statusCode).json({ error: message });
});

app.listen(port, () => {
  console.log(`server running @ ${port}`);
});
