import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
	id: string;
	name: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	description: string | null;
}

const category: Category = {
	id: "2f3c75de-ff57-4b1b-a6db-5ef8245ec11a",
	name: "Grovy",
	is_active: false,
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	deleted_at: null,
	description: 'Grovy is a programming language',
}


export const initialState = [
	category,
	{ ...category, id: "2f3c75de-ff57-4b1b-a6db-5ef8245ec11a", name: "React" },
	{ ...category, id: "2f3c75de-ff57-4b1b-a6db-5ef8245ec11a", name: "Vue" },
	{ ...category, id: "2f3c75de-ff57-4b1b-a6db-5ef8245ec11a", name: "Angular" },
]

const categoriesSlice = createSlice({
	name: "categories",
	initialState: initialState,
	reducers: {
		addCategory: (state, action) => { },
		removeCategory: (state, action) => { },
		updateCategory: (state, action) => { },
	}
})


//selectors

export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, categoryId: string) => {
	const category = state.categories.find(category => category.id === categoryId)
	return category || {} as Category
};


export default categoriesSlice.reducer;