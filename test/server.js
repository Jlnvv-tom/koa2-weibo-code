
/** 
 * @description jest server
 * @author wujihuan 
 */
const request = require('supertest');
const server = require('../src/app').callback()

module.exports = request(server)
