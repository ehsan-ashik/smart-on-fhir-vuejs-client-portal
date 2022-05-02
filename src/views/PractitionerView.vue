<template>
	<ul class="flex flex-col divide-y">
		<li v-for="pr in practitioners" :key="pr.id">
			<User :user="pr" type="practitioner" />
		</li>
	</ul>
</template>

<script>
import PractitionerObj from '../models/Practitioner';
import User from '../components/User.vue';
import FHIR from 'fhirclient';

export default {
	name: 'Practitioner',
	components: { User },
	data() {
		return {
			practitioners: [],
			token: '',
			smartSettings: {
				clientId: process.env.VUE_APP_LOGICA_CLIENT_ID,
				scope: 'online_access openid profile  patient/*.* user/*.*', //Keeping it here instead of .env to inform what scope was used
				iss: process.env.VUE_APP_LOGICA_URI, //Format: 'https://api.logicahealth.org/<YourLogicaSandbox>/data'
			},
		};
	},
	methods: {
		async getPractitioners() {
			const raw = await fetch(`${localStorage.uri}/Practitioner`, {
				headers: {
					'Content-Type': 'application/fhir+json',
					Authorization: localStorage.token != undefined ? 'Bearer ' + localStorage.token : '',
				},
			});

			const data = await raw.json();

			data.entry.forEach((pt) => {
				if (pt.resource.name) {
					let newPt = new PractitionerObj();
					newPt.generatePractitioner(pt.resource);
					this.practitioners.push(newPt);
				}
			});
		},
	},
	async created() {
		await FHIR.oauth2
			.init({ ...this.smartSettings, redirectUri: '/' })
			.then((client) => {
				if (client) {
					this.token = client.state.tokenResponse.access_token;
					localStorage.token = this.token;
					localStorage.uri = process.env.VUE_APP_LOGICA_URI;
				}

				if (!this.token) localStorage.uri = process.env.VUE_APP_LOCAL_URI;
			})
			.catch((err) => {
				console.log(err);
				localStorage.uri = process.env.VUE_APP_LOCAL_URI;
			});

		await this.getPractitioners();
	},
	async mounted() {},
};
</script>
