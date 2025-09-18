import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    // 1️⃣ Get token from headers (use Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorised" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Check that payload matches email + password
    const expected = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
    const actual = token_decode.email + token_decode.password;

    if (actual !== expected) {
      return res.status(401).json({ success: false, message: "Not authorised, login again" });
    }

    // 4️⃣ Token is valid
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default adminAuth;
