- 变量
  - 使用@来定义变量
  - 变量可以给属性，选择器，URL，一套css样式
  - 变量可以进行运算
  - 作用域遵从就近原则
  - 变量可以定义变量



- 嵌套
  - &：代表上一层选择器的名字
  - 可以定义自己的私有样式默认参数
  - 嵌套指令冒泡  @media ??



- Mixins 混入
  - 无条件混入
  - 有条件混入 anguments
  - 默认参数

- 条件语句 when
  - when xx and  xx
  - when not xx
  - when xx , xx

- 继承 extend

```html
.animation{
    transition: all .3s ease-out;
    .hide{
      transform:scale(0);
    }
}
#main{
    &:extend(.animation);
}
#con{
    &:extend(.animation .hide);
}
```



- 运算符和转义
  - 运算符：+ - * /
  - 转义： ~

