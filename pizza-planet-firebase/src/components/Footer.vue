<template> 
	<footer class="row">
		<nav class="navbar navbar-toggleable-md navbar-light">
			<ul class="navbar-nav">
			<li class="nav-item">
					<router-link :to="{'name':'principal'}"><a class="nav-link">Home</a></router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{'name':'menu'}"><a class="nav-link">Menu</a></router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{'name':'admin'}"><a class="nav-link">Admin</a></router-link>
				</li>
			</ul>
		</nav>
	</footer>
</template>