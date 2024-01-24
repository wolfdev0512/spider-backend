"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth = __importStar(require("../controllers/auth.controller"));
const admin = __importStar(require("../controllers/admin.controller"));
const account = __importStar(require("../controllers/account.controller"));
const mail = __importStar(require("../controllers/mail.controller"));
/**
 * Router
 * Using Passport
 */
const router = (0, express_1.Router)();
// Authentication
router.post("/auth/signup", auth.signUp);
router.post("/auth/signin", auth.signIn);
router.post("/auth/resendVeriEmail", auth.resendVeriEmail);
router.post("/auth/checkEmailVerified", auth.checkEmailVerified);
// Admin Action
router.post("/admin/getAllUser", admin.getAllUser);
router.post("/admin/removeUser", admin.removeUser);
router.post("/admin/editUser", admin.editUser);
// Account Activate / Stripe
router.post("/charge", account.activateAccount);
// Sending Mail Action
router.post("/sendEmail", mail.sendEmail);
// Payment
const square_1 = require("square");
const crypto_1 = require("crypto");
const { paymentsApi } = new square_1.Client({
    accessToken: "EAAAl1UxjZJcpbFJdDa8m_LuFD-7VcNcsv5_LdkfPR6W_Ad6exEm_45MnJa_TZlh",
    environment: square_1.Environment.Sandbox
});
router.post("/payment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("start");
    const { result } = yield paymentsApi.createPayment({
        idempotencyKey: (0, crypto_1.randomUUID)(),
        sourceId: req.body.sourceId,
        amountMoney: {
            currency: "USD",
            amount: BigInt(100)
        }
    });
    console.log((_a = result.payment) === null || _a === void 0 ? void 0 : _a.status);
    res.json((_b = result.payment) === null || _b === void 0 ? void 0 : _b.status);
}));
exports.default = router;
