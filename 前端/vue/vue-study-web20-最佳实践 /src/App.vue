<template>
  <div id="app">
    <Sidebar></Sidebar>
    <div id="nav">
      <router-link to="/">
        <svg-icon icon-class="denglong"></svg-icon>Home
      </router-link>|
      <router-link to="/about">About</router-link>
    </div>

    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      myY: true,
      myX: false
    };
  },
  computed: {
    z() {
      if (this.myY || this.myX) {
        console.log('=======');
      }
      return true;
    }
  },
  mounted () {
    let a = this.z
    console.log('----1--')
    this.myX = false
    this.myY = true
    let aa = this.z
    console.log('----2--')

    console.log('start')
    let p1 = Promise.resolve().then(() => {
      console.log('p1 resove')
      return console.log('p1 then')
    })
    console.log(p1.then())
    setTimeout(()=> {
      console.log('setTime out')
    },0)
    console.log('end')
  },
  beforeUpdate()  {
    console.log('beeeeupdate')
  },
  updated () {
    console.log('update')
  }

};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
