# Get Random Git

Returns a random gif from Giphy given a Tag

![](http://media2.giphy.com/media/l0MYIH1uwQf49mSFq/giphy.gif)

## Components

- Client: Google Chrome extension
- Server: Node web server to proxy Giphy API requests (Deployed in Heroku)

## Build

### Client

It requires NodeJS.

Open a shell in the project root and launch the following command:

```
npm run build
```

This will generate a zip that can be uploaded to Chrome Web Store Developer Dashboard

### Server

The project is made to work in Heroku, just create a new project and upload the hole project.