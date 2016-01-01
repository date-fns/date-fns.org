# date-fns.org
[![Build Status](https://travis-ci.org/date-fns/date-fns.svg?branch=master)](https://travis-ci.org/date-fns/date-fns) [![Backlog](https://badge.waffle.io/date-fns/date-fns.org.svg?label=Backlog&title=Backlog)](http://waffle.io/date-fns/date-fns.org)

[date-fns.org](https://date-fns.org) is [date-fns library](https://github.com/date-fns/date-fns)
homepage.
It provides information about key library features,
the comprehensive documentation, and all the related links.

date-fns.org is built using [React](http://facebook.github.io/react),
powered by [webpack](http://webpack.github.io/) and [Babel](https://babeljs.io).

## Contributing

### Prepare

1. [Install Node.js](https://nodejs.org/en/download)
2. Clone the repo
3. Run `npm install` to install application dependecies

### Run Locally

To start the application locally, run:

```sh
npm start
```

It starts the dev server at [localhost:5000](http://localhost:5000).

The port could be ovveriden using `APP_PORT` environment variable.



### Deploy

date-fns.org is a static application; in other words, when it's built, it's just
a bunch of JS, CSS, image files, etc.

[Firebase Hosting](https://www.firebase.com) is used for the production.

The application is automatically deployed on a master branch push.

To be able to deploy the application locally, you'll need to get Firebase token
and export it as an environment variable:

```sh
export FIREBASE_TOKEN="YOUR_FIREBASE_TOKEN"
```

To initiate deploy, run:

```sh
npm run deploy
```

It will:

1. Install the latest date-fns version
2. Build the application
3. Deploy it to Firebase

## License

MIT
