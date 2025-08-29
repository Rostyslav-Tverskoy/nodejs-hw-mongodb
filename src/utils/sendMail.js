import nodemailer from "nodemailer";
import { SMTP } from "../constants/index.js";
import { getEnvVar } from "../utils/getEnvVar.js";


const transporter = nodemailer.createTransport({
    host: getEnvVar(SMTP.SMTP_HOST),
    port: Number(getEnvVar(SMTP.SMTP_PORT)),
    auth: {
        user: getEnvVar(SMTP.SMTP_USER),
        pass: getEnvVar(SMTP.SMTP_PASSWORD),
    },
});



transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP connection failed:", error);
    } else {
        console.log("SMTP ready to send messages");
    }
});

export const sendEmail = async (options) => {
    return await transporter.sendMail(options);
};