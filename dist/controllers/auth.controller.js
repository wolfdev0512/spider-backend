"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.signIn = exports.signUp = exports.checkEmailVerified = exports.resendVeriEmail = void 0;
const User_1 = __importDefault(require("../models/User"));
const helper_1 = require("../service/helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const crypto = require("crypto");
const mailgun = require("mailgun-js")({
    apiKey: process.env.Mailgun_API_KEY,
    domain: "spyderreceipts.com",
});
const sendVerificationEmail = (token, email) => __awaiter(void 0, void 0, void 0, function* () {
    const link = `${process.env.HOST_URL}/verify?token=${token}&email=${email}`;
    const data = {
        from: "SpyderReceipts <support@spyderreceipts.com>",
        to: email,
        subject: "Email Verification",
        text: `Please click on the following link to verify your email: ${link}`,
    };
    yield mailgun.messages().send(data, (error, body) => {
        if (error) {
            return 0;
        }
        return 1;
    });
});
const resendVeriEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.json({
            success: false,
            message: "Error happened while resending verification email",
        });
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    yield user.save();
    yield sendVerificationEmail(token, user.email);
    return res.json({
        success: true,
        message: "Verification email is successfully resent",
    });
});
exports.resendVeriEmail = resendVeriEmail;
const checkEmailVerified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({
        email: req.body.email,
        token: req.body.token,
    });
    if (!user) {
        return res.json({
            success: false,
            message: "Verification Failed, resend your verification email",
        });
    }
    user.isVerified = true;
    yield user.save();
    return res.json({
        success: true,
        message: "You have successfully verfied your email.",
    });
});
exports.checkEmailVerified = checkEmailVerified;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.json({
            success: false,
            message: "Please, send your email and password.",
        });
    }
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.json({ success: false, message: "User already exists!" });
    }
    // if (user && user.isVerified) {
    //   return res.json({ success: false, message: "User already exists!" });
    // }
    // if (user && !user.isVerified) {
    //   await sendVerificationEmail(user.token, user.email);
    //   return res.json({
    //     success: true,
    //     message: "Please check your inbox and verify your email",
    //   });
    // }
    let role = 0;
    if (req.body.email == process.env.ADMIN_EMAIL1 ||
        req.body.email == process.env.ADMIN_EMAIL2 ||
        req.body.email == process.env.ADMIN_EMAIL3) {
        role = 1;
    }
    const token = crypto.randomBytes(20).toString("hex");
    const payload = {
        email: req.body.email,
        password: req.body.password,
        deposit: 0,
        role,
        isActive: false,
        expireDate: Date.now(),
        isVerified: false,
        token: token,
    };
    const newUser = new User_1.default(payload);
    yield newUser.save();
    // await sendVerificationEmail(token, req.body.email);
    return res.json({
        success: true,
        message: "Successfully registered!",
    });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.json({
            success: false,
            message: "No Input Data!",
            verifyIssue: false,
        });
    }
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.json({
            success: false,
            message: "User does not exists!",
            verifyIssue: false,
        });
    }
    // if (user && !user.isVerified) {
    //   await sendVerificationEmail(user.token, user.email);
    //   return res.json({
    //     success: false,
    //     message: "You need to verify your email",
    //     verifyIssue: true,
    //   });
    // }
    const isMatch = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (isMatch) {
        const currentDate = new Date();
        if (user.expireDate < currentDate) {
            user.isActive = false;
            yield user.save();
        }
        return res.json({
            success: true,
            message: "Successfully signed!",
            role: user.role,
            token: (0, helper_1.generateToken)(user),
        });
    }
    return res.json({
        success: false,
        message: "The email or password are incorrect!",
    });
});
exports.signIn = signIn;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.default.find({ email: req.body.email });
    if (!user) {
        return res.json({
            success: false,
            message: "Your email is not registered."
        });
    }
    const link = `${process.env.HOST_URL}/reset-password?token=${user[0].token}&email=${user[0].email}`;
    const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet" />
      <title>Verify your email address</title>
      <style>
        * {
          font-family: "Roboto", sans-serif;
          box-sizing: border-box;
        }
    
        div.root {
          max-width: 768px;
          margin: auto;
          width: 100%;
        }
    
        body {
          padding: 100px;
          margin: 0;
        }
    
        img.logo {
          margin-bottom: 90px;
        }
    
        h1.title {
          color: #000;
          font-size: 40px;
          font-weight: 700;
          margin-bottom: 64px;
        }
    
        div.description {
          color: #000;
          font-size: 16px;
          font-weight: 400;
          margin-bottom: 80px;
        }
    
        a.verify {
          display: block;
          padding: 31px 0;
          text-align: center;
          border-radius: 100px;
          background: #ff6f00;
          text-decoration: none;
          border: none;
          outline: none;
          cursor: pointer;
          max-width: 648px;
          width: 100%;
          margin: auto;
          margin-bottom: 64px;
          color: #fff;
          font-size: 16px;
          font-weight: 400;
        }
    
        div.footer {
          text-align: center;
          max-width: 508px;
          width: 100%;
          margin: auto;
        }
    
        div.link {
          margin-bottom: 32px;
        }
    
        div.link a {
          color: #000;
          font-size: 16px;
          font-weight: 400;
          display: inline-block;
          margin: 0 20px;
          text-decoration: none;
        }
    
        div.footer p {
          color: #000;
    
          font-size: 16px;
          font-weight: 400;
        }
      </style>
    </head>
    
    <body>
      <div class="root">
        <img src="https://i.ibb.co/9cjWCNz/logo.png" alt="logo" class="logo" />
        <h1 class="title">Verify your email to reset your password</h1>
        <div class="description">
          <p>Hi, Client.</p>
          <p>
            We're sending you this email because you requested a password reset. Click on this link to create a new
            password:
          </p>
        </div>
        <a class="verify" href="${link}" target="_blank">
          Verify Email to reset password
        </a>
        <div class="description">
          <p>
            If you didn't request a password reset, you can ignore this email. Your password will not be changed.
          </p>
          <p>The Support Team</p>
        </div>
        <div class="footer">
          <div class="link">
            <a href="#">Privacy Policy</a> | <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </body>
    </html>`;
    const data = {
        from: "Spyder <support@spyderreceipts.com>",
        to: user[0].email,
        subject: "Verify your email address to reset your password",
        html,
    };
    mailgun.messages().send(data, (error, body) => {
        if (error) {
            return res.json({
                success: false,
                message: error,
            });
        }
        return res.json({
            success: true,
            message: "Password Reset Email Sent! Check your inbox (and spam folder) for instructions on resetting your password. If you don't receive an email, contact support.",
        });
    });
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.json({
            success: false,
            message: "Your email is not registered."
        });
    }
    if (user.token !== req.body.token) {
        return res.json({
            success: false,
            message: "Please check gmail again."
        });
    }
    user.password = req.body.password;
    yield user.save();
    return res.json({
        success: true,
        message: "Password reset is successfully done",
    });
});
exports.resetPassword = resetPassword;
