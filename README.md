# ExpressJS TS base project

A nice project with begin with Express + Typescript + Inversify

---

## Requirements

For development, you will need Node.js and install package.json dependencies.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer. Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.18.1

    $ npm --version
    8.1.3

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

---

## Install

    $ git clone https://github.com/MiguelPazo/express_base_ts
    $ cd express_base_ts
    $ npm install

## Configure app

For development purpose copy `.env.sample` as `.env` then edit it with your settings.

For unit testing purpose copy `.mocharc.js.sample` as `.mocharc.js` then edit it with your settings.

## Running project

    $ npm run dev

## Running unit testing

    $ npm run test

## Simple build for production

For this case we can use [PM2](https://pm2.keymetrics.io/) for keep daemon alive in production environment then you need to copy `env/dev.ecosystem.config.js.sample` as `dev.ecosystem.config.js` in project root path and edit it with your settings.

    $ npm run build
    $ cp ecosystem.config.js .build/
    $ cd .build/
    $ pm2 start ecosystem.config.js
    $ pm2 save
    $ pm2 startup

##

---

## Notes

If you want to use this project directly, you need to change next configurations:

- Project `name` in package.json
- Project `name` in ecosystem.config.js

Maybe you need to review next projects to understand it:

- https://www.npmjs.com/package/inversify-express-utils
- https://www.npmjs.com/package/tslog
- https://www.npmjs.com/package/mocha
- https://www.npmjs.com/package/nyc
