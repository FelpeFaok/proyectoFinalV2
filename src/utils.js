import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import config from './config/config.js'
import { fakerES } from '@faker-js/faker'
import nodemailer from 'nodemailer'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default __dirname

//transport email
export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.email,
        pass: config.pass
    }
})

//genera el jwt Token
export const generateToken = user => {
    const token = jwt.sign({user}, config.jwtPrivateKey, {expiresIn: '24h'})
    return token
}

// recoje el token de la cookie y ve si existe y si esta autorizado
export const authToken = (req, res, next) => {
    const authToken = req.cookies.coderCookieToken
    
    if(!authToken) return res.status(401).render('errors/base', {error: 'No aAuth'})
    jwt.verify(token, config.jwtPrivateKey, (error, credentials) => {
        if(error) return res.status(403).render('errors/base', {error: 'No authorized'})
        req.user = credentials.user
        next()
    })
}

export const validateTokenAndGetID = (req, res, next) => {
    const token = req.params.jwt;
    jwt.verify(token, config.private_key, (error, credentials) => {
        if (error) return res.render('session/restore', { message: "token expired" })
        req.id = credentials.user;
        next();
    })
}

//extrae la cookie
export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[config.jwtCookieName] : null
}
// Crea una password
export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

// Tecnica para pasar cualquier strategia de registro (local o github) se validarian con JWT
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if(err) return next(err)
            if(!user) return res.status(401).render('errors/base', {error: info.messages ? info.messages : info.toString()})

            req.user = user
            next()
        })(req, res, next)
    }
}

// VALIDATE AUTHORIZATION
export const authorization = (aRole) => {
    return async (req, res, next) => {
        const user = req.user.user;
        if (!user) return res.status(401).send({ error: "NO AUTORIZADO" });
        if (aRole.includes(user.role)) return res.status(403).send({ error: 'SIN PERMISO' })
        next();
    }
}

export const productsMock = (cant) =>{
    const products = [];
    for (let i = 0; i < cant; i++) {
        products.push(generateProduct());
    }
    return products;
}

export const generateProduct = () => {
    return {
        id: fakerES.database.mongodbObjectId(),
        title: fakerES.commerce.productName(),
        description: fakerES.commerce.productDescription(),
        price: fakerES.commerce.price(),
        status: true,
        stock: fakerES.string.numeric(1),
        category: fakerES.commerce.productMaterial(),
        thumbnails: [fakerES.image.url()],
    }
}