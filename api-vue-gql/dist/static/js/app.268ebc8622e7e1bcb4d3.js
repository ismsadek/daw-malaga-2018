webpackJsonp([1],{NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("7+uW"),i={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("h1",[t._v("GRAPHQL EN VUE")]),t._v(" "),e("ul",t._l(t.list,function(n){return e("li",[e("p",[t._v(t._s(n.title))])])}))])},staticRenderFns:[]};var s=e("VU/8")({name:"app",data:function(){return{list:{}}},created:function(){this.getList()},methods:{getList:function(){var t=this;try{this.$graphql.request("\n          {\n            posts {\n              title\n            }\n          }\n        ").then(function(n){t.list=n.posts})}catch(t){}}}},i,!1,function(t){e("iTu2")},null,null).exports,u=e("4rMC");r.a.use(u.a);var a=new u.a.Client("https://api-demo-grql.herokuapp.com/graphql");new r.a({el:"#app",graphql:a,render:function(t){return t(s)}})},iTu2:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.268ebc8622e7e1bcb4d3.js.map