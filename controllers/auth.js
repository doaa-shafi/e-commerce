const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginSchema, signupSchema } = require("../config/validationSchema");
const { loginService, signupService, refreshSrevice } = require("../services/auth");
const {REFRESH_TOKEN_SECRET}=require('../config/configVariables')
const ApiError=require('../helpers/ApiError')

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res, next) => {
  const { username, password } = req.body;

  const result = loginSchema.validate({
    username: username,
    password: password,
  });
  if (result.error) {
    next(new ApiError(result.error.details[0].message, 400));
  }
  try {
    const foundUser = await User.findOne({ username }).exec();

    if (!foundUser) next(new ApiError("Unauthorized", 401));

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) next(new ApiError("Unauthorized", 401));

    const { accessToken, refreshToken } = await loginService(foundUser);

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const signUp = async (req, res, next) => {
  const { username, email, password, confirm_password } = req.body;

  const result = signupSchema.validate({
    username: username,
    email: email,
    password: password,
    confirm_password: confirm_password,
  });
  if (result.error) {
    next(new ApiError(result.error.details[0].message, 400));
  }
  try {
    const { accessToken, refreshToken } = await signupService(
      username,
      email,
      password
    );
    

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      //secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) next(new ApiError("Unauthorized", 401));

  const refreshToken = cookies.jwt;
  try {
    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
  
        const foundUser = await User.findOne({
          username: decoded.username,
        }).exec();
  
        if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
        
        const accessToken=refreshSrevice(foundUser)
        res.json({ accessToken });
      });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
     
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  signUp,
  login,
  refresh,
  logout,
};
