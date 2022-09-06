const targetList = require('./targetList')
const xueyuanList = require('./xueyuanList')



var partDict = {
	1: "xuexiao",
	2: "jiaowu",
	4: "tuanwei"
}

var houseDict = {
	1: 'cailiaoyuyejinxueyuan',
	2: 'chengshijianshexueyuan',
	3: 'hengdaguanlixueyuan',
	4: 'guojixueyuan',
	5: 'huaxueyuhuagongxueyuan',
	6: 'jixiezidonghuaxueyuan',
	7: 'jisuanjikexueyujishuxueyuan',
	8: 'lixueyuan',
	9: 'makesizhuyixueyuan',
	10: 'qicheyujiaotonggongchengxueyuan',
	11: 'shengmingkexueyujiankangxueyuan',
	12: 'tiyuxueyuan',
	13: 'waiguoyuxueyuan',
	14: 'wenfayujingjixueyuan',
	15: 'xinxikexueyugongchengxueyuan',
	16: 'yixueyuan',
	17: 'yishuyushejixueyuan',
	18: 'ziyuanyuhuanjinggongchengxueyuan'
}


function tableName(type, part, sub) {
	if (type == 1) {
		var partName = partDict[part]
		if (partName == null) {
			return null
		}
		var subObj = targetList[partName][sub-1]
		if (subObj == null) {
			return null
		}
		var subName = subObj.name
		return `${partName}_${subName}`
	}
	else if (type == 2) {
		var houseName = houseDict[part]
		if (houseName == null) {
			return null
		}
		var subObj = xueyuanList[houseName][sub-1]
		if (subObj == null) {
			return null
		}
		var subName = subObj.name
		return `xueyuan_${houseName}_${subName}`
	}
}


module.exports = {
	tableName
}
