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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMoney = void 0;
const square_1 = require("square");
const { paymentsApi } = new square_1.Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: square_1.Environment.Sandbox,
});
const sendMoney = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const {
        //   result
        // } = await paymentsApi.createPayment({
        //   idempotencyKey: randomUUID(),
        //   sourceId: req.body.sourceId,
        //   amountMoney: {
        //     currency: "USD",
        //     amount: BigInt(req.body.amount),
        //   },
        // });
        // res.json({
        //   data: result.payment?.status,
        // });
        res.json({
            data: "COMPLETED",
        });
    }
    catch (error) {
        res.json({ data: error });
    }
});
exports.sendMoney = sendMoney;
