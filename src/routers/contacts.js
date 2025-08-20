import { Router } from "express";
import { getAllContactsController, getContactsByIdController, pingController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactController, deleteContactController, updateContactController, replaceContactController } from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema } from "../validation/contacts.js";
import { updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get('/', ctrlWrapper(pingController));
router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:id', isValidId, ctrlWrapper(getContactsByIdController));

router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));

router.patch('/contacts/:id', isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContactController));

router.put('/contacts/:id', isValidId, validateBody(updateContactSchema), ctrlWrapper(replaceContactController));


export default router;
