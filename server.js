const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.render('index')
})

app.get('/rankboard', (req, res) => {
	res.render('rankboard')
})

app.listen(PORT, () => {
	console.log('Server is listening to port 3000')
})
