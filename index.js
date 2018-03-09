var c = document.getElementById("myCanvas")
var ctx = c.getContext("2d")
ctx.font = '40px Tahoma'

// 各种状态, 表示进行到哪一步了.
var status_left = -1 // 状态_左_
var status_up = -2 // 状态_上_
var status_right = -3 // 状态_右_

var status_begin = 1 // 状态_开始_
var status_normal = 2 // 状态_正常_

var status_beginDown = 3 // 状态_开始下落_
var status_downning = 4 // 状态_下落中_

var status_endDown = 14 //--> top 爆炸 end // 状态_结束下落_

var status_boom = 15 // 状态_爆炸_
var status_bomming = 16 // 状态_爆炸中_

var status_endBomm = 26 //--> 开始下落 // 状态_爆炸结束_
var status_gameOver = 27 // 状态_游戏结束_




var downEndFlag = 0 // 结束下落标记
var nowTime = 0 // 现在时间
var showBloxLocationX = 1 // 出现X方块位置
var status = 1 // 状态
var map = new Array(54 + 1).fill(0) // 一个长度为55的数组, 全部元素为0 , 具体不理解这个地图作用

// 开始动画
var toAnimaition = function (item, x, y) { // 保存整个动画执行信息
  item.positionStart = {
    x: item.x,
    y: item.y
  }
  item.positionEnd = {
    x: x,
    y: y
  }
  item.startAnimationTime = nowTime
}

// 结束
var end = function (item, index) {
  if (!item.idEnd) {
    item.idEnd = true
    item.toxy = {
      x: index % 6,
      y: ~~(index / 6) // 进行类型转换, 其他类型按按照布尔型, 转成对应的0和1
    }
  }
}

// 监听键盘按下
onkeydown = function (event) {
  var keyCode = event.keyCode 
  if (status == status_normal) { // 只有在正常情况下, 按下了才能管用
    // 根据按下的按键, 给出当前状态
    status = 
      keyCode == 65 && showBloxLocationX != 0 ? status_left : 
      keyCode == 87 ? status_up : 
      keyCode == 68 && showBloxLocationX !=3 ? status_right : 
      keyCode == 83 && status_begin ? status_beginDown : 
      status_normal
  }
}

// 填充颜色
var setColor = function (num, flag) {
  ctx.fillStyle = 'hsl(' + num * 35 + ',40%,' + flag + '%)'
}

let count = 0

var render = function () { // 渲染函数
  ctx.fillStyle = 'rgba(0,0,0,0.2)' // 绘制底色
  ctx.fillRect(0, 0, 300, 500) // 绘制大小

  nowTime++ // 当前时间前进一步

  // 定义数组, 应该是我们的那三个小方块
  var myArr = new Array(6).fill(0)

  downEndFlag = status_begin // 开始执行一个渲染动画, 状态为开始

  var flag = 1 // 标记

  map.forEach((item, index, arr) => { // 55元素, 循环处理
    // 其实每一个元素, 代表了一个格子

    x = index % 6 // 每六个为一个模块组 0~5 在每一行中的位置

    if (index > 47 && status < 0) { // 我猜是第一行,  状态是左右上的时候, 也就是向左右上移动的时候
      myArr[x] = map[index]
      myArr[x+1] = map[index+1]

      // 左右 左:1 右:-1 
      var directionFlag = status == status_left ? 1 : status == status_right ? -1 : 0

      // 上 // 更改三个方块的位置
      if (status == status_up) {
        if (directionFlag && item) {
          
        }
      }
    }

    // 开始状态, 48 49 50 三个位置就是 我们方块初始所在的位置, 渲染输出三个方块的位置
    if (status == status_begin && index > 47 + showBloxLocationX && index < 51 + showBloxLocationX) {
      map[index] = { // 三个初始随机出现方块的信息
        x: x,
        y: 10,
        num: Math.random() > 0.5 ? 1 : 2,
        idEnd: false,
        toxy: 0
      }
      toAnimaition(map[index], x, 8) // 起初三块动画出现的动画??
    }

    if (item) { // 如果item是0的话, 就证明这个方格没有东西, 就不会填上

      if (status == status_beginDown) { // 开始下落
        map[index] = 0 // 开始下落的时候, 当前这三块就是0
        if (!item.isEnd) { // 如果还没有结束的话, 
          // todo: 这一段没有理解
          map[myArr[x] * 6 + x] = item // 把当前的这个元素, 赋值过去? 
          toAnimaition(item, x, myArr[x]++)
        }
      }

      if (status == status_boom && item.isEnd && item.toxy) { // 爆炸的同时, 这个模块不再移动, 到达一个XY位置
        toAnimaition(item, item.toxy.x, item.toxy.y)
      }


      if (status == status_endBomm && item.isEnd && !item.toxy) { // 爆炸结束
        item.isEnd = 0
        v.num++ // 当前这个i加一
      }

      if (status == status_endDown) { // 下落结束后, 开始计算是否爆炸
        // 循环这个方块的周围
        for (var i = 0; i < (x == 0 || x == 5 ? 1 : 4); i++) { // 如果是第一个, 或者最后一个, 就判断一次就好了

          // 这两步操作, 应该是匹配出在这个方块周围四条线上的方块, 看看是不是一样的
          var tempArr = [6, 1, 7, -5]
          var a = map[index + tempArr[i]]
          var b = map[index + tempArr[i]]

          //找到相同的, 并进行爆照处理
          if (a && b && a.num == item.num && b.num == item.num) {
            item.isEnd = true
            item.toxy = 1
            end(a, index)
            end(b, index)
            downEndFlag = status_boom
          }
        }
        if (index > 47 && downEndFlag != status_boom) { // 走到最上面后, 发现当前并没有发生爆炸
          downEndFlag = status_gameOver // 游戏结束
        }
      }
      // 如果不是最上面一行  或者 游戏没有结束,  不清楚如何通过时间控制的闪烁
      if (index < 47 || status != status_gameOver || nowTime % 40 > 20) {

        // 不清楚具体绘制规则
        // 动画
        var per = (nowTime - item.startAnimationTime) / 10
        if (per > 1) {
          per = 1
        }
        item.x = item.positionStart.x + (item.positionEnd.x - item.positionStart.x) * per
        item.y = item.positionStart.y + (item.positionEnd.y - item.positionStart.y) * per

        // 绘制
        x = 50 * item.x
        y = 450 - 50 * item.y
        var num = item.num

        // 画笔颜色
        setColor(num, 65)
        // 画个边框
        ctx.fillRect(x, y, 50, 50)

        // 画笔颜色
        setColor(num, 20)
        // 画个文字
        ctx.fillText(item.num, x + 12, y + 40)
      }

    }
  })

  status = status < 0 ? status_normal : // 动画结束, 在左右上, 那么就是正常状态
    status == status_normal || status == status_gameOver ? status : // 如果状态就是正常, 或者已经游戏结束了, 那就维持现状
    status == status_endDown ? downEndFlag : // 如果状态为下落结束, 那么此刻的状态应为下落结束标记
    status == status_endBomm ? status_beginDown : // 如果是爆炸结束状态,  那么此刻的状态为开始下落,,  爆炸结束, 必然开始下落
    status + 1 // 如果既不是左右上, 又不是正常, 游戏结束, 下落结束, 爆炸结束的话, 就让状态+1 // 这个就是动画还在进行中, 所以继续+1进行动画
  requestAnimationFrame(render)
}
render()