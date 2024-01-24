import { Request, Response } from "express";
import User from "../models/User";
import Order from "../models/Order";
import { generateToken } from "../service/helper";
import dotenv from "dotenv";
dotenv.config();

export const activateAccount = async (req: Request, res: Response) => {
  const user = await User.findById({ _id: req.body.userId });
  if (!user) {
    res.json({
      success: false,
      message: "User Info is not correct",
    });
  } else {
    const expireDate = new Date();
    console.log(expireDate);
    expireDate.setMonth(expireDate.getMonth() + Number(req.body.amount) / 50);

    console.log(expireDate);

    user.expireDate = expireDate;
    user.isActive = true;
    user.deposit += req.body.amount;
    await user.save();
    res.json({
      success: true,
      token: generateToken(user),
      message: `Successfully activated. Your account's activate date is ${new Date(
        user.expireDate
      ).toDateString()}`,
    });
  }
};

//////////////////////////////////////

export const addOrder = async (req: Request, res: Response) => {
  const { userId, company, address, name, email, link, size } = req.body;

  const payload = {
    userId: userId,
    company: company,
    address: address,
    name: name,
    email: email,
    link: link,
    size: size,
  };

  const newOrder = new Order(payload);
  await newOrder.save();

  return res.json({
    success: true,
    message: "Successfully Added!",
  });
};

export const getAllOrder = async (req: Request, res: Response) => {
  Order.find().then((models: any) => {
    res.json({ data: models });
  });
};
