import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Menu from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import classNames from 'classnames';
import { NavLink as Link } from 'react-router-dom';
import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import styles from './styles';
import Sidebar from "app/shared/layout/SideBar/Sidebar";

export interface BrandProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo_vcbs.svg" alt="Logo" />
  </div>
);

export const Brand = ({ isSidebarOpen, toggleSidebar }: BrandProps) => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <BrandIcon />
    <span className="brand-title">VCBS OD2009 REPORT</span>
    <span className="navbar-version">{VERSION}</span>
  </NavbarBrand>
);
export const SideBarIcon = ({isSidebarOpen, toggleSidebar} : BrandProps) => (
  <IconButton
    color="inherit"
    onClick={toggleSidebar}
    classes={{
      root: classNames(`${styles.headerMenuButtonSandwich}`)
    }}
  >
    {isSidebarOpen ? (
      <ArrowBack
        classes={{
          root: classNames(
            `${styles.headerIcon}`,
            `${styles.headerIconCollapse}`,
          ),
        }}
      />
    ) : (
      <Menu
        classes={{
          root: classNames(
            `${styles.headerIcon}`,
            `${styles.headerIconCollapse}`,
          ),
        }}
      />
    )}
  </IconButton>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>Home</span>
    </NavLink>
  </NavItem>
);
