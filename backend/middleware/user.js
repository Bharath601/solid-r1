import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET || 'Bharath601';

function userMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  try {
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.clearCookie("token");
      return res.status(401).json({ error: "Session expired. Please log in again." });
    } else {
      res.clearCookie("token");
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
  }
}

export default userMiddleware;
