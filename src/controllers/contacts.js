import { getContactsById, getAllContacts, createContact, deleteContact, updateContact, replaceContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';



export const getAllContactsController = async (req, res) => {
    console.log("getAllContactsController called");
    
    const {page, perPage} = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const userId = req.user._id;
    const contacts = await getAllContacts({page, perPage, sortBy, sortOrder, userId});
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts
    });
};

export const getContactsByIdController = async (req, res) => {
    const contactId = req.params.id;
    const userId = req.user._id; 
    const contact = await getContactsById(contactId, userId);
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, contactType, email } = req.body;

    if (!name || !phoneNumber || !contactType) {
      throw createHttpError(400, 'Missing contact name, phone number, or contact type');
    }

    const userId = req.user._id;
    const photo = req.file;
    let photoUrl;

    if (photo) {
      if (getEnvVar("ENABLE_CLOUDINARY") === "true") {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const newContact = await createContact({
      name,
      phoneNumber,
      contactType,
      email,
      userId,
      ...(photoUrl && { photo: photoUrl }), 
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};
export const deleteContactController = async (req, res) => {
    const contactId = req.params.id;
    const userId = req.user._id; 
    const deletedContact = await deleteContact(contactId, userId);

    if (!deletedContact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).json({
        status: 204,
        message: `Successfully deleted contact with id ${contactId}!`,
        data: deletedContact,
    });
};

export const updateContactController = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const userId = req.user._id;
    const photo = req.file;

    let photoUrl;

    if (photo) {
      if (getEnvVar("ENABLE_CLOUDINARY") === "true") {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const updatedContact = await updateContact(contactId, userId, {
      ...req.body,
      ...(photoUrl && { photo: photoUrl }), 
    });

    if (!updatedContact) {
      return next(createHttpError(404, "Contact not found"));
    }

    res.status(200).json({
      status: 200,
      message: `Successfully patched a contact with id ${contactId}!`,
      data: updatedContact,
    });
  } catch (err) {
    next(err);
  }
};

export const replaceContactController = async (req, res) => {
    const contactId = req.params.id;
    const userId = req.user._id; 
    const replacedContact = await replaceContact(contactId, userId, req.body);

    if (!replacedContact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: 200,
        message: `Successfully replaced contact with id ${contactId}!`,
        data: replacedContact,
    });
};
