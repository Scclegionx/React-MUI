import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const EntitiesMenu = () => {
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/orders">
        Orders
      </MenuItem>
      {isAuthenticated && isAdmin && (
        <>
          <MenuItem icon="asterisk" to="/fund">
            Fund
          </MenuItem>
          <MenuItem icon="asterisk" to="/symbol">
            Symbol
          </MenuItem>
          <MenuItem icon="asterisk" to="/hang-order">
            Hang Order
          </MenuItem>
          <MenuItem icon="asterisk" to="/hang-order-new">
            Hang Order New
          </MenuItem>
          <MenuItem icon="asterisk" to="/match-order">
            Match Order
          </MenuItem>
          <MenuItem icon="asterisk" to="/match-order-new">
            Match Order New
          </MenuItem>
        </>
      )}

    </>
  );
};

export default EntitiesMenu;
