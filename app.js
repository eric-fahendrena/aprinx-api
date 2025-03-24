import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import coursesRoutes from "./routes/courses.routes.js";
import userCourseAccessRoutes from "./routes/userCourseAccess.routes.js";
import courseTransactionsRoutes from "./routes/courseTransactions.routes.js";
import uploadsRoutes from "./routes/uploads.routes.js";
import notificationsRoutes from "./routes/notifications.routes.js";
import commentNotificationsRoutes from "./routes/commentNotifications.routes.js";
import courseLikesRoutes from "./routes/courseLikes.routes.js";
import deletedCoursesRoutes from "./routes/deletedCourses.routes.js";
import teacherSubscription from "./routes/teacherSubscription.routes.js";

dotenv.config();

const app = express();
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "http://localhost:5173",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use("/api/upload", uploadsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/course-likes", courseLikesRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/comment-notifications", commentNotificationsRoutes);
app.use("/api/user-course-access", userCourseAccessRoutes);
app.use("/api/course-transactions", courseTransactionsRoutes);
app.use("/api/deleted-courses", deletedCoursesRoutes);
app.use("/api/teacher-subscriptions", teacherSubscription);

export default app;
