import { Router } from "express";
import { getAllContactsController, getContactsByIdController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactController, deleteContactController, updateContactController, replaceContactController } from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema } from "../validation/contacts.js";
import { updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";


const router = Router();


router.use(authenticate);

router.get('/',  ctrlWrapper(getAllContactsController));
router.get('/:id', isValidId, ctrlWrapper(getContactsByIdController));

router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

router.patch('/:id', isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContactController));

router.put('/:id', isValidId, validateBody(updateContactSchema), ctrlWrapper(replaceContactController));


export default router;
