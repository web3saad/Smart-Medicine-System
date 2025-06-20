import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TopProductBar from "./TopProductBar";

function createData(
  id: number,
  name: string,
  popularity: number,
  sales: number
) {
  return { id, name, popularity, sales };
}

const rows = [
  createData(1, "Neopectin Syrup", 45, 45),
  createData(2, "Ebastine Tablet", 35, 35),
  createData(3, "BirdBoost Feather Supplement", 32, 32),
  createData(4, "Indapamide 2.5 mg Tablet", 25, 25),
  createData(5, "Protonox Capsule", 10, 10),
];

export default function TopProductTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 65 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id </TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Popularity</TableCell>
            <TableCell align="center">Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">
              
                <TopProductBar value={row.popularity} />
              </TableCell>
              <TableCell align="center">
                {" "}
                <p className="border border-green-400 rounded-lg py-2 ">{row.sales}%</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
