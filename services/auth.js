const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/JWThelpers");
const {AuthenticationError}=require('../helpers/errors')

class authService{

  async login(username,password){
    const foundUser = await User.findOne({ username }).exec();

    if (!foundUser) throw new AuthenticationError("username does not exist");

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match)  throw new AuthenticationError("password is incorrect");

    const accessToken = generateAccessToken(
      foundUser.username,
      foundUser._id,
      foundUser.role
    );

    const refreshToken = generateRefreshToken(foundUser.username);

    return { accessToken, refreshToken };
  }

  async signup(username, email, password){
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
  }

  async refresh(foundUser){
    return generateAccessToken(foundUser.username,foundUser._id,foundUser.role);
  }
}

module.exports = new authService()


