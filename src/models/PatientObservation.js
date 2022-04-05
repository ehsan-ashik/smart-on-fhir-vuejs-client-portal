class PatientObservationObj {
	id = ''
	patientId = ''
	encounter = ''
	category = ''
	status = ''
	effectiveDate = ''
	dateText = ''
	obsCode = {}
	obsValue = {}

	generate(po) {
		this.id = po.id
		this.encounter = po.encounter.reference
		this.category = po.category.length > 0 && po.category[0].coding.length > 0 ? po.category[0].coding[0].display : ''
		this.status = po.status
		this.effectiveDate = new Date(po.effectiveDateTime)
		this.dateText = po.effectiveDateTime.slice(0, 10)
		this.obsCode = {
			text: po.code.text,
			display: po.code.coding.length > 0 ? po.code.coding[0].display : '',
			code: po.code.coding.length > 0 ? po.code.coding[0].code : '',
		}

		this.obsValue = {
			unit: po.valueQuantity ? po.valueQuantity.unit : '',
			value: po.valueQuantity ? po.valueQuantity.value : -1,
		}
	}
}

export default PatientObservationObj
