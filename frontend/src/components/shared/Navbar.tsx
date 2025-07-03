import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';

type MenuItem = {
  label: string;
  to: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.auth.user);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setUser(null));
    navigate('/signin');
    setDrawerOpen(false);
  };

  const isAuthenticated = !!user;

  const menuItems: MenuItem[] = !isAuthenticated
    ? [
        { label: 'SignIn', to: '/signin', style: { borderRadius: 4, textDecoration: 'none', color: '#1976d2', padding: '6px 16px', border: '1px solid #1976d2' } },
        { label: 'SignUp', to: '/signup', style: { borderRadius: 4, textDecoration: 'none', color: '#fff', background: '#1976d2', padding: '6px 16px' } },
      ]
    : [
        { label: 'Home', to: '/', style: { textDecoration: 'none', color: '#1976d2', fontWeight: 600 } },
        { label: 'Profile', to: '/profile', style: { textDecoration: 'none', color: '#1976d2', fontWeight: 600 } },
        { label: 'Logout', to: '', style: { cursor: 'pointer', fontWeight: 600, color: '#1976d2' }, onClick: handleLogout },
      ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#f8f9fa', color: '#1976d2' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, color: '#1976d2', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <span style={{ display: 'flex', alignItems: 'center', marginRight: 8, gap: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32" fill="#1976d2">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              Task Manager
            </span>
          </Typography>
          {!isMobile && (
            !isAuthenticated ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link
                  to="/signin"
                  style={{ borderRadius: 4, textDecoration: 'none', color: '#1976d2', padding: '6px 16px', border: '1px solid #1976d2' }}
                >
                  SignIn
                </Link>
                <Link
                  to="/signup"
                  style={{ borderRadius: 4, textDecoration: 'none', color: '#fff', background: '#1976d2', padding: '6px 16px' }}
                >
                  SignUp
                </Link>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 600 }}>
                  Home
                </Link>
                <Link to="/profile" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 600 }}>
                  Profile
                </Link>
                    <Link to="/task-manager" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 600 }}>
                  Assign-Tasks
                </Link>
                <Typography
                  sx={{ cursor: 'pointer', fontWeight: 600, color: '#1976d2' }}
                  onClick={handleLogout}
                >
                 Logout
                </Typography>
              </Box>
            )
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 220 } } }}
      >
        <List>
          {menuItems.map((item) =>
            item.label !== 'Logout' ? (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem key={item.label} disablePadding>
                <ListItemButton onClick={item.onClick}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
}

export default Navbar;