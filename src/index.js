import './style/style.css'


// 创造地图
const row = 6
const col = 9
var mapArr = new Array
for(let i = 0 ; i < col; i++) {
  mapArr.push(new Array(row).fill(new Object))
}
console.log(mapArr)





// 渲染函数
// 根据地图生成指定DIV
var html = require('./html/template.art')(mapArr)
document.getElementById('app').innerHTML = html








