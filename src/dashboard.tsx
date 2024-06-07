import * as React from 'react';
import {useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import axios from "axios";
import UserDetailModal from './formModal/userDetailModal';
import Navbar from './components/Navbar'


interface Column {
  id: string;
  name: string;
}

function Dashboard() {
  const [open, setOpen] = useState<boolean>(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const columns: Column[] = [
    { id: 'id', name: 'Id' },
    { id: 'name', name: 'Name' },
    { id: 'email', name: 'Email' },
    { id: 'phone', name: 'Phone' },

  ];
  const handleModal=(row:any)=>{
    setSelectedRow(row)
    console.log(row);
    setOpen(true)
  }

  const handlechangepage = (event: React.MouseEvent<HTMLButtonElement> | null, newpage: number) => {
    pagechange(newpage);
  };

  const handleRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };
  const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

useEffect(() => {
  const getUserList = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        console.log(res);
        rowchange(res.data);
      })
      .catch((err) => console.log(err))
      .finally();
  };

  getUserList();
}, [])


  return (
    <div className='content'>
      <Navbar/>
        <div style={{ textAlign: 'center' }}>
          <h1>User List</h1>
          <Paper sx={{ width: '90%', marginLeft: '5%' }}>
            <TableContainer sx={{ maxHeight: 450 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {column.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows &&
                    rows
                      .slice(page * rowperpage, page * rowperpage + rowperpage)
                      .map((row, i) => {
                        return (
                          <TableRow key={i}
                          onClick={() => handleModal(row)}
                          sx={{ cursor: 'pointer' }}
                          >
                            {columns &&
                              columns.map((column, i) => {
                                let value = row[column.id];
                                return <TableCell key={value}>{value}</TableCell>;
                              })}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              rowsPerPage={rowperpage}
              page={page}
              count={rows.length}
              component="div"
              onPageChange={handlechangepage}
              onRowsPerPageChange={handleRowsPerPage}
            ></TablePagination>
          </Paper>
        </div>
        {selectedRow  && <UserDetailModal selectedRow={selectedRow} open={open} onClose={()=>setOpen(false)}/>
        }    
    </div>

  );
}
export default Dashboard;