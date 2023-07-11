import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import {
  CastMemberParams,
  CastMember,
  Results,
  Result,
} from "../../types/CastMembers";

const endpointUrl = "/cast_members";

export const initialState: CastMember = {
  id: "",
  name: "",
  type: 0,
  createdAt: "",
  updatedAt: "",
  deletedAt: null,
};

function parseQueryParams(params: CastMemberParams) {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.perPage) query.append("perPage", params.perPage.toString());
  if (params.search) query.append("search", params.search);
  if (params.type) query.append("type", params.type.toString());
  return query.toString();
}

function getCastMembers({
  page = 1,
  perPage = 10,
  search,
  type,
}: CastMemberParams) {
  return `${endpointUrl}?${parseQueryParams({ page, perPage, search, type })}`;
}

function deleteCastMember({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
}

function updateCastMember(castMember: CastMember) {
  return {
    url: `${endpointUrl}/${castMember.id}`,
    method: "PUT",
    data: castMember,
  };
}

function createCastMember(castMember: CastMember) {
  return {
    url: endpointUrl,
    method: "POST",
    data: castMember,
  };
}

function getCastMember(id: string) {
  return `${endpointUrl}/${id}`;
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),
    getCastMember: query<Result, string>({
      query: getCastMember,
      providesTags: ["CastMembers"],
    }),
    deleteCastMember: mutation<Result, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    createCastMember: mutation<Result, CastMember>({
      query: createCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    updateCastMember: mutation<Result, CastMember>({
      query: updateCastMember,
      invalidatesTags: ["CastMembers"],
    }),
  }),
});

export const {
  useGetCastMembersQuery,
  useGetCastMemberQuery,
  useDeleteCastMemberMutation,
  useCreateCastMemberMutation,
  useUpdateCastMemberMutation,
} = castMembersApiSlice;
