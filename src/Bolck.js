// 每一个存在的方格

export default class {
  constructor(postion, num) {
    this.postion = postion
    this.num = num
  }

  move(direction) {
    console.log(`move${direction}`)
  }
  boom() {
    console.log(`this is boom`)
  }
}