import React, { useState } from 'react';
import { Drawer, List, Box } from '@mui/material';
import {EntitiesMenu} from "app/shared/layout/menus";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [openEntities, setOpenEntities] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setOpenEntities(!openEntities);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: '75px',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
        },
      }}
      variant="persistent"
      anchor="left"
      open={isOpen}
      onClose={toggleSidebar}
    >
      <Box sx={{ display: 'flex', height: '100%', paddingTop: '16px', paddingLeft: '32px' }}>
        <List>
          <EntitiesMenu />
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
