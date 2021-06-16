<template>
  <div id="app">
    <HeadTop/>
        <router-view :key='$route.fullPath'/>
     <Footer/>
  </div>
</template>

<script>
import './assets/css/common.css';
import HeadTop from './components/HeaderTop'
import Footer from './components/Foote'

// import Footer from '/slider'
export default {
  name: 'App',
  components: {
   HeadTop,
   Footer,
  }
}
</script>
