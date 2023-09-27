const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { loginSchema, signupSchema } = require("../validatationSchemas/userSchema");
const authService = require("../services/auth");
const {REFRESH_TOKEN_SECRET}=require('../config/configVariables')
const {AuthenticationError,AuthorizationError}=require('../helpers/errors')
const validate=require('../helpers/validate')

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    validate(loginSchema,{ username: username,password: password})

    const { accessToken, refreshToken } = await authService.login(username,password);

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    res.status(200).json({ accessToken ,refreshToken});
  } catch (error) {
    next(error)
  }  
  
};

const signUp = async (req, res, next) => {
  const { username, email, password, confirm_password } = req.body;
  try {
    validate(signupSchema,{  username: username,email: email,password: password,confirm_password: confirm_password})

    const { accessToken, refreshToken } = await authService.signup(username,email,password);

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      //secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    res.status(200).json({ accessToken,refreshToken });
  } catch (error) {
    next(error)
  }  
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res, next) => {
  const cookies = req.cookies;
  try {
    if (!cookies?.jwt) next(new AuthenticationError("Unauthorized"));

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) next(new AuthenticationError('Invalid refresh token'))
  
        const foundUser = await User.findOne({
          username: decoded.username,
        }).exec();
  
        if (!foundUser) next(new AuthenticationError("Invalid refresh token"));
        
        const accessToken=authService.refresh(foundUser)
        res.json({ accessToken });
      });
  } catch (error) {
    next(error)
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
