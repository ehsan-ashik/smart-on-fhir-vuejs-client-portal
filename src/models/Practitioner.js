class PractitionerObj {
	id = ''
	gender = ''
	prefix = ''
	firstName = ''
	lastName = ''
	email = ''
	address = ''
	active = false

	generatePractitioner(pt) {
		this.id = pt.id
		this.gender = pt.gender
		this.prefix = pt.name[0].prefix[0]
		this.firstName = pt.name[0].given[0]
		this.lastName = pt.name[0].family
		this.email = pt.telecom[0].value
		this.active = pt.active
		this.address =
			pt.address[0].line[0] + ' ' + pt.address[0].city + ' ' + pt.address[0].state + ' ' + pt.address[0].postalCode
	}
}

export default PractitionerObj
