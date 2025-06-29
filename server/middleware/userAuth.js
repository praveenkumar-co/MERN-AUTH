import jwt from "jsonwebtoken";
const userAuth = async (req, res, next) => {
  // user send token in cookies so extracted token from cooies ->
  const {token} = req.cookies ;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again " });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // If token had id
    if (decoded.id) {
      // store id in req.body
      req.userId = decoded.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized,Login Again",
      });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export default userAuth;
