import { apiHelper, handleResponse, requestOptions } from '@/_helpers';

const contactsURL = '/api/v1/contacts';

export const contactService = {
    addContact,
    getContacts,
    getContactById,
    updateContactById,
    deleteContactById
};

function addContact(data) {
    return apiHelper(`${contactsURL}`, requestOptions.post(data))
        .then(handleResponse).catch(handleResponse);
}

function getContacts() {
    return apiHelper(`${contactsURL}`, requestOptions.get())
        .then(handleResponse).catch(handleResponse);
}

function getContactById(id) {
    return apiHelper(`${contactsURL}/${id}`, requestOptions.get())
        .then(handleResponse).catch(handleResponse);
}

function updateContactById(id, data) {
    return apiHelper(`${contactsURL}/${id}`, requestOptions.put(data))
        .then(handleResponse).catch(handleResponse);
}

function deleteContactById(id) {
    return apiHelper(`${contactsURL}/${id}`, requestOptions.delete())
        .then(handleResponse).catch(handleResponse);
}