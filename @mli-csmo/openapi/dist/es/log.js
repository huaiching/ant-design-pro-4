import chalk from 'chalk';
var Log = function Log() {
  for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }
  return console.log("".concat(chalk.blue('[openAPI]'), ": ").concat(rest.join('\n')));
};
export default Log;