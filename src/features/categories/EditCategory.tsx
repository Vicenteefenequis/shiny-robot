import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  Category,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "./categorySlice";
import { useEffect, useState } from "react";
import { CategoryForm } from "./components/CategoryForm";
import { useSnackbar } from "notistack";

export const CategoryEdit = () => {
  const { id = "" } = useParams();
  const { data: category, isFetching } = useGetCategoryQuery({ id });
  const [updateCategory, status] = useUpdateCategoryMutation();

  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: true,
    created_at: "",
    updated_at: "",
    deleted_at: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateCategory(categoryState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  useEffect(() => {
    if (category) {
      setCategoryState(category.data);
    }
  }, [category]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Success updated category!", { variant: "success" });
    }

    if (status.error) {
      enqueueSnackbar("Error updating category!", { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          category={categoryState}
          isDisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
          isLoading={isFetching}
        />
      </Paper>
    </Box>
  );
};
