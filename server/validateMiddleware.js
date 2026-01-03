const validateEmail = (req, res, next) => {
  const email = req.body.email?.trim();

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  req.body.email = email;
  next();
};

export default validateEmail;
