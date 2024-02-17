import dotenv from "dotenv";

dotenv.config();

const mailgun = require("mailgun-js")({
  apiKey: process.env.Mailgun_API_KEY,
  domain: "spyderreceipts.com",
});

import { Request, Response } from "express";
import { Client, Environment } from "square";
import { randomUUID } from "crypto";

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

export const sendMoney = async (req: Request, res: Response) => {
  try {
    console.log(req.body.sourceId);
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: "USD",
        amount: BigInt(req.body.amount),
      },
    });

    res.json({
      success: true,
      data: {
        date: result?.payment?.createdAt,
        amount: result?.payment?.totalMoney?.amount?.toString(),
        currency: result?.payment?.totalMoney?.currency,
        orderId: result?.payment?.orderId,
        status: result?.payment?.status,
        receiptUrl: result?.payment?.receiptUrl,
      },
    });
  } catch (error) {
    res.json({ data: error });
  }
};

// const sendEmail = async (
//   email: string,
//   Date: string,
//   Amount: string,
//   OrderId: string,
//   transaction: string
// ) => {
//   const html = `<!DOCTYPE html>
//   <html lang="en">
//     <head>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <link
//         href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
//         rel="stylesheet"
//       />
//       <title>Verify your email address</title>
//       <style>
//         * {
//           font-family: "Roboto", sans-serif;
//           box-sizing: border-box;
//         }

//         div.root {
//           max-width: 768px;
//           margin: auto;
//           width: 100%;
//         }

//         body {
//           padding: 100px;
//           margin: 0;
//         }

//         img.logo {
//           margin-bottom: 90px;
//         }

//         h1.title {
//           color: #000;
//           font-size: 40px;
//           font-weight: 700;
//           margin-bottom: 64px;
//         }

//         div.footer {
//           text-align: center;
//           max-width: 508px;
//           width: 100%;
//           margin: auto;

//           margin-top: 50px;
//         }

//         div.link {
//           margin-bottom: 32px;
//         }

//         div.link a {
//           color: #000;
//           font-size: 16px;
//           font-weight: 400;
//           display: inline-block;
//           margin: 0 20px;
//           text-decoration: none;
//         }

//         div.footer p {
//           color: #000;

//           font-size: 16px;
//           font-weight: 400;
//         }

//         div.container {
//           width: 100%;

//           border: 1px solid gray;
//           border-radius: 20px;
//           padding: 20px;

//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }
//         div.header {
//           font-size: 25px;
//           font-weight: 600;
//         }
//         div.row {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }
//         div.detail {
//           font-size: 18px;
//           font-weight: 400;
//         }
//         div.detail span {
//           font-size: 20px;
//           font-weight: 600;
//           margin-right: 5px;
//         }
//         a.transaction {
//           font-size: 25px;
//           font-weight: 600;
//           text-decoration: underline;
//           color: #69b1ff;
//         }
//       </style>
//     </head>

//     <body>
//       <div class="root">
//         <img src="https://i.ibb.co/9cjWCNz/logo.png" alt="logo" class="logo" />
//         <h1 class="title">SPYDER RECEIPTS</h1>
//         <div class="container">
//           <div class="row">
//             <div class="header">Email:</div>
//             <div class="detail">innocentdev0512@gmail.com</div>
//           </div>
//           <div class="row">
//             <div class="header">Date:</div>
//             <div class="detail">2024/03/21</div>
//           </div>
//           <div class="row">
//             <div class="header">Amount:</div>
//             <div class="detail"><span>100</span>USD</div>
//           </div>
//           <div class="row">
//             <div class="header">OrderID:</div>
//             <div class="detail">YLBd742Kn3QimiVodPFqvCJCLVXZY</div>
//           </div>
//           <div class="row">
//             <a
//               class="transaction"
//               href="https://discord.com/channels/@me/1199859109076414615"
//               target="_blank"
//               >View Transaction</a
//             >
//           </div>
//         </div>
//         <div class="footer">
//           <div class="link">
//             <a href="#">Privacy Policy</a> | <a href="#">Contact Support</a>
//           </div>
//         </div>
//       </div>
//     </body>
//   </html>
//   `;

//   const data = {
//     from: "Spyder <support@spyderreceipts.com>",
//     to: email,
//     subject: "Verify your email address to reset your password",
//     html,
//   };

//   mailgun.messages().send(data, (error: Error, body) => {
//     if (error) {
//       return res.json({
//         success: false,
//         message: error,
//       });
//     }
//     return res.json({
//       success: true,
//       message:
//         "Password Reset Email Sent! Check your inbox (and spam folder) for instructions on resetting your password. If you don't receive an email, contact support.",
//     });
//   });
// };
