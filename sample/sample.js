'use strict'

const bulkClient = require('../index')

const bulk = bulkClient(['127.0.0.1:1128', '10.25.197.70:1128'])

//promise
const ps = []
for(let i = 0 ; i < 9; i++ ){
  ps.push(bulk.set('video_id', JSON.stringify(tag), 120))
}

Promise.all(ps)
.then(r => bulk.getItems('video_id'))
.then(r => console.log(r))
.catch( console.error )

//callback
bulk.set('user', 'Sasha', 600, (err, r) => {
  if(!err) {
    bulk.get('user', (err, items) => console.log(items, err) )
  }
})