<template>
	<header class="row">
		<nav class="navbar navbar-toggleable-md navbar-light">
			<a href="/" class="navbar-brand">Pizza Planet</a>
			<ul class="navbar-nav">
				<li class="nav-item">
					<router-link :to="{'name':'principal'}"><a class="nav-link">Home</a></router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{'name':'menu'}"><a class="nav-link">Menu</a></router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style>
	header{
		margin-bottom: 20px;
	}
	.navbar-brand {
		font-size: 1.5em;
	}
</style>