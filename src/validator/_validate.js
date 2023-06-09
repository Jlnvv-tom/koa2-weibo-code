/** 
 * @description json schema 校验
*/

const Ajv = require('ajv')
const ajv = new Ajv()

/**
 * json schema 校验
 *
 * @param {*} schema josn schema 规则
 * @param {*} data  待校验的数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate
