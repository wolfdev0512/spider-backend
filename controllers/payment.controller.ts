import { Request, Response } from "express";
import { Client, Environment } from "square";
import { randomUUID } from "crypto";

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

export const sendMoney = async (req: Request, res: Response) => {
  try {
    const {
      result: { payment },
    } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: "USD",
        amount: BigInt(req.body.amount),
      },
    });

    const result = JSON.stringify(
      payment,
      (key, value) => {
        return typeof value === "bigint" ? value.toString() : value;
      },
      4
    );
    res.json({
      result,
    });
  } catch (error) {
    res.json(error);
  }
};
