import dotenv from 'dotenv'

dotenv.config()
export default {
    persistence: process.env.PERSISTENCE,
    mongoURI: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DB_NAME,
    port: process.env.PORT || 8080,
    // email: process.env.EMAIL_TRANSPORT,
    // pass: process.env.PASS_TRANSPORT,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    jwtCookieName: process.env.COOKIE_NAME_JWT,
    cookieSecret: process.env.COOKIE_SECRET,

}