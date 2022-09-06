const mysql = require('mysql')


function database() {
	const db = mysql.createPool({
		host: "127.0.0.1",
		user: "root",
		password: "admin123",
		database: "wust-news",
		port:"3306"
	})
	return db
}


async function testDatabase(db) {
	return new Promise(function(resolve) {
		db.query('SELECT 1', function(err, res) {
			if (err) {
				console.log(err.message)
			}
			else {
				console.log('Database link successfully.')
				resolve(res)
			}
		})
	})
}


// 提供数据库 Promise 形式的异步 API
async function queryPromise(db, statement, values) {
	return new Promise(function(resolve, reject) {
		db.query(statement, values, function(err, res) {
			if (err) {
				reject(err)
			}
			else {
				resolve(res)
			}
		})
	})
}


module.exports = {
	database,
	testDatabase,
	queryPromise
}
