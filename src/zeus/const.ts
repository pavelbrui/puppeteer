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

		}
	},
	Credentials:{

	},
	CompanyInfo:{

	},
	ApartmentInfo:{

	}
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