import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "unauthorized"})
    }
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    if (decoded.id === undefined)
      return res.status(401).json({ message: "unauthorized" });
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal server error");
  }
}

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ message: "only admin can do this action" });
  next();
}

export const verifyTeacher = (req, res, next) => {
  if (req.user.role !== "ADMIN" && req.user.role !== "TEACHER")
    return res.status(403).json({ message: "only admin or teacher can do this action" });
  next();
}
