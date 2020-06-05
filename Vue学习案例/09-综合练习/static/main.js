const vm = new Vue({
  el: '#app',
  data: {
    books: [{
      name: "《算法导论》",
      beginDate: "2006-9",
      price: 85.00,
      count: 1
    },
    {
      name: "《UNIX编程艺术》",
      beginDate: "2006-2",
      price: 59.00,
      count: 1
    },
    {
      name: "《编程大全》",
      beginDate: "2008-10",
      price: 39.00,
      count: 1
    },
    {
      name: "《代码大全》",
      beginDate: "2006-3",
      price: 128.00,
      count: 1
    },
    ]
  },
  computed: {
    totalPrice() {
      // 1. 循环获取总价
      let total = 0
      // for (let i = 0; i < 4; i++) {
      //   total = total + this.books[i].price * this.books[i].count
      // }
      // 2.增强循环
      // for(let i in this.books){
      //   total = total + this.books[i].price * this.books[i].count
      // }
      // 3.for of
      // for(const book of this.books){
      //   total = total + book.price * book.count
      // }
      // 4.使用高阶函数  看不懂
      // return this.books.map(function (book) {
      //   return book.price * book.count
      //  }).reduce(function (preValue,currentValue) {
      //     return preValue + currentValue
      //   })
      // 3.高阶函数简写（箭头函数）
      return this.books.map(book =>  book.price * book.count
      ).reduce((preValue, currentValue) => preValue + currentValue
      )
    }
  },
  methods: {
    dec(index) {
      if (this.books[index].count > 1) {
        this.books[index].count--
      }
    },
    add(index) {
      this.books[index].count++
    },
    remove(index) {
      this.books.splice(index,1)
    }
  },
  // 过滤器：对一个数据进行处理后，重新输出
  filters: {//过滤器
    showPrice(price) {
      return "￥" + price.toFixed(2)
    }
  }
})