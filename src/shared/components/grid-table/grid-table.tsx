import { DataGrid } from "@mui/x-data-grid";
import './grid-table.sass'

export default function GridTable(props: any) {
    const { tableValue, columns } = props;

    return (
        <div className="respondive-mui" style={{ height: 700, width: '100%' }}>
            <DataGrid
                rows={tableValue}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </div>

    );
}