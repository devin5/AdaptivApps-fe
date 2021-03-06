import React from 'react';
import { useAuth0 } from '../../../config/react-auth0-spa';
import config from '../../../config/auth_config';
import PropTypes from 'prop-types';
import {
  makeStyles,
  useTheme,
  Box,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Button,
} from '@material-ui/core';
import NavLink from './NavLink';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import UserIcon from '@material-ui/icons/PersonOutlineOutlined';
import GroupIcon from '@material-ui/icons/GroupAddOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { IconContext } from 'react-icons';
import { FiLogOut } from 'react-icons/fi';
import acsLogo from '../../../assets/images/acsLogo.png';

const drawerWidth = '25rem';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
  },
  navPaper: {
    border: 'none',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    border: 'none',
    boxShadow:
      '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14)',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  imgBox: {
    width: drawerWidth,
    marginTop: '5rem',
    '& img': {
      width: drawerWidth,
    },
  },
  navContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    width: '98%',
  },
  navLink: {
    height: '5rem',
    display: 'flex',
    alignContent: 'flex-start',
    alignItems: 'center',
    margin: '.5rem auto',
    textAlign: 'left',
  },
  logoutContainer: {
    display: 'flex',
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
  },
  logoutBtn: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '0 0 2rem 0',
    textTransform: 'none',
    fontSize: '1.6rem',
    width: '100%',
  },
  logoutIcon: {
    color: '#2962FF',
    margin: '0 1rem 0 3rem',
    fontSize: '2.5rem',
  },
  navIcon: {
    margin: '0 1rem 0 3rem',
    fontSize: '2.5rem',
  },
  iconActive: {
    color: '#FFFFFF'
  },
  logoutP: {
    color: '#2962FF',
  },
}));

function SideNav2(props) {
  const { user } = props;
  const { logout } = useAuth0();
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Box className={classes.imgBox}>
        <img src={acsLogo} alt="ACS Logo" />
      </Box>
      <Box className={classes.navContainer}>
        <NavLink to="calendar" className={classes.navLink}>
          <CalendarTodayIcon className={classes.navIcon} />
          <p>Events Calendar</p>
        </NavLink>
        <NavLink to="myevents" className={classes.navLink}>
          <BookmarkIcon className={classes.navIcon} />
          <p>My Events</p>
        </NavLink>
        <NavLink to="/" className={classes.navLink}>
          <UserIcon className={classes.navIcon} />
          <p>My Profile</p>
        </NavLink>
        {user && user[config.roleUrl].includes('Admin') ? (
          <>
            <NavLink to="manage" className={classes.navLink}>
              <HomeIcon className={classes.navIcon} />
              <p>Manage Events</p>
            </NavLink>
            <NavLink to="users" className={classes.navLink}>
              <GroupIcon className={classes.navIcon} />
              <p>Manage Users</p>
            </NavLink>
          </>
        ) : null}
      </Box>
      <Box className={classes.logoutContainer}>
        <Button className={classes.logoutBtn} onClick={() => logout()}>
          <IconContext.Provider
            value={{ style: { transform: 'rotate(180deg)' } }}
          >
            <FiLogOut className={classes.logoutIcon} />
            <p className={classes.logoutP}>Log Out</p>
          </IconContext.Provider>
        </Button>
      </Box>
    </>
  );

  return (
    <div className={classes.root}>
      <Toolbar position="fixed">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon className={classes.navIcon} />
        </IconButton>
      </Toolbar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

SideNav2.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default SideNav2;
