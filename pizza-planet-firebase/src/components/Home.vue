<template>
	<div class="row">
		<div id="home" class="col-sm-12 text-center" :style="{ background: 'url(' + mainImage + ')' }">
			<div class="background">
				<h1>Welcome to Pizza Planet!</h1>
				<h2>Feeling Hungry?</h2>
				<router-link :to="{name:'menu'}">
					<button class="btn btn-success">Let's Order!</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<style>
	#home {
		height: 800px;
		padding: 10%;
	}
	h1,h2 {
		margin: 6%;
	}
	.background {
		background-color: rgba(255, 255, 255, 0.5);;
		max-width: 60%;
		margin: 0 auto;
		padding: 20px 0; 
	}
</style>

<script>

import {storage} from '../firebase'

export default {
	data(){
		return {
			mainImage: ''
		}
	},
	beforeMount(){
		storage.ref("pizza.jpg").getDownloadURL().then((url)=>{this.mainImage = url})
	}
}
</script>
