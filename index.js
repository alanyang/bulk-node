'use strict'

const request = require('request-promise')

function Bulk(servers, options) {
  options = options || {
    balance: 'poll',
    timeout: 800,
  }
  return {
    servers: servers.map( s => {
      return {addr: s.startsWith('http://') ? s: `http://${s}`, enabled: true}
    }),
    options,
    current: 0,

    alives() {
      return this.servers.filter( s => s.enabled)
    },

    pick() {
      const s = this.alives()
      const method = this.options.balance || 'poll'

      switch(method) {
        case 'rand':
        return s[parseInt(Math.random() * s.length)]
        case 'poll':
        default:
        ++this.current
        if(this.current >= s.length) {
          this.current = 0
        }
        return s[this.current]
      }
    },

    bad(addr) {
      this.servers = this.servers.map( s => {
        if(addr === s.addr) {
          s.enabled = false
        }
        return s
      })
    },

    getItems(bulk, callback) {
      const s = this.alives()
      return new Promise( (resolve, reject) => {
        if(s.length) {
          const svr = this.pick()
          request({
            uri: `${svr.addr}/bulk/${bulk}`,
            method: 'GET',
            timeout: this.options.timeout || 800,
            json: true
          })
          .then( json => {
            if(json.result == 0 ) {
              if(callback) {
                callback(null, json.items)
              }
              resolve(json.items)
            } else {
              throw `error code: ${json.status}`
            }
          })
          .catch( err => {
            this.bad(svr.addr)
            if(callback) {
              callback(err, null)
            }
            reject(err)
          })
        }
      })
    },

    set(bulk, value, expire, callback) {
      const s = this.alives()
      return new Promise( (resolve, reject) => {
        Promise.all( s.map(svr => {
          return request({
            uri: `${svr.addr}/bulk/${bulk}`,
            method: 'POST',
            form: {
              name: '',
              value,
              expire
            }
          })
        }))
        .then( r => {
          if(callback) {
            callback(null, r)
          } 
          resolve(r)
        })
        .catch(err => {
          if(callback) {
            callback(err, null)
          }
          reject(err)
        })
      })
    },
  }
}

module.exports = Bulk
