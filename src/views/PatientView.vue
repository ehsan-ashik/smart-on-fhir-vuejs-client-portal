<template>
	<div class="w-full py-2 px-4 bg-slate-100 my-1 flex justify-between">
		<button
			:disabled="!prevPage"
			@click="ProcessPrevPage"
			class="px-6 py-2 text-sm rounded bg-slate-500/20 hover:bg-slate-500/40 disabled:bg-slate-500/10 disabled:opacity-50"
		>
			Prev
		</button>
		<span>Page {{ currentPage }}</span>
		<button
			:disabled="!nextPage"
			@click="ProcessNextPage"
			class="px-6 py-2 text-sm rounded bg-slate-500/20 hover:bg-slate-500/40"
		>
			Next
		</button>
	</div>
	<ul class="flex flex-col divide-y">
		<li v-for="pt in patients" :key="pt.id">
			<User :user="pt" type="patient" />
		</li>
	</ul>
</template>

<script>
import User from '../components/User.vue'
import PatientObj from '../models/Patient'

export default {
	name: 'patient',
	components: { User },
	data() {
		return {
			patients: [],
			nextPage: '',
			prevPage: '',
			patientCount: 0,
			currentPage: 1,
		}
	},
	methods: {
		async getPatients() {
			const raw = await fetch(`http://localhost:5000/fhir/Patient`)
			const data = await raw.json()
			//console.log(data)
			this.patientCount = data.total

			//set next page link
			const nextLink = data.link.filter((link) => link.relation == 'next')
			this.nextPage = nextLink.length > 0 ? nextLink[0].url : ''

			//set prev page link
			const prevlink = data.link.filter((link) => link.relation == 'previous')
			this.prevPage = prevlink.length > 0 ? prevlink[0].url : ''

			data.entry.forEach((pt) => {
				if (pt.resource.name) {
					let newPt = new PatientObj()
					newPt.generatePatient(pt.resource)
					this.patients.push(newPt)
				}
			})
		},

		async ProcessNextPage() {
			if (!this.nextPage) return

			const raw = await fetch(this.nextPage)
			const data = await raw.json()

			//set next page link
			const nextLink = data.link.filter((link) => link.relation == 'next')
			this.nextPage = nextLink.length > 0 ? nextLink[0].url : ''

			//set prev page link
			const prevlink = data.link.filter((link) => link.relation == 'previous')
			this.prevPage = prevlink.length > 0 ? prevlink[0].url : ''

			this.patients = []
			data.entry.forEach((pt) => {
				if (pt.resource.name) {
					let newPt = new PatientObj()
					newPt.generatePatient(pt.resource)
					this.patients.push(newPt)
				}
			})
			this.currentPage++
		},
		async ProcessPrevPage() {
			if (!this.prevPage) return

			const raw = await fetch(this.prevPage)
			const data = await raw.json()

			//set next page link
			const nextLink = data.link.filter((link) => link.relation == 'next')
			this.nextPage = nextLink.length > 0 ? nextLink[0].url : ''

			//set prev page link
			const prevlink = data.link.filter((link) => link.relation == 'previous')
			this.prevPage = prevlink.length > 0 ? prevlink[0].url : ''

			this.patients = []
			data.entry.forEach((pt) => {
				if (pt.resource.name) {
					let newPt = new PatientObj()
					newPt.generatePatient(pt.resource)
					this.patients.push(newPt)
				}
			})
			this.currentPage--
		},
	},
	async mounted() {
		await this.getPatients()
	},
}
</script>
