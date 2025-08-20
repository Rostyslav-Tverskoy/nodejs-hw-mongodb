import { ContactsCollection } from "../db/models/contactsSchema.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";


export const getAllContacts = async ({page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy ="_id",}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    
    const contactsQuery = ContactsCollection.find();
    const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();
     

    const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactsById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export function createContact(payload) {
    return ContactsCollection.create(payload);
}

export function deleteContact(contactId) {
    return ContactsCollection.findByIdAndDelete(contactId);
}

export function updateContact(contactId, payload) {
    return ContactsCollection.findByIdAndUpdate(contactId, payload, { new: true });
}

export async function replaceContact(contactId, payload) {
    const result = await ContactsCollection.findByIdAndUpdate(contactId, payload, {
        new: true,
        upsert: true,
        includeResultMetadata: true,
    });

    return {
        value: result.value,
        updatedExisting: result.lastErrorObject.updatedExisting,
    };
}