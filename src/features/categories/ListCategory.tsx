import { Box, Button, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';


export const CategoryList = () => {
	const categories = useAppSelector(selectCategories);

	const componentProps = {
		toolbar: {
			showQuickFilter: true,
			quickFilterProps: { debounceMs: 500 }
		}
	}


	const rows: GridRowsProp = categories.map((category) => ({
		id: category.id,
		name: category.name,
		description: category.description,
		isActive: category.is_active,
		createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
	}));

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			renderCell: renderNameCell
		},
		{
			field: 'isActive',
			headerName: 'Active',
			flex: 1,
			type: 'boolean',
			renderCell: renderIsActiveCell
		},
		{
			field: 'createdAt',
			headerName: 'Created At',
			flex: 1,
		},
		{
			field: 'id',
			headerName: 'Actions',
			flex: 1,
			renderCell: renderActionsCell
		},
	];

	function renderActionsCell(row: GridRenderCellParams) {
		return (
			<IconButton aria-label="delete" color="secondary" onClick={() => console.log("eae")}>
				<DeleteIcon />
			</IconButton>
		)
	}

	function renderIsActiveCell(row: GridRenderCellParams) {
		return (
			<Typography color={row.value ? "primary" : "secondary"}>
				{row.value ? 'Active' : 'Inactive'}
			</Typography>
		)
	}

	function renderNameCell(rowData: GridRenderCellParams) {
		return (
			<Link to={`/categories/edit/${rowData.id}`} style={{ textDecoration: " none" }}>
				<Typography color="primary">{rowData.value}</Typography>
			</Link>
		)
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
					New Category
				</Button>
			</Box>



			<Box sx={{ display: "flex", height: 600 }}>
				<DataGrid
					rows={rows}
					columns={columns}
					disableColumnFilter
					disableColumnSelector
					disableDensitySelector
					disableSelectionOnClick
					componentsProps={componentProps}
					components={{ Toolbar: GridToolbar }}
					rowsPerPageOptions={[2, 20, 50, 100]}

				/>
			</Box>
		</Box>
	)
}
