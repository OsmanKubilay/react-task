import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
type propTypes ={
    open: boolean;
    onClose: () => void;
    selectedRow:any;
}
const UserDetailForm :React.FC<propTypes> = ({open, onClose, selectedRow}) => {
  return (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Details
          </Typography>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">E-Mail</TableCell>
            <TableCell align="right">Adress</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Website</TableCell>
            <TableCell align="right">Company Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={selectedRow.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {selectedRow.id}
              </TableCell>
              <TableCell align="right">{selectedRow.name}</TableCell>
              <TableCell align="right">{selectedRow.username}</TableCell>
              <TableCell align="right">{selectedRow.email}</TableCell>
              <TableCell align="right">{selectedRow.address.suite} {selectedRow.address.street}, {selectedRow.address.city}, {selectedRow.address.zipcode}, Lat: {selectedRow.address.geo.lat}, Lng: {selectedRow.address.geo.lng}</TableCell>
              <TableCell align="right">{selectedRow.phone}</TableCell>
              <TableCell align="right">{selectedRow.website}</TableCell>
              <TableCell align="right">{selectedRow.company.name}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    </Modal>  
    )
}

export default UserDetailForm