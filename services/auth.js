const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/JWThelpers");

const loginService = async (foundUser) => {
  const accessToken = generateAccessToken(
    foundUser.username,
    foundUser._id,
    foundUser.role
  );

  const refreshToken = generateRefreshToken(foundUser.username);

  return { accessToken, refreshToken };
};
const signupService = async (username, email, password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
    role: "customer",
  });

  const accessToken = generateAccessToken(username, user._id, "customer");

  const refreshToken = generateRefreshToken(username);

  return { accessToken, refreshToken };
};
const refreshSrevice=(foundUser)=>{
    return accessToken = generateAccessToken(foundUser.username,foundUser._id,foundUser.role);
}
module.exports = {
  signupService,
  loginService,
  refreshSrevice
};
