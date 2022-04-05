import { createRouter, createWebHistory } from 'vue-router'
import PractitionerView from '../views/PractitionerView.vue'
import PatientView from '../views/PatientView'
import PractitionerDetailView from '../views/PractitionerDetailView'
import PatientDetailView from '../views/PatientDetailView'

const routes = [
	{
		path: '/',
		name: 'practitioners',
		component: PractitionerView,
	},
	{
		path: '/patient',
		name: 'patients',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: PatientView,
	},
	{
		path: '/practitioner/:id',
		name: 'practitioner',
		component: PractitionerDetailView,
		props: true,
	},
	{
		path: '/patient/:id',
		name: 'patient',
		component: PatientDetailView,
		props: true,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
