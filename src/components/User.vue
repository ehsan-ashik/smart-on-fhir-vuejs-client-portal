<template>
	<div :id="user.id" class="flex justify-between items-center px-6 py-2 bg-white">
		<div v-show="user.active">
			<h3 class="inline-block font-normal text-xl pb-2 uppercase">
				{{ user.prefix }} {{ user.firstName }} {{ user.lastName }}
			</h3>
			<!-- <span class="text-xl pl-4">{{ user.gender }}</span> -->
			<p class="text-xs font-normal italic text-blue-800 pb-1">
				<span class="font-bold text-slate-700 not-italic">Email:</span> {{ user.email }}
			</p>
			<p class="text-xs font-normal"><span class="font-bold">Address:</span> {{ user.address }}</p>
		</div>
		<router-link
			:to="{ name: type, params: { id: user.id } }"
			class="text-xs bg-slate-400/20 px-4 py-3 rounded hover:bg-slate-400/40"
			>Get Details</router-link
		>
	</div>
</template>

<script>
export default {
	name: 'user',
	props: ['user', 'type'],
}
</script>

<style></style>
