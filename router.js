const express = require('express')
const database = require('./database')
const targetList = require('./store/targetList')
const xueyuanList = require('./store/xueyuanList')
const tableRouter = require('./store/tableRouter')



// 创建数据库连接实例
const db = database.database()
database.testDatabase(db)

// 创建路由对象
const router = express.Router()


router.post('/post/news-list', async function(req, res) {
	// 大类编号
	var part = req.body.part
	// 小类编号
	var sub = req.body.sub
	// 每页的新闻条数
	var num = req.body.num
	// 页数
	var page = req.body.page
	// 偏移
	var offset = page * num

	var dict = {
		1: "xuexiao",
		2: "jiaowu",
		4: "tuanwei"
	}
	var partName = dict[part]
	if (partName == null || targetList[partName][sub-1] == null) {
		// part, sub 不在范围内，无对应数据
		res.send({})
		return null
	}
	var subName = targetList[partName][sub-1].name
	var tb = `${partName}_${subName}`
	var rtnList = await database.queryPromise(
		db,
		`SELECT id, title, data, time, other FROM ${tb} ORDER BY id DESC LIMIT ${num} OFFSET ${offset}`
	)
	var newsList = []
	for (var idx = 0; idx < rtnList.length; idx += 1) {
		var news = rtnList[idx]
		var newsOther = JSON.parse(news.other)
		newsList.push({
			id: `1-${part}-${sub}-${news.id}`,
			title: news.title,
			date: JSON.parse(news.time),
			picList: newsOther.picList
		})
	}

	var resData = {
		part: part,
		sub: sub,
		num: num,
		page: page,
		newsList: newsList
	}
	res.send(resData)
})


router.post('/post/news-content', async function(req, res) {
	var id = req.body.id
	var typePartSubId = id.split('-')

	var tb = tableRouter.tableName(typePartSubId[0], typePartSubId[1], typePartSubId[2])
	if (tb == null) {
		res.send({})
		return null
	}
	var newsArr = await database.queryPromise(
		db,
		`SELECT title, time, data, href, other FROM ${tb} WHERE id = ${typePartSubId[3]} LIMIT 1`
	)
	var newsObj = newsArr[0]
	if (newsObj == null) {
		res.send({})
		return null
	}
	var newsOther = JSON.parse(newsObj.other)
	res.send({
		id: id,
		href: newsObj.href,
		title: newsObj.title,
		date: JSON.parse(newsObj.time),
		content: newsObj.data,
		picList: newsOther.picList,
		fileList: newsOther.fileList
	})
})


router.post('/post/house-sub', function(req, res) {
	// 学院编号
	var house = req.body.house
	var dict = [
		'cailiaoyuyejinxueyuan',
		'chengshijianshexueyuan',
		'hengdaguanlixueyuan',
		'guojixueyuan',
		'huaxueyuhuagongxueyuan',
		'jixiezidonghuaxueyuan',
		'jisuanjikexueyujishuxueyuan',
		'lixueyuan',
		'makesizhuyixueyuan',
		'qicheyujiaotonggongchengxueyuan',
		'shengmingkexueyujiankangxueyuan',
		'tiyuxueyuan',
		'waiguoyuxueyuan',
		'wenfayujingjixueyuan',
		'xinxikexueyugongchengxueyuan',
		'yixueyuan',
		'yishuyushejixueyuan',
		'ziyuanyuhuanjinggongchengxueyuan'
	]
	var subList = []
	var houseName = dict[house-1]
	if (houseName == null) {
		res.send({})
		return null
	}
	var originList = xueyuanList[houseName]
	for (var idx = 0; idx < originList.length; idx += 1) {
		subList.push({
			sub: originList[idx].sub,
			name: originList[idx].cnName
		})
	}
	
	res.send({
		house: house,
		subList: subList
	})
})


router.post('/post/house-news', async function(req, res) {
	// 学院编号
	var house = req.body.house
	// 小类编号
	var sub = req.body.sub
	// 每页的新闻条数
	var num = req.body.num
	// 页数
	var page = req.body.page
	// 偏移
	var offset = page * num

	var tb = tableRouter.tableName(2, house, sub)
	if (tb == null) {
		res.send({})
		return null
	}
	var rtnList = await database.queryPromise(
		db,
		`SELECT id, title, data, time, other FROM ${tb} ORDER BY id DESC LIMIT ${num} OFFSET ${offset}`
	)
	var newsList = []
	for (var idx = 0; idx < rtnList.length; idx += 1) {
		var news = rtnList[idx]
		var newsOther = JSON.parse(news.other)
		newsList.push({
			id: `2-${house}-${sub}-${news.id}`,
			title: news.title,
			date: JSON.parse(news.time),
			picList: newsOther.picList
		})
	}

	var resData = {
		house: house,
		sub: sub,
		num: num,
		page: page,
		newsList: newsList
	}
	res.send(resData)
})


router.get('/status',(req,res)=>{
		res.send({
			"status": "running"
		})
})

// 向外导出路由对象
module.exports = router