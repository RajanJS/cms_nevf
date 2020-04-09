const { errorHandler } = require("../utils");
const ContactService = require('../services/contacts.service');

module.exports = function ContactsController() {
    this.contactService = new ContactService();

    this.getContacts = async (req, res, next) => {
        const url = `${req.protocol}://${req.hostname}:${req.app.get("port")}`;

        const limit = +req.query.limit;
        const offset = +req.query.offset;
        const filterIds = [];
        if (req.headers.uid) filterIds.push(req.headers.uid);
        if (req.headers.userid) filterIds.push(req.headers.userid);
        const contacts = await this.contactService.findContacts(limit || 0, offset || 0, filterIds, next);

        contacts ?
            res.json({ ...contacts, docs: contacts ? this.contactService.generateLinkedContacts(contacts.docs, url) : [] })
            : next(errorHandler("Couldn't get contacts"));
    };

    this.getContact = async (req, res, next) => {
        const url = `${req.protocol}://${req.hostname}:${req.app.get("port")}`;

        const contactId = req.params.id;
        contactId || next(errorHandler("Please enter a contact ID", 400));

        const result = await this.contactService.getContact(contactId);

        result ? res.json(this.contactService.generateLinkedContacts([{ ...result }], url).data[0])
            : next(errorHandler("Contact no found"));
    };

    this.postContact = async (req, res, next) => {

        const contact = req.body;
        contact || next(errorHandler("Please submit valid contact", 400));
        if (!contact.userId || !contact.email || !contact.firstName || !contact.phoneNumber) {
            return next(errorHandler("Please submit valid contact", 422));
        }

        const newContact = await this.contactService.postUserContact(contact, next);

        newContact
            ? res
                .status(201)
                .json({ message: "Contact created", data: newContact })
            : next(errorHandler("No contact created"));

    };

    this.putContact = async (req, res, next) => {

        const contactId = req.params.id;
        const contactUpdate = req.body;
        contactId || next(errorHandler("Please enter a contact ID", 400));
        contactUpdate || next(errorHandler("Please submit valid contact", 400));

        // if (!contactUpdate.lastName || !contactUpdate.email || !contactUpdate.firstName || !contactUpdate.phoneNumber) {
        //     return next(errorHandler("Please submit valid contact", 422));
        // }

        const updatedContact = await this.contactService.putUserContact(contactId, contactUpdate, next);

        updatedContact
            ? res.json({ message: "Contact updated" })
            : next(errorHandler("No data updated"));

    };

    this.deleteContact = async (req, res, next) => {

        const contactId = req.params.id;
        contactId || next(errorHandler("Please enter a contact ID", 422));

        const result = await this.contactService.deleteUserContact(contactId, next);

        result ? res.json({ message: "Contact deleted" })
            : next(errorHandler("No data deleted"));

    };

    this.deleteAllContact = async (req, res, next) => {
        const result = await this.contactService.deleteAllContacts(next);

        result.length > 0
            ? res.json({ message: "All contacts deleted" })
            : next(errorHandler("No data deleted"));
    };
};