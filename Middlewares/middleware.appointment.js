import jsonwebtoken from "jsonwebtoken";

export default function authMiddleware() {
  return (req, res, next) => {
    try {
      const fulltoken = req.headers["authorization"];
      const token = fulltoken?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Access Denied" });
      }
      const decodedtoken = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      req.user = decodedtoken;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  };
}
