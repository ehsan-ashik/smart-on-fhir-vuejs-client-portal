class PatientObj {
	id = ''
	gender = ''
	prefix = ''
	firstName = ''
	lastName = ''
	phone = ''
	email = ''
	address = ''
	language = ''
	birthDate = ''
	maritalStatus = ''
	identifiers = []

	generatePatient(pt) {
		this.id = pt.id
		this.gender = pt.gender
		this.prefix = pt.name[0].prefix ? pt.name[0].prefix[0] : ''
		this.firstName = pt.name[0].given[0]
		this.lastName = pt.name[0].family
		this.birthDate = pt.birthDate
		this.maritalStatus = pt.maritalStatus.text

		let ph = pt.telecom.filter((tel) => tel.system == 'phone')[0]
		this.phone = ph ? ph.value : ''

		let em = pt.telecom.filter((tel) => tel.system == 'email')[0]
		this.email = em ? em.value : ''

		pt.communication.forEach((lang) => {
			this.language += lang.text + ' '
		})

		pt.identifier.forEach((id) => {
			if (id.type) {
				this.identifiers.push({
					key: id.type.text,
					value: id.value,
				})
			}
		})

		this.address = pt.address[0].line[0] + ' ' + pt.address[0].city + ' ' + pt.address[0].state
		this.address += pt.address[0].postalCode ? ' ' + pt.address[0].postalCode : ''
	}
}

export default PatientObj
