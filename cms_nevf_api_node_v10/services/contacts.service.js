import { errorHandler, generateSelf } from "../utils";
import ConfigService from "./config.service";
import FirebaseService from './firebase.service';

export default class ContactsService {
    #batch = FirebaseService.db.batch();
    #dbCollection = FirebaseService.db.collection('contacts');

    /**
     *
     * @param {object[]} contacts
     * @param {string} url
     */
    generateLinkedContacts(contacts, url) {
        return {
            data: contacts.map(contact => ({
                data: contact,
                links: generateSelf({
                    entity: contact,
                    url
                })
            })),
            links: generateSelf({ url })
        };
    }
    /**
     *
     * @param {number} offset page to query
     * @param {number} limit max number of documents per page
     * @param {import("express").NextFunction} next
     *
     */
    async findContacts(limit, offset, filterIds, next) {

        let docLength = await (await this.#dbCollection.where('userId', 'in', filterIds).get()).size;

        const totalPages = limit ? Math.round(docLength / limit) : 0;

        const pagination = {
            totalDocs: docLength,
            limit: limit,
            page: offset,
            totalPages,
            hasNextPAge: (offset < totalPages) && totalPages != 1,
            hasPrevPage: (offset - 1) >= 0,
            prevPage: (offset - 1) < 0 ? 0 : offset - 1,
            pagingCounter: 1
        }

        if (offset > totalPages) {
            return next(errorHandler("Page number does not exist", 422));
        }


        const contacts = [];
        const contactRef = await this.#dbCollection.where('userId', 'in', filterIds).limit(limit).offset(offset).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    contacts.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
            })
            .catch(err => {
                return next(errorHandler('Error getting documents'));
            });

        return { ...pagination, docs: contacts };
    }

    /**
      * @param {*} contactId
      */
    async getContact(contactId) {

        const contact = await (await this.#dbCollection.doc(contactId).get()).data();
        return { id: contactId, ...contact };
    }

    /**
    * Create new contact and associate it to admin (created by) user
    * @param {*} contactData
    * @param {import("express").NextFunction} next
    */
    async postUserContact(contactData, next) {
        // validate if contact with given email already exist
        const checkIfExist = await (await this.#dbCollection.where('email', '==', contactData.email).get()).docs.length;

        if (checkIfExist) {
            return next(errorHandler('Contact with given email already exist'));
        }

        contactData.timestamp = + new Date();
        contactData.inviteStatus = false;

        const newContact = await (await (await this.#dbCollection.add(contactData)).get()).data();
        return newContact;
    }

    /**
     *
     * @param {*} contactId
     * @param {*} updateContactData
     * @param {*} next
     */
    async putUserContact(contactId, updateContactData, next) {
        // check contact id in logged user contacts
        const checkIfExist = await (await this.#dbCollection.doc(contactId).get()).data();

        if (!checkIfExist) {
            return next(errorHandler(`Contact doesn't exist`));
        }

        if (checkIfExist) {
            const result = await this.#dbCollection.doc(contactId).update(updateContactData);

            return result;
        }
    }

    /**
     *
     * @param {*} contactId
     * @param {*} next
     */
    async deleteUserContact(contactId, next) {

        const checkIfExist = await (await this.#dbCollection.doc(contactId).get()).data();

        if (!checkIfExist) {
            return next(errorHandler(`Contact doesn't exist`));
        }

        return await this.#dbCollection.doc(contactId).delete();
    }

    /**
  *
  * @param {*} contactId
  * @param {*} next
  */
    async deleteAllContacts(next) {
        const querySnapshot = await this.#dbCollection.get();
        querySnapshot.forEach(doc => this.#batch.delete(doc.ref));
        return this.#batch.commit();
    }
}