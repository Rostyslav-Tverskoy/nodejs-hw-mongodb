import { Router } from "express";
import { getAllContactsController, getContactsByIdController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactController, deleteContactController, updateContactController, replaceContactController } from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema } from "../validation/contacts.js";
import { updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constants/index.js";

const router = Router();


router.use(authenticate);

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getAllContactsController));
router.get('/:id', checkRoles(ROLES.TEACHER, ROLES.PARENT), isValidId, ctrlWrapper(getContactsByIdController));

router.post('/', checkRoles(ROLES.TEACHER), validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/:id', checkRoles(ROLES.TEACHER), isValidId, ctrlWrapper(deleteContactController));

router.patch('/:id', checkRoles(ROLES.TEACHER, ROLES.PARENT), isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContactController));

router.put('/:id', checkRoles(ROLES.TEACHER), isValidId, validateBody(updateContactSchema), ctrlWrapper(replaceContactController));


export default router;
