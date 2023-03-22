/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	Mutation:{
		addApartment:{
			login:"Credentials",
			info:"ApartmentInfo"
		},
		firstRegister:{
			login:"Credentials",
			info:"CompanyInfo"
		}
	},
	Query:{
		ListAll:{
			login:"Credentials"
		},
		getInfoById:{
			login:"Credentials"
		}
	},
	Credentials:{

	},
	CompanyInfo:{

	},
	ApartmentInfo:{
		state:"Apart_state",
		rental_type:"Rodzaj_najmu",
		menage_type:"Zarzadzanie",
		heating_type:"Rodzaj_ogrzewania"
	},
	Apart_state: "enum" as const,
	Rodzaj_ogrzewania: "enum" as const,
	Rodzaj_najmu: "enum" as const,
	Zarzadzanie: "enum" as const
}

export const ReturnTypes: Record<string,any> = {
	Mutation:{
		addApartment:"String",
		firstRegister:"String"
	},
	Query:{
		ListAll:"ApartmentBasicInfo",
		getInfoById:"ApartmentFullInfo"
	},
	ApartmentBasicInfo:{
		address:"String",
		estate_code:"String",
		estate_is_under_renovation:"Int",
		estate_manage_type:"Int",
		estate_id:"Int",
		tags:"String",
		estate_details:"EstateDetails",
		estate_rental_type:"Int",
		estate_access_code:"String",
		rooms_accommodation:"String",
		free_rooms_count:"Int",
		row_class:"String"
	},
	EstateDetails:{
		number_rooms:"Int",
		floor:"Int",
		area:"Float"
	},
	ApartmentFullInfo:{
		basic_info:"BasicInfo",
		apartment_card:"ApartmentCard",
		notes:"String",
		rooms_and_tenants:"String",
		meters_and_charges:"String",
		notifications:"String",
		estate_controls:"String",
		billings:"String",
		insurance:"String",
		dokuments:"String",
		cost_documents:"String"
	},
	BasicInfo:{
		repair_warranty_up_to:"String",
		assistance_package:"String",
		address_info:"String",
		rental_info:"String",
		bank_account_for_payment:"String",
		estate_is_under_renovation:"Apart_state",
		other_owner:"String"
	},
	ApartmentCard:{
		general:"String",
		details:"String",
		supplier_data:"String"
	}
}

export const Ops = {
mutation: "Mutation" as const,
	query: "Query" as const
}