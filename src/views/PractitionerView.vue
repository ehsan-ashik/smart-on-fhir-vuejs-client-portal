<template>
	<ul class="flex flex-col divide-y">
		<li v-for="pr in practitioners" :key="pr.id">
			<User :user="pr" type="practitioner" />
		</li>
	</ul>
</template>

<script>
import PractitionerObj from '../models/Practitioner'
import User from '../components/User.vue'

export default {
	name: 'Practitioner',
	components: { User },
	data() {
		return {
			practitioners: [],
		}
	},
	methods: {
		async getPractitioners() {
			const raw = await fetch(`http://localhost:5000/fhir/Practitioner`)
			const data = await raw.json()
			//console.log(data)
			data.entry.forEach((pt) => {
				if (pt.resource.name) {
					let newPt = new PractitionerObj()
					newPt.generatePractitioner(pt.resource)
					this.practitioners.push(newPt)
				}
			})
		},
	},
	async mounted() {
		await this.getPractitioners()
	},
}
</script>
