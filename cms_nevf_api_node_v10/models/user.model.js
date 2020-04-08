export const UserSchema = {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    displayName: String,
    customClaims: {
        role: String,
        userId: uuid // Invited Admin uuid as it's sub user
    }
};