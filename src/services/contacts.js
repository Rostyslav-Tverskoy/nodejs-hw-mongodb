import { ContactsCollection } from "../db/models/contactsSchema.js";

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
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