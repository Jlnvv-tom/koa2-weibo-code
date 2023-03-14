/** 
 * @description user 数据格式校验
 * @author wujihuan
 */

 const validate = require('./_validate')

 // 校验规则
 const SCHEMA = {
    type: 'object',
    properties: {
      content: {
        type: 'string'
      }, 
      image: {
        type: 'string',
        maxLength: 255
      }
    }
 }
 
/**
 * 校验微博数据格式
 *
 * @param {*} [data={}] 微博数据
 * @return {*} 
 */
function blogValidate(data = {}){
   return validate(SCHEMA, data)
 }

 module.exports = blogValidate
