# ExpressJS-RESTful-Api

## Usage
1- run "npm i" from your terminal

2- npm start

## Example env file
Create a new file and name it .env

The content should be like this
```env
# for databases like mysql&postgres etc...
DB_HOST=dbhost
DB_USER=dbuser
DB_PASSWORD=dbpassword
DB_NAME=dbname
DB_PORT=dbport

# for mongodb
MONGODB_LINK=mongodblink

# for aws
AWS_ACCESS_KEY_ID=awsaki
AWS_ACCESS_KEY_SECRET=awsaks
AWS_S3_REGION=awsr
AWS_S3_BUCKET=awsb
AWS_S3_ENDPOINT=awse

# for jwt tokens
AUTH_SECRET=headersecret
REFRESH_SECRET=jwtsecret

HASH_ALGORITHM=aes-256-gcm
REFRESH_HASH_KEY=
IV=
# for custom port
PORT=3001

# for some shortcuts
# if you change it for your domain you can use it 
# like turan-can.com or api.turan-can.com etc.
# not www.turan-can.com or http://www.turan-can.com or https://turan-can.com/ etc.
DOMAIN=localhost
```
