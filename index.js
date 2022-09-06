const express = require("express")
const router = require('./router')


const app = express()

process.on('uncaughtException', function (err) {
	console.error(err)
	console.log("Node NOT Exiting...")
})

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
	next()
})


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', router)

app.listen(2000, () => {
		console.log("express server running at http://127.0.0.1:2000");
})
