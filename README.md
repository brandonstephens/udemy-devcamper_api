# Udemy - DevCamper API

API for DevCamper application from Udemy Node.js Masterclass.

<https://www.udemy.com/course/nodejs-api-masterclass/>
<https://github.com/bradtraversy/devcamper-api>

## Setup

**DO NOT COMMIT `config.env` TO REPO**

1. cp `config.env.example` `config.env`
2. update the contents of `config.env`

3. `nvm use`
4. `npm install`
5. `npm run dev`

## Production

[Droplet Setup](https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896)

```
npm start
```

Process Managment PM2
<https://pm2.keymetrics.io/docs/usage/process-management/>

### Version: 1.0.0

## Database Seeder

seed data

```
node seeder -i
```

delete data

```
node seeder -d
```

## Generate Docs

1. Install - <https://github.com/thedevsaddam/docgen>
2. Export json from Postman
3. `docgen build -i dc.postman_collection.json -o index.html`
4. copy `index.html` to `/public` dir
5. replace `../fonts` with `/fonts` in `index.html

## 3rd Party APIs

[Mapquest](https://developer.mapquest.com/user/me/apps)
[MailTrap]https://mailtrap.io
