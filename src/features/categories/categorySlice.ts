import { createSlice } from "@reduxjs/toolkit";

interface Category {
	id: string;
	name: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	description: string | null;
}

const category: Category = {
	id: "uuid1",
	name: "Grovy",
	is_active: false,
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	deleted_at: null,
	description: null
}


export const initialState = [
	category,
	{ ...category, id: "uuid2", name: "React" },
	{ ...category, id: "uuid3", name: "Vue" },
	{ ...category, id: "uuid4", name: "Angular" },
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

export default categoriesSlice.reducer;