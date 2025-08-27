import jwt from "jsonwebtoken";

export default function verifyRole(requiredRole = null) {
    return async function (req, res, next) {
        try {
            const fulltoken = req.headers.authorization;
            const token = fulltoken?.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Access Denied" });
            }

            const decodedtoken = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decodedtoken;

            if (requiredRole && decodedtoken.role !== requiredRole) {
                return res.status(401).json({ message: "Access For Only Admin" });
            }

            next();
        } catch (error) {
            return res.status(403).json({ message: "Invalid Token" });
        }
    };
}
