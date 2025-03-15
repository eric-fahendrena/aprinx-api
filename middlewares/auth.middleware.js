import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "access unauthorized, missing token"})
    }
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    if (decoded.id === undefined)
      return res.status(403).json({ message: "access refused" });
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal server error");
  }

}
