/**
 * Generate links related to entity
 * @param {*} entity
 * @param {string} url
 */
exports.generateSelf = ({ url, entity }) => {
    const self = [
        {
            href: `${url}/api/v1/contacts${entity ? `/${entity.id}` : "{?offset,limit}"}`,
            method: "GET",
            rel: "self"
        }
    ];

    if (entity) {
        const selfRef = [
            ...self,
            {
                href: `${url}/api/v1/contacts/${entity.id}`,
                method: "PUT",
                rel: "update"
            },
            {
                href: `${url}/api/v1/contacts/${entity.id}`,
                method: "DELETE",
                rel: "delete"
            }
        ];

        return selfRef;
    }
    return self;
};