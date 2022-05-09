//@ts-check
/**
 *
 * @returns {{[key:string]:any}}
 */
module.exports = function () {
  return {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',
  }
}
