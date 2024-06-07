
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SupervisedUserCircleSharpIcon from '@mui/icons-material/SupervisedUserCircleSharp';

function Navbar() {

  return (
      <div className='navbar'>
      <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SupervisedUserCircleSharpIcon/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Şehir Işıkları
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Users
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
}
export default Navbar;