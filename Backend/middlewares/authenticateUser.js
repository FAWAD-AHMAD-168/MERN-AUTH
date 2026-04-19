import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const token = req.cookies.loginToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

export default authenticateUser;