export const ContactSchema = {
    userId: uuid,  // Admin id to know which user created it ( Created by )
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    displayName: String,
    phoneNumber: String,
    inviteStatus: Boolean
};