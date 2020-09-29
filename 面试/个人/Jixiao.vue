<template>
  <div class="jixiao">
    <header class="search">
      <div class="input" :key="index" v-for="(item, index) in theads">
        <span>{{item}}</span>：<input type="text">
      </div>
      <div class="button">
        <button class="cx">查询</button>
        <button class="cz">重置</button>
      </div>
    </header>
    <main class="container">
      <thead class="nav">
        <tr>
          <td :key="index" v-for="(item, index) in theads">{{item}}</td>
        </tr>
      </thead >
      <tbody class="content">
        <tr :key="index" v-for="(data, index) in datas">
          <td>{{index}}</td>
          <td :key="index" v-for="(item, index) in data">{{item}}</td>
        </tr>
      </tbody>
    </main>
  </div>
</template>

<script>
export default {
  name: "Jixiao",
  data() {
    return {
      theads: [
        "序号",
        "单据号",
        "处理人",
        "单据状态",
        "处理时间",
        "分公司",
        "岗位",
        "备注",
      ],
      datas: [
        {
          w: "GL110",
          clr: "caiwuyi",
          djzt: "本地审核",
          clsj: "time",
          fgs: "四川",
          gw: '',
          bz:''
        },
         {
          w: "GL110",
          clr: "caiwuyi",
          djzt: "本地审核",
          clsj: "time",
          fgs: "四川",
          gw: '',
          bz:''
        },
         {
          w: "GL110",
          clr: "caiwuyi",
          djzt: "本地审核",
          clsj: "time",
          fgs: "四川",
          gw: '',
          bz:''
        },
         {
          w: "GL110",
          clr: "caiwuyi",
          djzt: "本地审核",
          clsj: "time",
          fgs: "四川",
          gw: '',
          bz:''
        },
         {
          w: "GL110",
          clr: "caiwuyi",
          djzt: "本地审核",
          clsj: "time",
          fgs: "四川",
          gw: '',
          bz:''
        },
        
      ],
    };
  },
};
</script>

<style scoped>
.jixiao {
  width: 800px;
  margin: 10px auto;
}
.search {
  display: flex;
  flex-wrap: wrap;
}
.search div {
  margin: 5px 20px 5px 0;
}
.search .input span {
  display: inline-block;
  text-align-last: justify;
  width: 80px;
}
.search .input input {
  width: 100px;
}
.search .button button {
  /* width: 60px;
  height: 30px; */
  margin-right: 20px;
}
.container {
  margin-top: 20px;
}
.container .nav{
  width: 800px;
}
tr {
  border: 1px solid #333;
}
td {
  padding: 0 10px;
  height: 30px;
  border: 1px solid #333;
}
</style>