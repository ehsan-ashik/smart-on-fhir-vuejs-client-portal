<template>
	<UserDetail :user="practitioner" />
</template>

<script>
import PractitionerObj from '../models/Practitioner';
import UserDetail from '../components/UserDetail.vue';
export default {
	name: 'practitionerDetail',
	props: ['id'],
	components: {
		UserDetail,
	},
	data() {
		return {
			practitioner: {},
		};
	},
	methods: {
		async getPractitioner() {
			const raw = await fetch(`${localStorage.uri}/Practitioner/${this.id}`, {
				headers: {
					'Content-Type': 'application/fhir+json',
					Authorization: localStorage.token != undefined ? 'Bearer ' + localStorage.token : '',
				},
			});
			const data = await raw.json();

			let newPt = new PractitionerObj();
			newPt.generatePractitioner(data);
			this.practitioner = newPt;
		},
	},
	async mounted() {
		await this.getPractitioner();
	},
};
</script>

<style></style>
