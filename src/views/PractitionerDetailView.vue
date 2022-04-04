<template>
	<div :id="practitioner.id" class="px-6 py-2 bg-white">
		<span class="text-4xl block pb-10 text-center">Practitoner Details</span>
		<div class="text-xl grid grid-cols-2 gap-y-2 gap-x-20 lg:px-28 md:px-5">
			<p class="font-normal pb-1 col-start-1">
				<span class="font-semibold text-slate-700 not-italic">Prefix:</span> {{ practitioner.prefix }}
			</p>
			<p class="font-normal pb-1 col-start-2 lg:px-10">
				<span class="font-semibold text-slate-700 not-italic">Gender:</span> {{ practitioner.gender }}
			</p>
			<p class="font-normal pb-1 col-start-1">
				<span class="font-semibold text-slate-700 not-italic">Family Name:</span> {{ practitioner.lastName }}
			</p>
			<p class="font-normal pb-1 col-start-2 lg:px-10">
				<span class="font-semibold text-slate-700 not-italic">Active:</span> {{ practitioner.active }}
			</p>
			<p class="font-normal pb-1 col-start-1">
				<span class="font-semibold text-slate-700 not-italic">Given Name:</span> {{ practitioner.firstName }}
			</p>

			<!-- <span class="text-xl pl-4">{{ practitioner.gender }}</span> -->
			<p class="font-normal italic text-blue-800 pb-1 col-start-1 col-span-2 pt-10">
				<span class="font-semibold text-slate-700 not-italic">Email:</span> {{ practitioner.email }}
			</p>
			<p class="font-normal col-start-1 col-span-2">
				<span class="font-bold">Address:</span> {{ practitioner.address }}
			</p>
		</div>
	</div>
</template>

<script>
import PractitionerObj from '../models/Practitioner'
export default {
	name: 'practitionerDetail',
	props: ['id'],
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
