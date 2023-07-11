import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCreateCastMemberMutation } from "./castMembersSlice";
import { useSnackbar } from "notistack";
import { CastMember } from "../../types/CastMembers";
import { CastMemberForm } from "./components/CastMemberForm";

export const CastMemberCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createCastMember, status] = useCreateCastMemberMutation();
  const [castMemberState, setCastMemberState] = useState<CastMember>({
    id: "",
    name: "",
    type: 1,
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createCastMember(castMemberState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Success created cast member!", { variant: "success" });
    }

    if (status.error) {
      enqueueSnackbar("Error creating cast member!", { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Cast Member</Typography>
          </Box>
        </Box>

        <CastMemberForm
          castMember={castMemberState}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
};
