export interface Results {
	data: Category[]
	meta: Meta
}

export type Meta = {
	current_page: number;
	per_page: number;
	total: number;
}

export type CategoryParams = {
	page?: number;
	perPage?: number;
	search?: string;
	isActive: boolean;
}

export interface Category {
	id: string;
	name: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	description: string | null;
}