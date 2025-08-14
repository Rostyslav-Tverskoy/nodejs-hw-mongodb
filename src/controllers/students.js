import { createContact, deleteContact, getAllContacts, getContactsById, updateContact } from "../services/contacts";
import { createHttpError } from "http-errors";


export const getAllContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};


export const getStudentByIdController = async (req, res) => {
    const {contactsId} = req.params;
        const contact = await getContactsById(contactsId);
    
        if(!contact) {
            throw createHttpError(404, "Contact not found");
        }
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactsId}!`,
            data: contact,
        });
};


export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });
};


export const patchContactController = async (req, res, next) => {
const {contactsId} = req.params;
const result = await updateContact(contactsId, req.body);

if(!result) {
    next(createHttpError(404, "Contact not Found"));
    return;
}

res.json({
    status: 200,
    message: "Successfully patched a contact!",
	data: result.contact,
});
};

export const deleteContactController = async (req, res, next) => {
    const {contactsId} = req.params;

    const contact = await deleteContact(contactsId);
     
    if(!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    }
    res.status(204).send();
};

