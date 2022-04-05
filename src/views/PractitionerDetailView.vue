<template>
	<UserDetail :user="practitioner" />
</template>

<script>
import PractitionerObj from '../models/Practitioner'
import UserDetail from '../components/UserDetail.vue'
export default {
	name: 'practitionerDetail',
	props: ['id'],
	components: {
		UserDetail,
	},
	data() {
		return {
			practitioner: {},
		}
	},
	methods: {
		async getPractitioner() {
			const raw = await fetch(`http://localhost:5000/fhir/Practitioner/${this.id}`)
			const data = await raw.json()
			//console.log(data)
			let newPt = new PractitionerObj()
			newPt.generatePractitioner(data)
			this.practitioner = newPt
		},
	},
	async mounted() {
		await this.getPractitioner()
	},
}
</script>

<style></style>
