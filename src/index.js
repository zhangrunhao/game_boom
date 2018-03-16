import content from './html/template.html'
import tpl from 'mini-tpl'
const data = [{ name: 'tom', age: 12 }, { name: 'lily', age: 24 }, { name: 'lucy', age: 55 }];
var res = tpl(content, data)
document.getElementById('app').innerHTML = res
import './style/style.css'









import Block from './Bolck' // 

var block = new Block({
  a: 1,
  b: 1,
  c: 1,
  d: 1
}, 2)

block.move('r')


