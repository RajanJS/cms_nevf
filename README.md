# Contact Management System Prototype

Contact Management System Prototype using Node.js, Express.js, Vue.js and Firebase

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Built With

- [Node.js](https://nodejs.org/en/docs/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Swagger](https://swagger.io/) - Simplify API development for users, teams, and enterprises with the Swagger open source and professional toolset.
- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Bootstrap.vue](https://bootstrap-vue.js.org/) - With BootstrapVue you can build responsive, mobile-first, and ARIA accessible projects on the web using Vue.js and the world's most popular front-end CSS library — Bootstrap v4.
- [Firebase Authentication](https://firebase.google.com/docs/auth) - Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app.
- [Cloud Firestore](https://firebase.google.com/docs/firestore) - Flexible, scalable NoSQL cloud database to store and sync data for client- and server-side development.
- [Firebase Hosting](https://firebase.google.com/docs/hosting) - Firebase Hosting provides fast and secure hosting for your web app, static and dynamic content, and microservices.
- [Cloud Functions](https://firebase.google.com/docs/functions) - Cloud Functions for Firebase let you automatically run backend code in response to events triggered by Firebase features and HTTPS requests.

### Demo

- [CMS-NEVF](https://cms-nevf.web.app)

### Prerequisites

What things you need to install the software and how to install them

- [Node.js](https://nodejs.org/en/download/) - Download the Node.js source code or a pre-built installer for your platform, and start developing today.
- [Firebase CLI](https://firebase.google.com/docs/cli) - The Firebase CLI (GitHub) provides a variety of tools for managing, viewing, and deploying to Firebase projects.

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

### Backend Folder:

`cms_nevf_api_node_v10` (Compatible with Node.js v8 - v10 with function hosting)

`cms_nevf_api_node_v12` (Compatible with Node.js v10+)

### Frontend Folder:

`cms_nevf_web_vue_v2` ( using Vue.js v2 with firebase hosting)

# Usage

### Backend

```
    # clone the repo
    $ git clone https://github.com/RajanJS/cms_nevf.git

    ## For "cms_nevf_api_node_v10"

    # go into app's directory
    $ cd cms_nevf/cms_nevf_api_node_v10/functions

    # install dependencies
    npm install

    # serve locally
    npm start

    ## For "cms_nevf_api_node_v12"

    # go into app's directory
    $ cd cms_nevf/cms_nevf_api_node_v12/

    # install dependencies
    npm install

    # serve locally
    npm start


NOTE:

For local start you have to add the google account service credentials;

# For functions project (cms_nevf_api_node_v10);
cms_nevf/cms_nevf_api_node_v10/functions/config/[adminServiceAccount].json
cms_nevf/cms_nevf_api_node_v10/functions/config/[clientServiceAccount].json

# For functions project (cms_nevf_api_node_v12);
cms_nevf/cms_nevf_api_node_v12/config/[adminServiceAccount].json
cms_nevf/cms_nevf_api_node_v12/config/[clientServiceAccount].json
```

> ### Note:
>
> API Swagger Doc [URL]/api/docs/v1/
>
> Swagger Doc Prototype: [Contact API Doc Sample](https://us-central1-cms-nevf.cloudfunctions.net/app)
>
> You can get Client Service account credentials form [Firebase Console](https://console.firebase.google.com/) for clientServiceAccount.json (firebaseConfig)
>
> You can get Admin Service account credentials form [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) for adminServiceAccount.json

### Frontend

```
    # clone the repo
    $ git clone https://github.com/RajanJS/cms_nevf.git

    # go into app's directory
    $ cd cms_nevf/cms_nevf_web/

    # install dependencies
    npm install

    # serve with hot reload at localhost:8080
    npm start

    # build for production with minification
    npm run build
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Rajan Maharjan** - [Rajan Maharjan Github](https://github.com/RajanJS)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Thanks!
