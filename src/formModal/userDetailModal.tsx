import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import img from './../images/avatar/1.jpg';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: "auto"
  };
type propTypes ={
    open: boolean;
    onClose: () => void;
    selectedRow:any;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface Column {
  id: string;
  name: string;
} 

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const UserDetailModal :React.FC<propTypes> = ({open, onClose, selectedRow}) => {

  const postColumns: Column[] = [
    { id: 'id', name: 'Id' },
    { id: 'title', name: 'Title' },
    { id: 'body', name: 'Body' },
  ];
  
  const todoColumns: Column[] = [
    { id: 'id', name: 'Id' },
    { id: 'title', name: 'Title' },
    { id: 'completed', name: 'Completed'}
  ];
  const albumColumns: Column[] = [
    { id: 'id', name: 'Id' },
    { id: 'title', name: 'Title' },
  ];

  const [value, setValue] = React.useState(0);
  const [postRows, setPost] = useState([]);
  const [todoRows, setTodo] = useState([]);
  const [albumRows, setAlbum] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

  const handlechangepage = (event: React.MouseEvent<HTMLButtonElement> | null, newpage: number) => {
    pagechange(newpage);
  };

  const handleRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  useEffect(() => {
    const getPostList = () => {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${selectedRow.id}/posts`)
        .then((res) => {
          console.log(res);
          setPost(res.data);
        })
        .catch((err) => console.log(err))
        .finally();
    };
    const getTodoList = () => {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${selectedRow.id}/todos`)
        .then((res) => {
          console.log(res);
          setTodo(res.data);
        })
        .catch((err) => console.log(err))
        .finally();
    };
    const getAlbumList = () => {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${selectedRow.id}/albums`)
        .then((res) => {
          console.log(res);
          setAlbum(res.data);
        })
        .catch((err) => console.log(err))
        .finally();
    };
    getPostList();
    getTodoList();
    getAlbumList();
  }, [selectedRow]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{width:'100%', height:'100%'}}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Details
          </Typography>
          <Card sx={{ display: 'flex', boxShadow: 1 }}>
            <CardMedia
              sx={{ width: 151 }}
            >
              <Avatar
                alt="Remy Sharp"
                src={img}
                sx={{ width: '80%', height: '80%', margin: '10%' }}
              />
            </CardMedia>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                {selectedRow.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                {selectedRow.username}, {selectedRow.email}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                {selectedRow.company.name}, {selectedRow.phone}, {selectedRow.website}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                {selectedRow.address.suite} {selectedRow.address.street}, {selectedRow.address.city}, {selectedRow.address.zipcode}
                , Lat: {selectedRow.address.geo.lat}, Lng: {selectedRow.address.geo.lng} 
                </Typography>
              </CardContent>
            </Box>
          </Card>

          <Box sx={{ borderBottom: 1, borderColor: 'divider',width: "100%", display: "table", tableLayout: "fixed"  }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="POSTS" {...a11yProps(0)} />
                <Tab label="TODOS" {...a11yProps(1)} />
                <Tab label="ALBUMS" {...a11yProps(2)} />
              </Tabs>
            <CustomTabPanel value={value} index={0}>
              <Paper sx={{ width: '100%', height: '100%' }}>
                <TableContainer sx={{fontSize: 2, fontFamily: 'sans-serif'}}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {postColumns.map((column) => (
                          <TableCell key={column.id}>
                            {column.name}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {postRows &&
                        postRows
                          .slice(page * rowperpage, page * rowperpage + rowperpage)
                          .map((row, i) => {
                            return (
                              <TableRow key={i}
                              >
                                {postColumns &&
                                  postColumns.map((column, i) => {
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
                  count={postRows.length}
                  component="div"
                  onPageChange={handlechangepage}
                  onRowsPerPageChange={handleRowsPerPage}
                ></TablePagination>
              </Paper>
            </CustomTabPanel>
            
            <CustomTabPanel value={value} index={1}>
              <Paper sx={{ width: '100%', height: '100%' }}>
                  <TableContainer sx={{fontSize: 2, fontFamily: 'sans-serif'}}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          {todoColumns.map((column) => (
                            <TableCell key={column.id}>
                              {column.name}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {todoRows &&
                          todoRows
                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                            .map((row, i) => {
                              return (
                                <TableRow key={i}
                                >
                                  {todoColumns &&
                                    todoColumns.map((column, i) => {
                                      let value = row[column.id];
                                      return <TableCell key={value}>{(String (value))}</TableCell>;
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
                    count={todoRows.length}
                    component="div"
                    onPageChange={handlechangepage}
                    onRowsPerPageChange={handleRowsPerPage}
                  ></TablePagination>
                </Paper>            
              </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            <Paper sx={{ width: '100%', height: '100%' }}>
                  <TableContainer sx={{fontSize: 2, fontFamily: 'sans-serif'}}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          {albumColumns.map((column) => (
                            <TableCell key={column.id}>
                              {column.name}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {albumRows &&
                          albumRows
                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                            .map((row, i) => {
                              return (
                                <TableRow key={i}
                                >
                                  {albumColumns &&
                                    albumColumns.map((column, i) => {
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
                    count={albumRows.length}
                    component="div"
                    onPageChange={handlechangepage}
                    onRowsPerPageChange={handleRowsPerPage}
                  ></TablePagination>
                </Paper>   
            </CustomTabPanel>
          </Box>
        </Box>
    </Modal>  
    )
}

export default UserDetailModal