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
		ListAll:"String"
	}
}

export const Ops = {
mutation: "Mutation" as const,
	query: "Query" as const
}