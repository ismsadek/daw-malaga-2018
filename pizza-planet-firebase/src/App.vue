<template>
  <div id="app">
    <div class="container">
      <MainHeader/>  
    </div>
    <div class="container">
      <router-view/>
    </div>
    <div class="container">
      <MainFooter/>
    </div>
  </div>
</template>

<script>

  import MainHeader from './components/Header'
  import MainFooter from './components/Footer'
  
  export default {
    components: {
      MainHeader,
      MainFooter,
    }
  }
</script>