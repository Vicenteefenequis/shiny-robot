import React, { useEffect, useState } from "react";
import {
  useDeleteCastMemberMutation,
  useGetCastMembersQuery,
} from "./castMembersSlice";
import { GridFilterModel } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CastMembersTable } from "./components/CastMembersTable";

const initialOptions = {
  perPage: 10,
  search: "",
  page: 1,
  rowsPerPage: [10, 20, 30],
};

export const ListCastMembers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState(initialOptions);
  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, deleteCastMemberStatus] =
    useDeleteCastMemberMutation();

  function handleOnPageChange(page: number) {
    setOptions((old) => ({ ...old, page: old.page + 1 }));
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions((old) => ({ ...old, perPage }));
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!!filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join("");
      setOptions((old) => ({ ...old, search }));
      return;
    }
    setOptions((old) => ({ ...old, search: "" }));
  }

  async function handleDeleteCastMember(id: string) {
    await deleteCastMember({ id });
  }

  useEffect(() => {
    if (deleteCastMemberStatus.isSuccess) {
      enqueueSnackbar("Cast Member deleted successfully", {
        variant: "success",
      });
    }

    if (deleteCastMemberStatus.isError) {
      enqueueSnackbar("Cast Member not deleted", { variant: "error" });
    }
  }, [
    deleteCastMemberStatus.isError,
    deleteCastMemberStatus.isSuccess,
    enqueueSnackbar,
  ]);

  if (error) {
    return <Typography variant="h4">Error fetching categories</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Cast Member
        </Button>
      </Box>
      <CastMembersTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCastMember}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
