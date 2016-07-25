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
for(let i = 0 ; i < 9; i++ ){
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