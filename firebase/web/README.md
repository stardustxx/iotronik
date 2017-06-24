This is a website built in React with Firebase that client will use to view images that are taken by the security system and get notifications.

## Before you start
Please make sure you have the Node and npm installed. When you do, simply run
```
npm install
```
or you prefer yarn
```
yarn add
```
in your terminal or command.   
Once it's finished installing all the dependencies, you can run
```
npm start
```
or using yarn
```
yarn run start
```
to have a development site running on your local.

## Build for production
Normally, to build for production, simply run
```
npm run build
```
or
```
yarn run build
```
However, at the moment it only runs on macOS or Linux, not on Windows. It needs to copy the files from web/build into firebase/public so it uses shell command for that.

## Note
In development environment, you can manually test the site by uploading image and see if Firebase Cloud Functions are functional. However you would need to run the server code in Raspberry Pi locally because it's also testing if that server code is operational.