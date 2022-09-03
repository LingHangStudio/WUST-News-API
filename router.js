const express = require('express');
const date = require('./spider');
const db = require('./sql')
// 创建路由对象
const router = express.Router()

let query_things = function (sql, values) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    db.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          // 结束会话
          connection.release();
        });
      }
    });
  });
};


// 挂载具体路由
router.post('/post/news-list', async(req, res) => {
  let {part,sub,num,page} = req.body
  let _page = page * num
  let newsList = await query_things(`SELECT id,title,time,href FROM my_data WHERE part = ${part} AND sub = ${sub} LIMIT ${_page} , ${num}`)

  for(let i =0 ; i<newsList.length;i++){
    var item = newsList[i];
    let _href = item.href;
    let _id = item.id;
    item.piclist = await query_things(
      `SELECT picture_url FROM picture WHERE href = '${_href}'`
    );
  }

  // console.log(newsList);
  
  res.send({
    part,
    sub,
    num,
    page,
    "databaseUpdateTime": date,
    newsList,
  })
})

router.post('/post/news-content', async(req, res) => {
  let id = req.body.id
  let news_content = await query_things(`SELECT data,title,time,href FROM my_data WHERE id = ${id} `)
  for(let i =0 ; i<news_content.length;i++){
    var item = news_content[i];
    let _href = item.href;
    let _id = item.id;
    item.piclist = await query_things(
      `SELECT picture_url FROM picture WHERE href = '${_href}'`
    );
    item.fileList = await query_things(
      `SELECT appendix,appendix_title FROM appendix WHERE href = '${_href}'`
    );
  }

  
  res.send({
    id,
    news_content,
  })
})

router.post('/post/house-sub', async(req, res) => {
  let {house} = req.body
  let info = [] 

  if(house == 1){
    info = [
      {
      "sub1":1,
      "name":"公告栏"
      },
      {
      "sub1":2,
      "name":"学院新闻"
      },
      {
      "sub1":3,
      "name":"学工动态"
      },
      {
      "sub1":4,
      "name":"学术交流"
      },
      {
      "sub1":5,
      "name":"实验室安全"
      },
    ]
  }
  else if(house == 2){
    info = [
      {
      "sub1":1,
      "name":"学院新闻')"
      },
      {
      "sub1":2,
      "name":"通知公告"
      },
      {
      "sub1":3,
      "name":"人才培养"
      }, 
    ]
  }
  else if(house == 3){
    info = [
      {
      "sub1":1,
      "name":"学院要闻')"
      },
      {
      "sub1":2,
      "name":"通知公告"
      },
      {
      "sub1":3,
      "name":"学术动态"
      },
      {
        "sub1":4,
        "name":"学子家园"
      },
    ]
  }
  else if(house == 4){
    info = [
      {
      "sub1":1,
      "name":"新闻动态')"
      },
      {
      "sub1":2,
      "name":"公告栏"
      },
      {
      "sub1":3,
      "name":"教学信息"
      }, 
    ]
  }
  else if(house == 5){
    info = [
      {
      "sub1":1,
      "name":"学院要闻')"
      },
      {
      "sub1":2,
      "name":"通知公告"
      },
      {
      "sub1":3,
      "name":"教学动态"
      }, 
    ]
  }
  else if(house == 6){
    info = [
      {
      "sub1":1,
      "name":"学院新闻')"
      },
      {
      "sub1":2,
      "name":"学术交流"
      },
      {
      "sub1":3,
      "name":"通知公告"
      },
      {
      "sub1":4,
      "name":"教育教学"
      },
      {
      "sub1":5,
      "name":"师生动态"
      },
    ]
  }
  else if(house == 7){
    info = [
      {
      "sub1":1,
      "name":"学院新闻')"
      },
      {
      "sub1":2,
      "name":"通知公告"
      },
      {
      "sub1":3,
      "name":"党建工作"
      }, 
    ]
  }
  else if(house == 8){
    info = [
      {
      "sub1":1,
      "name":"学院新闻')"
      },
      {
      "sub1":2,
      "name":"教学动态"
      },
      {
      "sub1":3,
      "name":"通知公告"
      },
      {
      "sub1":4,
      "name":"科研动态"
      },
    ]
  }
  else if(house == 9){
    info = [
      {
      "sub1":1,
      "name":"通知公告')"
      },
      {
      "sub1":2,
      "name":"校园短波"
      },
      {
      "sub1":3,
      "name":"理论广角"
      },
      {
        "sub1":4,
        "name":"社会聚焦"
      },
    ]
  }
  else if(house == 10){
    info = [
      {
      "sub1":1,
      "name":"新闻头条')"
      },
      {
      "sub1":2,
      "name":"最新公告"
      },
    ]
  }
  else if(house == 11){
    info = [
      {
      "sub1":1,
      "name":"学院新闻')"
      },
      {
      "sub1":2,
      "name":"通知公告"
      },
      {
      "sub1":3,
      "name":"管理制度"
      },
      {
      "sub1":4,
      "name":"学术交流"
      },
      {
      "sub1":5,
      "name":"科研动态"
      },
    ]
  }
  else if(house == 12){
    info = [
      {
      "sub1":1,
      "name":"新闻动态')"
      },
      {
      "sub1":2,
      "name":"党建工作"
      },
      {
      "sub1":3,
      "name":"通知公告"
      }, 
    ]
  }
  else if(house == 13){
    info = [
      {
      "sub1":1,
      "name":"公示公告')"
      },
      {
      "sub1":2,
      "name":"综合新闻"
      },
      {
      "sub1":3,
      "name":"党建工作"
      },
      {
      "sub1":4,
      "name":"学生工作"
      }, 
    ]
  }
  else if(house == 14){
    info = [
      {
      "sub1":1,
      "name":"公告栏')"
      },
      {
      "sub1":2,
      "name":"新闻动态"
      },
      {
      "sub1":3,
      "name":"师生风采"
      }, 
    ]
  }
  else if(house == 15){
    info = [
      {
      "sub1":1,
      "name":"通知公告')"
      },
      {
      "sub1":2,
      "name":"学院新闻"
      }, 
    ]
  }
  else if(house == 16){
    info = [
      {
      "sub1":1,
      "name":"通知公告')"
      },
      {
      "sub1":2,
      "name":"学院新闻"
      },
      {
      "sub1":3,
      "name":"科研通知"
      }, 
      {
        "sub1":4,
        "name":"学团动态"
      }, 
    ]
  }
  else if(house == 17){
    info = [
      {
      "sub1":1,
      "name":"通知公告')"
      },
      {
      "sub1":2,
      "name":"学院新闻"
      },
    ]
  }
  else if(house == 18){
    info = [
      {
      "sub1":1,
      "name":"通知公告')"
      },
      {
      "sub1":2,
      "name":"教学动态"
      },
      {
      "sub1":3,
      "name":"学工动态"
      }, 
      {
        "sub1":4,
        "name":"科研动态"
      },
    ]
  }
  
  res.send({
    info,
    house
  })

})

router.post('/post/house-news',async(req, res) => {
  let {house,sub,num,page} = req.body
  let _page = page * num
  let house_news = await query_things(`SELECT id,title,time,href FROM my_data WHERE part = ${house} AND sub = ${sub} LIMIT ${_page} , ${num}`)

  for(let i =0 ; i<house_news.length;i++){
    var item = house_news[i];
    let _href = item.href;
    let _id = item.id;
    item.piclist = await query_things(
      `SELECT picture_url FROM picture WHERE href = '${_href}'`
    );
    item.fileList = await query_things(
      `SELECT appendix,appendix_title FROM appendix WHERE href = '${_href}'`
    );
  }

  
  res.send({
    house,
    sub,
    num,
    page,
    "databaseUpdateTime": date,
    house_news,
  })
})

router.post('/post/search-news', async(req, res) => {
  let keyword = req.body.keyword
  let search_news = await query_things(`SELECT id,title,time,href FROM my_data WHERE title LIKE "%${keyword}%" `)

  for(let i =0 ; i<search_news.length;i++){
    var item = search_news[i];
    let _href = item.href;
    let _id = item.id;
    item.piclist = await query_things(
      `SELECT picture_url FROM picture WHERE href = '${_href}'`
    );
    item.fileList = await query_things(
      `SELECT appendix,appendix_title FROM appendix WHERE href = '${_href}'`
    );
  }

  
  res.send({
    keyword,
    search_news,
  })
})


router.get('/status',(req,res)=>{
    res.send({
      "status": "running"
    })
})

// 向外导出路由对象
module.exports = router