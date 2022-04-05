<template>
	<div class="bg-slate-50 grid grid-cols-2">
		<!-- grid items 1 -->
		<div class="bg-white rounded drop-shadow-md m-1 px-2 py-1 auto-rows-fr">
			<h2 class="font-normal text-3xl">Details</h2>
			<!-- User Detail -->
			<div class="px-4 py-4 leading-relaxed">
				<h3 v-show="user.firstName"><span class="font-normal italic pr-2">Given Name: </span> {{ user.firstName }}</h3>
				<h3 v-show="user.lastName"><span class="font-normal italic pr-2">Family Name: </span> {{ user.lastName }}</h3>
				<h3 v-show="user.gender"><span class="font-normal italic pr-2">Gender: </span> {{ user.gender }}</h3>
				<h3 v-show="user.birthDate"><span class="font-normal italic pr-2">BirthDate: </span> {{ user.birthDate }}</h3>
				<h3 v-show="user.maritalStatus">
					<span class="font-normal italic pr-2">Marital Status: </span> {{ user.maritalStatus }}
				</h3>
				<h3 v-show="user.active"><span class="font-normal italic pr-2">Active?: </span> {{ user.active }}</h3>
			</div>
		</div>
		<!-- grid item 2 -->
		<div class="bg-white rounded drop-shadow-md m-1 px-2 py-1">
			<h2 class="font-normal text-3xl">Contact</h2>
			<!-- User Detail -->
			<div class="px-4 py-4 leading-relaxed">
				<h3 v-show="user.email">
					<span class="font-normal italic pr-2">Email: </span> <span class="text-blue-800">{{ user.email }}</span>
				</h3>
				<h3 v-show="user.phone">
					<span class="font-normal italic pr-2">Phone: </span> <span class="text-blue-800">{{ user.phone }}</span>
				</h3>
				<h3 v-show="user.address"><span class="font-normal italic pr-2">Address: </span> {{ user.address }}</h3>
			</div>
		</div>
		<!-- grid item 3 -->
		<div v-show="user.identifiers" class="bg-white rounded drop-shadow-md m-1 px-2 py-1 col-span-2">
			<h2 class="font-normal text-3xl">Identifiers</h2>
			<!-- User Detail -->
			<div class="px-4 py-4 leading-relaxed">
				<h3 v-for="idf in user.identifiers" :key="idf.key">
					<span class="font-normal italic pr-2">{{ idf.key }}: </span><span>{{ idf.value }}</span>
				</h3>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'userDetail',
	props: ['user'],
}
</script>

<style></style>
