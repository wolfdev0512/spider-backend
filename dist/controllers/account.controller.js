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
exports.getAllOrder = exports.addOrder = exports.activateAccount = void 0;
const User_1 = __importDefault(require("../models/User"));
const Order_1 = __importDefault(require("../models/Order"));
const helper_1 = require("../service/helper");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const activateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById({ _id: req.body.userId });
    if (!user) {
        res.json({
            success: false,
            message: "User Info is not correct",
        });
    }
    else {
        const expireDate = new Date();
        console.log(expireDate);
        expireDate.setMonth(expireDate.getMonth() + Number(req.body.amount) / 50);
        console.log(expireDate);
        user.expireDate = expireDate;
        user.isActive = true;
        user.deposit += req.body.amount;
        yield user.save();
        res.json({
            success: true,
            token: (0, helper_1.generateToken)(user),
            message: `Successfully activated. Your account's activate date is ${new Date(user.expireDate).toDateString()}`,
        });
    }
});
exports.activateAccount = activateAccount;
//////////////////////////////////////
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { company, address, name, email, link, size } = req.body;
    const payload = {
        company: company,
        address: address,
        name: name,
        email: email,
        link: link,
        size: size,
    };
    const newOrder = new Order_1.default(payload);
    yield newOrder.save();
    return res.json({
        success: true,
        message: "Successfully Added!",
    });
});
exports.addOrder = addOrder;
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Order_1.default.find().then((models) => {
        res.json({ data: models });
    });
});
exports.getAllOrder = getAllOrder;
