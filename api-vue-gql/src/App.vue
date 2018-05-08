<template>
  <div>
    <h1>GRAPHQL EN VUE</h1>
    <ul>
      <li v-for="item in list"> <p>{{ item.title }}</p></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      list: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
     getList() {
      try {
        const res =  this.$graphql.request(`
          {
            posts {
              title
            }
          }
        `).then((res) => {
          this.list = res.posts
        });
        //this.list = res.myList;
      } catch (err) {
        // do something with the error
      }
    }
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
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
