import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { Results } from "../../types/Category";

export interface Category {
	id: string;
	name: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	description: string | null;
}


const endpointUrl = "/categories"

export const categoriesApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query }) => ({
		getCategories: query<Results, void>({
			query: () => `${endpointUrl}`,
			providesTags: ["Categories"],
		})
	})
})


const category: Category = {
	id: "2f3c75de-ff57-4b1b-a6db-5ef8245ec111",
	name: "Grovy",
	is_active: false,
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	deleted_at: null,
	description: 'Grovy is a programming language',
}


export const initialState = [
	category,
	{ ...category, id: "2f3c75de-ff57-4b1b-a6db-5ef8245ec112", name: "React" },
	{ ...category, id: "2f3c75de-ff57-4b1b-a6db-5ef8245ec113", name: "Vue" },
	{ ...category, id: "2f3c75de-ff57-4b1b-a6db-5ef8245ec114", name: "Angular" },
]

const categoriesSlice = createSlice({
	name: "categories",
	initialState: initialState,
	reducers: {
		addCategory: (state, action) => {
			state.push(action.payload)
		},
		removeCategory: (state, action) => {
			const index = state.findIndex(category => category.id === action.payload.id);
			state.splice(index, 1);
		},
		updateCategory: (state, action) => {
			const index = state.findIndex(category => category.id === action.payload.id);
			state[index] = action.payload;
		},
	}
})


//selectors

export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, categoryId: string) => {
	const category = state.categories.find(category => category.id === categoryId)
	return category || {} as Category
};


export default categoriesSlice.reducer;
export const { addCategory, updateCategory, removeCategory } = categoriesSlice.actions;


export const {
	useGetCategoriesQuery
} = categoriesApiSlice