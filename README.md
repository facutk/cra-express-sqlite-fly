# cra-express-sqlite-fly

## Local dev
```
git clone git@github.com:facutk/cra-express-sqlite-fly.git
cd cra-express-sqlite-fly/api
npm start

# in other terminal
cd cra-express-sqlite-fly/api
npm start
```

- get fly token
```
flyctl auth token
```

- Configure fly.io secret at
https://github.com/facutk/cra-express-sqlite-fly/settings/secrets/actions

### test github actions locally
```
brew install act
```
then run

```
act --secret-file .env
```

## volumes

Make sure you have a volume
```
flyctl volumes list
```

If no volume is listed, check your region
```
flyctl regions list
```

And then create your volume
```
flyctl volumes create data --region gru --size 1
```

## sqlite
https://sqlitebrowser.org/dl/
https://sqlite.org/fiddle/index.html