<template>
	<div class="container w-full md:w-[80%] lg:w-[70%] bg-white min-h-screen mx-auto drop-shadow-md flex flex-col">
		<Header class="flex-none" />
		<main class="flex-grow">
			<router-view />
		</main>
		<Footer class="flex-none" />
	</div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
	name: 'App',
	components: { Header, Footer },
}
</script>

<style>
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
