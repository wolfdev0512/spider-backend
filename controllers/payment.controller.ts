import { Request, Response } from "express";
import { Client, Environment } from "square";
import { randomUUID } from "crypto";

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production,
});

export const sendMoney = async (req: Request, res: Response) => {
  try {
    console.log(req.body.sourceId)
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: "USD",
        amount: BigInt(req.body.amount),
      },
    });

    res.json({
      data: result.payment?.status,
    });
  } catch (error) {
    res.json({ data: error });
  }
};
