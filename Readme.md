### [Node.js client of bulkCache](https://github.com/alanyang/bulkCache)

### install
```
npm install bulk-node
```

### useage
```
'use strict'

const bulkClient = require('bulk-node')

const bulk = bulkClient(['127.0.0.1:1128', '10.25.197.70:1128'])

//promise
const ps = []
for(let i = 0 ; i bulkClient(serverlist)< 9; i++ ){
  ps.push(bulk.set('video_xxx', 'tag' + i, 120))
}

Promise.all(ps)
.then(r => bulk.getItems('user'))
.then(r => console.log(r))
.catch( console.error )

//callback
bulk.set('video_xxx', 'tag_xxxxx', 600, (err, r) => {
  if(!err) {
    bulk.get('user', (err, items) => console.log(items, err) )
  }
}) 
```


### API
bulkClient(serverlist) 
serverlist是一个服务器数组。返回一个bulk实例。
bulkCache通过客户端多写单读，实现简单的可靠性。

bulk.set(bulkname, value, expire, [callback])
- 向bulk里写数据
- bulkname => 桶名，不存在会自动创建
- value => 保存的值
- expire => 超时时间，单位秒
- callback 可选
- 返回promise


bulk.getItems(bulkname, [callback])
- bulkname => 桶名
- callback可选  (err, items) => {}
- 返回promise

