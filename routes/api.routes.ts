import { Router } from "express";
import * as auth from "../controllers/auth.controller";
import * as admin from "../controllers/admin.controller";
import * as account from "../controllers/account.controller";
import * as mail from "../controllers/mail.controller";
/**
 * Router
 * Using Passport
 */
const router = Router();

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

import { Client, Environment } from "square";
import { randomUUID } from "crypto";

const { paymentsApi } = new Client({
    accessToken: "EAAAl1UxjZJcpbFJdDa8m_LuFD-7VcNcsv5_LdkfPR6W_Ad6exEm_45MnJa_TZlh",
    environment: Environment.Sandbox
})


router.post("/payment", async (req, res) => {
    console.log("start")
    console.log(req.body.amount)
    // const { result } = await paymentsApi.createPayment({
    //     idempotencyKey: randomUUID(),
    //     sourceId: req.body.sourceId,
    //     amountMoney: {
    //         currency: "USD",
    //         amount: BigInt(100)
    //     }
    // });
    // console.log(result.payment?.status);
    // res.json(result.payment?.status);
    res.json(req.body.amount)
});

export default router;
