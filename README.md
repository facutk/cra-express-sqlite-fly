# cra-express-sqlite-fly

## Local dev

```bash
# using node 16
git clone git@github.com:facutk/cra-express-sqlite-fly.git
cd cra-express-sqlite-fly/api
npm start

# in other terminal
cd cra-express-sqlite-fly/api
npm start
```

- login into fly.io

```bash
flyctl auth login
```

- get fly token

```bash
flyctl auth token
```

- add fly secret

```bash
flyctl secrets set SENDINBLUE_USERNAME=<your-email>
flyctl secrets set SENDINBLUE_PASSWORD=<your-password>
```

- Configure fly.io secret at
  [https://github.com/facutk/cra-express-sqlite-fly/settings/secrets/actions](https://github.com/facutk/cra-express-sqlite-fly/settings/secrets/actions)

### test github actions locally

```bash
brew install act
```

then run

```bash
act --secret-file .env
```

## volumes

Make sure you have a volume

```bash
flyctl volumes list
```

If no volume is listed, check your region

```bash
flyctl regions list
```

And then create your volume

```bash
flyctl volumes create data --region scl --size 1
```

## Preview

[https://morning-surf-1780.fly.dev/](https://morning-surf-1780.fly.dev/)

## sqlite

[https://sqlitebrowser.org/dl/](https://sqlitebrowser.org/dl/)
[https://sqlite.org/fiddle/index.html](https://sqlite.org/fiddle/index.html)
