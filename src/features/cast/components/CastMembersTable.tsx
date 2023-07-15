import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Results } from "../../../types/CastMembers";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  data?: Results;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: string) => void;
};

export function CastMembersTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      type: "boolean",
      renderCell: renderTypeCell,
    },
    {
      field: "id",
      headerName: "Actions",
      flex: 1,
      type: "string",
      renderCell: renderActionsCell,
    },
  ];

  function mapDataToGridRows(data: Results) {
    const { data: castMembers } = data;
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
    }));
  }

  function renderActionsCell(row: GridRenderCellParams) {
    return (
      <IconButton
        aria-label="delete"
        color="secondary"
        data-testid="delete-button"
        onClick={() => handleDelete(row.value)}
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderTypeCell(row: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {row.value === 1 ? "Diretor" : "Actor"}
      </Typography>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        to={`/cast-members/edit/${rowData.id}`}
        style={{ textDecoration: " none" }}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  const rows = data ? mapDataToGridRows(data) : [];

  const rowCount = data?.meta.total || 0;

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={perPage}
        loading={isFetching}
        rowCount={rowCount}
        filterMode="server"
        paginationMode="server"
        componentsProps={componentProps}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableSelectionOnClick
        rowsPerPageOptions={rowsPerPage}
        components={{ Toolbar: GridToolbar }}
        onPageChange={handleOnPageChange}
        onPageSizeChange={handleOnPageSizeChange}
        onFilterModelChange={handleFilterChange}
        checkboxSelection={false}
      />
    </Box>
  );
}
