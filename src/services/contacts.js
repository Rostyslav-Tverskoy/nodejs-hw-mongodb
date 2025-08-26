import { ContactsCollection } from "../db/models/contactsSchema.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";


export const getAllContacts = async ({ page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = "_id", userId }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find({ userId });
    const contactsCount = await ContactsCollection.find({ userId }).countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactsById = async (contactId, userId) => {
    return ContactsCollection.findOne({ _id: contactId, userId });
};

export function createContact(payload) {
    return ContactsCollection.create(payload);
}

export function deleteContact(contactId, userId) {
    return ContactsCollection.findOneAndDelete({ _id: contactId, userId });
}

export function updateContact(contactId, userId, payload) {
    return ContactsCollection.findOneAndUpdate({ _id: contactId, userId }, payload, { new: true });
}

export async function replaceContact(contactId, userId, payload) {
    const result = await ContactsCollection.findOneAndUpdate(
        { _id: contactId, userId },
        payload,
        { new: true, upsert: true }
    );

    return result;
}
