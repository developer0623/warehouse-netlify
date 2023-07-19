This is the Eclipse Material Handling App.

## How to build this project

This is an Ionic project. To set up a development environment you'll need to:

- Install the Ionic cli and confirm it via:

  ```bash
  $ npm i -g @ionic/cli@6.20.4
  $ ionic -v
  ```

- Download all dependencies

  ```bash
  $ npm install
  ```

## How to build and test the app in development

```bash
$ npm run serve:pwa
```

## How to build for release

First, please change `serverUrl` to whichever hosting service url you prefer in `src/environment/environment.pwa.ts`.

Then, if you are on mac, `$ npm run build:pwa`

If you are on windows, `$ npm run build:pwa`

Once it is finished you can copy the `www` directory (which it created) to some host. Most likely this is the `apps` folder of Eclipse Pro Server. Check the Pro side for those details.
