import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import mongoose from "mongoose";
import productRouter from "./routes/products.router.js"
import productViewsRouter from "./routes/products.views.router.js"
import cartRouter from "./routes/cart.router.js"
import chatRouter from "./routes/chat.router.js"
import sessionRouter from "./routes/sessions.router.js"
import { MessageService } from "./repository/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cookieParser from "cookie-parser";
import initializePassport from "./config/passport.config.js";
import config from "./config/config.js";
import swaggerUiExpress from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';

import __dirname from "./utils.js"
import { passportCall } from "./utils.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(cookieParser(config.cookieSecret))
app.use(express.static(__dirname + "/public"))
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoURI,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 10000
    }),
    secret: 'topsecret',
    resave: true,
    saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

mongoose.set('strictQuery', false)
mongoose.connect(config.mongoURI, {
    dbName: config.mongoDbName
}, (error) => {
    if(error){
        console.log("DB No conected...")
        return
    }
    const httpServer = app.listen(config.port, () => console.log("Conectado..."))
    const socketServer = new Server(httpServer)
    httpServer.on("error", (e) => console.log("ERROR: " + e))

    app.use((req, res, next) => {
        req.io = socketServer
        next()
    })

    const swaggerOptions = {
        definition: {
            openapi: '3.0.1',
            info: {
                title: "Documentation E Commerce API",
                description: "Proyecto en crecimiento para CODERHOUSE"
            }
        },
        apis: [`${__dirname}/docs/**/*.yaml`]
    }
    
    const specs = swaggerJSDoc(swaggerOptions);
    app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

    app.use('/', productViewsRouter)
    app.use("/products", passportCall('jwt'), productRouter)

    app.use("/session", sessionRouter)

    app.use("/api/products",passportCall('jwt'), productRouter)
    app.use("/api/carts",passportCall('jwt'), cartRouter)
    app.use("/api/chat",passportCall('jwt'), chatRouter)


    socketServer.on("connection", socket => {
        console.log("New client connected")
        socket.on("message", async data => {
        await MessageService.create(data)
        let messages = await MessageService.get()
        socketServer.emit("logs", messages)
        })
    })


})
