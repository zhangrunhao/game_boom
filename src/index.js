import './style/style.css'
// import Bolck from './Bolck'

var Bolck = function (postion) {
  this.isBlank = true
  if (postion) {
    this.postion = postion
    this.num = Math.random() > 0.5 ? 1 : 2
  }
}

Bolck.prototype.move = function (direction) {
  console.log(direction)
}



// 创造地图
var creatMap = function () {
  const row = 6
  const col = 9
  var mapArr = new Array
  for (let i = 0; i < col; i++) {
    // mapArr.push(new Array(row).fill(new Object))
    mapArr.push(new Array(row).fill(new Bolck))
  }
  return mapArr
}
var mapArr = creatMap()


// 初始化前三个方块
var initBolck = function () {
  for (let i = 0; i < 3; i++) {
    var block = new Bolck({
      x: i + 1,
      y: 0
    })
    block.isBlank = false
    mapArr[block.postion.y][block.postion.x] = block
  }
}
initBolck()



// 渲染函数
// 根据地图生成指定DIV
var render = function (mapArr) {
  console.log(mapArr)
  var html = require('./html/template.art')(mapArr)
  document.getElementById('app').innerHTML = html
}
render(mapArr)