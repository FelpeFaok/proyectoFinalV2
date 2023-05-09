import config from "../config/config.js";

//Registrar
export const register = async(req, res) => {
    res.render('sessions/register')
}
export const registerError = (req, res) => {
    res.redirect('/')
}

//Login
export const login = async(req, res) => {
    res.render('sessions/login')
}
export const loginError = async(req, res) => {
    if (!req.user) {
        return res.status(400).render('errors/base', { error: 'Invalid credentials' })
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
        social: req.user.social
    }
    
    res.cookie(config.jwtCookieName, req.user.token).redirect('/')
}

//Logout
export const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).render('errors/base', { error: err })

        res.clearCookie(config.jwtCookieName).redirect('/')
    })
}
//error
export const generalError = async (req, res) => {
    return res.status(500).render('errors/base', { error: "Error session" })
}
