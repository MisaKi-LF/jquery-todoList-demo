# toDolist demo项目知识点 #

## 1. JavaScript 储存对象 ##

### sessionStorage(会话储存) ###
sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据

### localStorage(本地储存)(以字符串形式储存至本地) ###
localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除

## 2. JSON转换方法 ##

### JSON.parse(text) ###
JSON.parse() 方法，将字符串转换成为JavaScript对象

### JSON.stringify() ###
JSON.stringify方法，将JavaScript 对象转换为字符串