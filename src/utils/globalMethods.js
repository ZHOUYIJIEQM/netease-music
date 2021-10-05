/**
* @description 一维数组转二维
* @param {Array} arr 要转换的数组
* @param {Number} num 二维数组每项包含几个
*/
export function arrTurnTwo(arr, num) {
  let temp = [],
    result = [];
  for (let i = 0; i < arr.length; i++) {
    temp.push(arr[i]);
    if (temp.length === num) {
      result.push(temp);
      temp = [];
    }
  }
  temp.length && result.push(temp);
  return result;
}