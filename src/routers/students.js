import { Router } from "express";
import { createContactController, deleteContactController, getAllContactsController, getStudentByIdController, patchContactController } from "../controllers/students";
import { ctrlWrapper } from "../utils/ctrlWrapper";
const router = Router();


router.get ("/contacts", ctrlWrapper(getAllContactsController));

router.get("/contacts/:contactsId", ctrlWrapper(getStudentByIdController));

router.post("/contacts", ctrlWrapper(createContactController));

router.patch("/contacts/:contactsId", ctrlWrapper(patchContactController));

router.delete("/contacts/:contactsId", ctrlWrapper(deleteContactController));

export default router;