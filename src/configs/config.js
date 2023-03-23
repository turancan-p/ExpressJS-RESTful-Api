const env = require("dotenv/config");

module.exports = {
  database: {
    mysql: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    postgress: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    mongodb: process.env.MONGODB_LINK,
  },
  AWS: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    region: process.env.AWS_S3_REGION,
    bucket: process.env.AWS_S3_BUCKET,
    endpoint: process.env.AWS_S3_ENDPOINT,
  },
  jwtSecret: process.env.JWT_SECRET,
  headerSecret: process.env.HEADERS_SECRET,
  port: process.env.PORT,
  httpLink: "http://" + process.env.DOMAIN,
  httpsLink: "https://" + process.env.DOMAIN,
};
