class PatientObj {
	id = '';
	gender = '';
	prefix = '';
	firstName = '';
	lastName = '';
	phone = '';
	email = '';
	address = '';
	language = '';
	birthDate = '';
	maritalStatus = '';
	identifiers = [];

	generatePatient(pt) {
		this.id = pt.id;
		this.gender = pt.gender;
		this.prefix = pt.name[0].prefix ? pt.name[0].prefix[0] : '';
		this.firstName = pt.name[0].given[0];
		this.lastName = pt.name[0].family;
		this.birthDate = pt.birthDate;
		this.maritalStatus = pt.maritalStatus ? pt.maritalStatus.text : '';

		let ph = pt.telecom ? pt.telecom.filter((tel) => tel.system == 'phone')[0] : undefined;
		this.phone = ph ? ph.value : '';

		let em = pt.telecom ? pt.telecom.filter((tel) => tel.system == 'email')[0] : undefined;
		this.email = em ? em.value : '';

		if (pt.communication) {
			pt.communication.forEach((lang) => {
				this.language += lang.text + ' ';
			});
		}

		if (pt.identifier) {
			pt.identifier.forEach((id) => {
				if (id.type) {
					this.identifiers.push({
						key: id.type.text,
						value: id.value,
					});
				}
			});
		}

		this.address = pt.address
			? (pt.address[0].line ? pt.address[0].line[0] + ' ' : '') +
			  (pt.address[0].city ? pt.address[0].city + ' ' : '') +
			  (pt.address[0].state ? pt.address[0].state : '')
			: '';
		this.address += pt.address && pt.address[0].postalCode ? ' ' + pt.address[0].postalCode : '';
	}
}

export default PatientObj;
