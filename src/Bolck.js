// 每一个存在的方格

export default class {
  constructor(postion) {
    // 位置置顶的是在数组中的位置 ['在列的位置', '在行的位置']
    this.isBlank = true
    if (postion) {
      this.postion = postion
    }
    this.num = Math.random() > 0.5 ? 1 : 2
  }

  move(direction) {
    console.log(`move${direction}`)
  }
  boom() {
    console.log(`this is boom`)
  }
}