<template>
	<div v-if="loading" class="absolute w-full h-3/4 flex justify-center items-center font-normal text-4xl animate-pulse">
		<div class="">Loading...</div>
	</div>
	<div v-else>
		<div class="w-full h-16 bg-slate-100 flex justify-end items-center gap-3 px-4">
			<button
				:class="views[currentViewID - 1].name == 'details' ? 'bg-slate-400/60' : ''"
				@click="viewDetails"
				class="bg-slate-400/20 hover:bg-slate-400/40 px-6 py-2 rounded"
			>
				Details
			</button>
			<button
				:class="views[currentViewID - 1].name == 'observations' ? 'bg-slate-400/60' : ''"
				@click="viewObservations"
				class="bg-slate-400/20 hover:bg-slate-400/40 px-6 py-2 rounded active:bg-slate-400/60"
			>
				Observations
			</button>
			<!-- <button
			:class="views[currentViewID - 1].name == 'medications' ? 'bg-slate-400/60' : ''"
			@click="viewMedications"
			class="bg-slate-400/20 hover:bg-slate-400/40 px-6 py-2 rounded active:bg-slate-400/60"
		>
			Medicaions
		</button> -->
		</div>
		<div v-if="views[currentViewID - 1].name == 'details'">
			<UserDetail :user="patient" />
		</div>
		<div v-if="views[currentViewID - 1].name == 'observations'" class="grid gap-8 px-4">
			<div v-for="code in observationCodes" :key="code">
				<h2 class="font-normal text-2xl pb-2">
					<span
						><span class="italic">{{ code }}</span></span
					>
				</h2>
				<table class="w-full bg-slate-100 shadow-md">
					<tr class="text-left bg-slate-200">
						<th class="px-2 py-1 w-[40%]">Date</th>
						<th class="px-2 py-1 w-[40%]">Value</th>
						<th class="px-2 py-1 w-[20%]">Unit</th>
					</tr>

					<tr class="odd:bg-slate-300 font-mono" v-for="row in getFilteredObservation(code)" :key="row.id">
						<td class="px-2 py-1">{{ row.dateText }}</td>
						<td class="px-2 py-1">{{ row.obsValue.value }}</td>
						<td class="px-2 py-1">{{ row.obsValue.unit }}</td>
					</tr>
				</table>
				<!-- <table class="charts-css column hide-data">
				<tr class="">
					<th class="">Date</th>
					<th class="">Value</th>
				</tr>

				<tr class="" v-for="row in getFilteredObservation(code)" :key="row.id">
					<td scope="row" class="">{{ row.dateText }}</td>
					<td style="--size: calc(20 / 100)" class="">{{ row.obsValue.value }}</td>
				</tr>
			</table> -->
			</div>
		</div>
		<div v-if="views[currentViewID - 1].name == 'medications'">Medications View</div>
	</div>
</template>

<script>
import PatientObj from '../models/Patient'
import PatientObservationObj from '../models/PatientObservation'
import UserDetail from '../components/UserDetail.vue'

export default {
	name: 'patientDetail',
	props: ['id'],
	components: {
		UserDetail,
	},
	data() {
		return {
			patient: {},
			observations: [],
			loading: true,
			observationCategories: [],
			observationCodes: [],
			views: [
				{ id: 1, name: 'details' },
				{ id: 2, name: 'observations' },
				{ id: 3, name: 'medications' },
			],
			currentViewID: 2,
		}
	},
	computed: {},
	methods: {
		getFilteredObservation(code) {
			return this.observations
				.filter((x) => x.obsCode.display == code)
				.sort(function (a, b) {
					return a.effectiveDate.getTime() - b.effectiveDate.getTime()
				})
		},
		async getPatient() {
			const raw = await fetch(`http://localhost:5000/fhir/Patient/${this.id}`)

			const data = await raw.json()

			let ptObj = new PatientObj()
			ptObj.generatePatient(data)

			this.patient = ptObj
		},
		async getPatientObservations() {
			const raw = await fetch(` http://localhost:5000/fhir/Observation?patient=${this.id}&_count=1000`)

			const data = await raw.json()
			//console.log(data)
			data.entry.forEach((obs) => {
				const newObs = new PatientObservationObj()
				newObs.generate(obs.resource)
				this.observations.push(newObs)
			})

			this.observationCategories = [...new Set(this.observations.map((obs) => obs.category))]
			//console.log(this.observationCategories)

			this.observationCodes = [
				...new Set(this.observations.filter((x) => x.obsValue.value != -1).map((obs) => obs.obsCode.display)),
			]

			// this.observationCodes.forEach((code) => {
			// 	console.log(code, this.observations.filter((x) => x.obsCode.display == code).length)
			// })
		},
		viewDetails() {
			this.currentViewID = 1
		},
		viewObservations() {
			this.currentViewID = 2
		},
		viewMedications() {
			this.currentViewID = 3
		},
	},
	async created() {
		await this.getPatient()
		await this.getPatientObservations()
		this.loading = false
	},
}
</script>

<style></style>
