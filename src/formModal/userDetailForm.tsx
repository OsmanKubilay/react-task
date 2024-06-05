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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


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
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

const UserDetailForm :React.FC<propTypes> = ({open, onClose, selectedRow}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
        </Box>
        

    </Modal>  
    )
}

export default UserDetailForm