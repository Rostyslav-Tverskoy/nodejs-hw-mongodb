import { Router } from "express";
import authRouter from "./auth.js";
import contactsRouter from "./contacts.js";
console.log("authRouter:", authRouter);

const router = Router();

router.use("/auth", authRouter);
router.use("/contacts", contactsRouter);

export default router;