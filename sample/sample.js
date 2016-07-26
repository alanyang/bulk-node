'use strict'

const bulkClient = require('../index')

const bulk = bulkClient(['127.0.0.1:1128'])

const ps = []
for(let i = 0 ; i < 9; i++ ){
  ps.push(bulk.set('video', JSON.stringify({'asd':'asdad'}), 120))
}

Promise.all(ps)
.then(r => bulk.getItems('video'))
.then(r => {
  console.log(r)
  return bulk.remove('video')
})
.then(r => bulk.getItems('video'))
.then( console.log )
.catch( console.error )

//callback
// bulk.set('user', 'Ida', 600, (err, r) => {
//   if(!err) {
//     // bulk.getItems('user', (err, items) => console.log(items, err) )
//     // bulk.getItems('user', (err, items) => console.log(items, err) )
//   }
// })


// bulk.remove('video')
// bulk.getItems('video', (err, items) => {
//   console.log(items, '1') 
//   bulk.set('video',  JSON.stringify({'asd':'asdad'}), 1200, (err, r) => {
//     bulk.getItems('video', (err, items) => {
//       console.log(items, '2')
//       bulk.remove('video')
//       setTimeout(() => {
//         bulk.getItems('video', (err, items) => {
//           console.log(items, '3') 
//         })
//       }, 2000)
//     })
//   })
// })

// bulk.getItems('user', (err, items) => console.log(items) )
// bulk.getItems('user', (err, items) => console.log(items) )
// bulk.getItems('user', (err, items) => console.log(items) )
// bulk.getItems('user', (err, items) => console.log(items) )
// bulk.getItems('user', (err, items) => console.log(items) )
// bulk.getItems('user', (err, items) => console.log(items) )