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
		rodzaj_ogrzewania:"Rodzaj_ogrzewania"
	},
	Rodzaj_ogrzewania: "enum" as const,
	Rodzaj_najmu: "enum" as const
}

export const ReturnTypes: Record<string,any> = {
	Mutation:{
		addApartment:"String",
		firstRegister:"String"
	},
	Query:{
		ListAll:"ApartmentBasicInfo",
		getInfoById:"String"
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
	}
}

export const Ops = {
mutation: "Mutation" as const,
	query: "Query" as const
}