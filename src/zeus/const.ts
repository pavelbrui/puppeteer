/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	Mutation:{
		addApartment:{
			login:"Credentials",
			input:"ApartmentInfo"
		},
		firstRegister:{
			login:"Credentials",
			input:"CompanyInfo"
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
		rental_type:"Rodzaj_najmu",
		zarzadzanie:"Zarzadzanie",
		rodzaj_ogrzewania:"Rodzaj_ogrzewania"
	},
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
		estate_details:"Estate_details",
		estate_rental_type:"Int",
		estate_access_code:"String",
		rooms_accommodation:"String",
		free_rooms_count:"Int",
		row_class:"String"
	},
	Estate_details:{
		liczba_pokoi:"Int",
		pietro:"Int",
		powierzchnia:"Float"
	},
	ApartmentFullInfo:{
		basicInfo:"String",
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
	ApartmentCard:{
		ogolne:"String",
		szczegoly:"String",
		daneDostawcow:"String"
	}
}

export const Ops = {
mutation: "Mutation" as const,
	query: "Query" as const
}