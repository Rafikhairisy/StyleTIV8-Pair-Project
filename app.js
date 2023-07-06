// Happy coding guys
const express = require('express')
const app = express()
const port = 1810
const router = require('./routers/router')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.get('/', (req, res) => {
    res.render('login')
})
app.get('/register', (req, res) => {
    res.render('register')
})


app.listen(port, () => {
    console.log(`I'm into you <3 :`, port);
})