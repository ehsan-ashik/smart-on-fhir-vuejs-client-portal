<template>
	<nav class="bg-slate-700 w-full h-16 px-4 text-slate-50 flex justify-between items-center">
		<div class="font-normal">Portal</div>
		<div class="flex gap-1 leading-tight">
			<router-link class="px-4 py-2 rounded hover:bg-slate-400/20 opacity-80 hover:opacity-100" to="/"
				>Practitionar</router-link
			>
			<router-link class="px-4 py-2 rounded hover:bg-slate-400/20 opacity-80 hover:opacity-100" to="/patient"
				>Patient</router-link
			>
		</div>
	</nav>
</template>

<script>
export default {}
</script>

<style></style>
