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
exports.sendEmail = void 0;
const User_1 = __importDefault(require("../models/User"));
const EmailHistory_1 = __importDefault(require("../models/EmailHistory"));
const dotenv_1 = __importDefault(require("dotenv"));
const apple_1 = require("../email/apple");
const balenciaga_1 = require("../email/balenciaga");
const dior_1 = require("../email/dior");
const end_1 = require("../email/end");
const farfetch_1 = require("../email/farfetch");
const hermes_1 = require("../email/hermes");
const goat_1 = require("../email/goat");
const grailed_1 = require("../email/grailed");
const louis_1 = require("../email/louis");
const moncler_1 = require("../email/moncler");
const nike_1 = require("../email/nike");
const snkrs_1 = require("../email/snkrs");
const ssense_1 = require("../email/ssense");
const stadium_1 = require("../email/stadium");
const trapstar_1 = require("../email/trapstar");
const stockx_1 = require("../email/stockx");
const bape_1 = require("../email/bape");
const broken_1 = require("../email/broken");
const burberry_1 = require("../email/burberry");
const canada_1 = require("../email/canada");
const corteiz_1 = require("../email/corteiz");
const dover_1 = require("../email/dover");
const dyson_1 = require("../email/dyson");
const ebay_1 = require("../email/ebay");
const flight_1 = require("../email/flight");
const gucci_1 = require("../email/gucci");
const harrods_1 = require("../email/harrods");
const yeezy_1 = require("../email/yeezy");
const luisa_1 = require("../email/luisa");
const porter_1 = require("../email/porter");
const prada_1 = require("../email/prada");
const ralph_1 = require("../email/ralph");
const saks_1 = require("../email/saks");
const samsung_1 = require("../email/samsung");
const selfridges_1 = require("../email/selfridges");
const sp5der_1 = require("../email/sp5der");
const st_ssy_1 = require("../email/st\u00FCssy");
const supreme_1 = require("../email/supreme");
const vivienne_1 = require("../email/vivienne");
dotenv_1.default.config();
const fs = require("fs");
const mailgun = require("mailgun-js")({
    apiKey: process.env.Mailgun_API_KEY,
    domain: "spyderreceipts.com",
});
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
    console.log(req.body);
    const user = yield User_1.default.findById({ _id: req.body.userId });
    if (!user) {
        return res.json({
            success: false,
            message: "User Info is not correct",
        });
    }
    if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
        return res.json({
            success: false,
            message: "You need to activate your account",
        });
    }
    let html = "";
    let subject = "";
    if (req.body.type == "apple") {
        html = (0, apple_1.appleEmail)(req.body.form);
        subject = `We're processing your order ${(_a = req.body.form) === null || _a === void 0 ? void 0 : _a.order_number}`;
    }
    else if (req.body.type == "balenciaga") {
        html = (0, balenciaga_1.balenciagaEmail)(req.body.form);
        subject = "Your Balenciaga Order Confirmed";
    }
    else if (req.body.type == "dior") {
        html = (0, dior_1.diorEmail)(req.body.form);
        subject = "Thank you for your Dior order";
    }
    else if (req.body.type == "end.") {
        html = (0, end_1.endEmail)(req.body.form);
        subject = "Your END. order confirmation";
    }
    else if (req.body.type == "farfetch") {
        if (req.body.form.language == "en") {
            html = (0, farfetch_1.farfetchEngEmail)(req.body.form);
            subject =
                "Thank you for placing your order. Here's what you can expect next";
        }
        else {
            html = (0, farfetch_1.farfetchGerEmail)(req.body.form);
            subject = "Vielen Dank für Ihre Bestellung! So geht es weiter";
        }
    }
    else if (req.body.type == "hermès") {
        html = (0, hermes_1.hermesEmail)(req.body.form);
        subject = "Your Hermès order";
    }
    else if (req.body.type == "goat") {
        html = (0, goat_1.goatEmail)(req.body.form);
        subject = `Your GOAT order #${(_b = req.body.form) === null || _b === void 0 ? void 0 : _b.order_number}`;
    }
    else if (req.body.type == "grailed") {
        html = (0, grailed_1.grailedEmail)(req.body.form);
        subject = "Congrats on your purchase!";
    }
    else if (req.body.type == "louis vuitton") {
        html = (0, louis_1.louisEmail)(req.body.form);
        subject = "Your Louis Vuitton Order";
    }
    else if (req.body.type == "moncler") {
        html = (0, moncler_1.monclerEmail)(req.body.form);
        subject = "Thank you for your order";
    }
    else if (req.body.type == "nike") {
        html = (0, nike_1.nikeEmail)(req.body.form);
        subject = `Order Received (Nike.com #${(_c = req.body.form) === null || _c === void 0 ? void 0 : _c.order_number})`;
    }
    else if (req.body.type == "snkrs") {
        html = (0, snkrs_1.snkrsEmail)(req.body.form);
        subject = `Here's Your Payment Overview for Order ${(_d = req.body.form) === null || _d === void 0 ? void 0 : _d.order_number}`;
    }
    else if (req.body.type == "ssense") {
        html = (0, ssense_1.ssenseEmail)(req.body.form);
        subject = "Thank you for your order";
    }
    else if (req.body.type == "stadium goods") {
        html = (0, stadium_1.stadiumEmail)(req.body.form);
        subject = `Thank you for your Order #${(_e = req.body.form) === null || _e === void 0 ? void 0 : _e.order_number}`;
    }
    else if (req.body.type == "trapstar") {
        html = (0, trapstar_1.trapstarEmail)(req.body.form);
        subject = `Order #TS${(_f = req.body.form) === null || _f === void 0 ? void 0 : _f.order_number} confirmed`;
    }
    else if (req.body.type == "stockx") {
        subject = `🎉Order Delivered: ${(_g = req.body.form) === null || _g === void 0 ? void 0 : _g.item_name} ${(_h = req.body.form) === null || _h === void 0 ? void 0 : _h.size_in_brackets}`;
        if (req.body.form.tax_options == "vat")
            html = (0, stockx_1.stockxVatEmail)(req.body.form);
        else
            html = (0, stockx_1.stockxSalesTaxEmail)(req.body.form);
    }
    else if (req.body.type == "bape") {
        html = (0, bape_1.bapeEmail)(req.body.form);
        subject = `Order #LE684-58-${(_j = req.body.form) === null || _j === void 0 ? void 0 : _j.order_number} confirmed`;
    }
    else if (req.body.type == "broken planet") {
        html = (0, broken_1.brokenEmail)(req.body.form);
        subject = `Order #${(_k = req.body.form) === null || _k === void 0 ? void 0 : _k.order_number} confirmed`;
    }
    else if (req.body.type == "burberry") {
        html = (0, burberry_1.burberryEmail)(req.body.form);
        subject = `Thank you for your order`;
    }
    else if (req.body.type == "canada goose") {
        html = (0, canada_1.canadaEmail)(req.body.form);
        subject = `Your Canada Goose invoice.`;
    }
    else if (req.body.type == "corteiz") {
        html = (0, corteiz_1.corteizEmail)(req.body.form);
        subject = `Order #${(_l = req.body.form) === null || _l === void 0 ? void 0 : _l.order_number} confirmed`;
    }
    else if (req.body.type == "dover street market") {
        html = (0, dover_1.doverEmail)(req.body.form);
        subject = `DSM E-SHOP Order DSM${(_m = req.body.form) === null || _m === void 0 ? void 0 : _m.order_number}`;
    }
    else if (req.body.type == "dyson") {
        html = (0, dyson_1.dysonEmail)(req.body.form);
        subject = `Your Dyson order confirmation ${(_o = req.body.form) === null || _o === void 0 ? void 0 : _o.order_number}`;
    }
    else if (req.body.type == "ebay") {
        html = (0, ebay_1.ebayEmail)(req.body.form);
        subject = `Order confirmed: ${(_p = req.body.form) === null || _p === void 0 ? void 0 : _p.item}`;
    }
    else if (req.body.type == "flight club") {
        html = (0, flight_1.flightEmail)(req.body.form);
        subject = `Your Flight Club order #${(_q = req.body.form) === null || _q === void 0 ? void 0 : _q.order_number}`;
    }
    else if (req.body.type == "gucci") {
        html = (0, gucci_1.gucciEmail)(req.body.form);
        subject = `Order Confirmation #GB${(_r = req.body.form) === null || _r === void 0 ? void 0 : _r.order_number}`;
    }
    else if (req.body.type == "harrods") {
        html = (0, harrods_1.harrodsEmail)(req.body.form);
        subject = `Thank you for your order`;
    }
    else if (req.body.type == "yeezy gap") {
        html = (0, yeezy_1.yeezyEmail)(req.body.form);
        subject = `Your order has been shipped! - YEEZY GAP by Global-e - order number ${(_s = req.body.form) === null || _s === void 0 ? void 0 : _s.order_number}`;
    }
    else if (req.body.type == "luisaviaroma") {
        html = (0, luisa_1.luisaEmail)(req.body.form);
        subject = `LUISAVIAROMA.COM Order Confirmation: ${(_t = req.body.form) === null || _t === void 0 ? void 0 : _t.order_number}`;
    }
    else if (req.body.type == "mr porter") {
        html = (0, porter_1.porterEmail)(req.body.form);
        subject = `Your MR PORTER order confirmation - ${(_u = req.body.form) === null || _u === void 0 ? void 0 : _u.order_number}`;
    }
    else if (req.body.type == "prada") {
        html = (0, prada_1.pradaEmail)(req.body.form);
        subject = `Prada - Order acknowledgement - ${(_v = req.body.form) === null || _v === void 0 ? void 0 : _v.order_number}`;
    }
    else if (req.body.type == "ralph lauren") {
        html = (0, ralph_1.ralphEmail)(req.body.form);
        subject = `Your Ralph Lauren Order ${(_w = req.body.form) === null || _w === void 0 ? void 0 : _w.order_number}`;
    }
    else if (req.body.type == "saks fifth avenue") {
        html = (0, saks_1.saksEmail)(req.body.form);
        subject = `Thank you for your order #${(_x = req.body.form) === null || _x === void 0 ? void 0 : _x.order_number}`;
    }
    else if (req.body.type == "saks fifth avenue") {
        html = (0, saks_1.saksEmail)(req.body.form);
        subject = `Thank you for your order #${(_y = req.body.form) === null || _y === void 0 ? void 0 : _y.order_number}`;
    }
    else if (req.body.type == "samsung") {
        html = (0, samsung_1.samsungEmail)(req.body.form);
        subject = `Thanks for ordering from Samsung.com (Order ${(_z = req.body.form) === null || _z === void 0 ? void 0 : _z.order_number})`;
    }
    else if (req.body.type == "selfridges") {
        html = (0, selfridges_1.selfridgesEmail)(req.body.form);
        subject = `Thank you for your order #${(_0 = req.body.form) === null || _0 === void 0 ? void 0 : _0.order_number}`;
    }
    else if (req.body.type == "sp5der") {
        html = (0, sp5der_1.sp5derEmail)(req.body.form);
        subject = `Order #SP${(_1 = req.body.form) === null || _1 === void 0 ? void 0 : _1.order_number} confirmed`;
    }
    else if (req.body.type == "stüssy") {
        html = (0, st_ssy_1.stüssyEmail)(req.body.form);
        subject = `Order #${(_2 = req.body.form) === null || _2 === void 0 ? void 0 : _2.order_number} confirmed`;
    }
    else if (req.body.type == "supreme") {
        html = (0, supreme_1.supremeEmail)(req.body.form);
        subject = `online shop order`;
    }
    else if (req.body.type == "vivienne westwood") {
        html = (0, vivienne_1.vivienneEmail)(req.body.form);
        subject = `Thank you for your order`;
    }
    const data = {
        from: `${req.body.title} <support@spyderreceipts.com>`,
        to: req.body.form.email,
        subject,
        html,
    };
    mailgun.messages().send(data, (error, body) => {
        if (error) {
            return res.json({
                success: false,
                message: "Error found while sending emails.",
            });
        }
        const newHistory = {
            userId: req.body.userId,
            email: req.body.form.email,
            title: req.body.type,
            sentDate: Date.now(),
        };
        const newMHistory = new EmailHistory_1.default(newHistory);
        newMHistory.save();
        return res.json({
            success: true,
            message: "Email Successfully sent.",
        });
    });
});
exports.sendEmail = sendEmail;
