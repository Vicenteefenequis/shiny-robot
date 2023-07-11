export interface Results {
  meta: Meta;
  links: Links;
  data: CastMember[];
}

export interface Result {
  meta: Meta;
  links: Links;
  data: CastMember;
}

export interface CastMember {
  id: string;
  name: string;
  type: number;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
}

export interface Links {
  prev: string;
  last: string;
  next: string;
  first: string;
}

export interface Meta {
  to: number;
  from: number;
  path: string;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
}

export interface CastMemberParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: number;
}
