import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useGetCastMemberQuery,
  useUpdateCastMemberMutation,
} from "./castMembersSlice";
import { useSnackbar } from "notistack";
import { CastMember } from "../../types/CastMembers";
import { CastMemberForm } from "./components/CastMemberForm";
import { useParams } from "react-router-dom";

export const EditCastMember = () => {
  const { id = "" } = useParams();
  const { data: castMember } = useGetCastMemberQuery(id);

  const { enqueueSnackbar } = useSnackbar();
  const [updateCastMember, status] = useUpdateCastMemberMutation();
  const [castMemberState, setCastMemberState] = useState<CastMember>({
    id: "",
    name: "",
    type: 1,
    created_at: "",
    updated_at: "",
    deleted_at: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateCastMember(castMemberState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Success updated cast member!", { variant: "success" });
    }

    if (status.error) {
      enqueueSnackbar("Error updated cast member!", { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember.data);
    }
  }, [castMember]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Cast Member</Typography>
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
