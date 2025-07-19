import ScrollBarLayout from "components/layout/ScrollBarLayout";
import {useMemo } from "react";
import { useSelector } from "react-redux";
import { MASTER_PERMISSION } from "service/config/permissionlist";
import NavItem from "./NavItem";
import { shallowEqual } from 'react-redux';

const NavContainer = ({ navlist }) => {
  const permissions = useSelector(
    (state) => state.auth.user?.roleRef?.permission ?? [],
    shallowEqual
  );

  const hasAdminPermission = permissions.includes(MASTER_PERMISSION.ADMIN);

  const filteredNavItems = useMemo(() => {
    return hasAdminPermission
      ? navlist
      : navlist.filter((item) => permissions.includes(item.uuid));
  }, [navlist, permissions, hasAdminPermission]);

  if (!filteredNavItems.length) {
    return null;
  }

  return (
    <ScrollBarLayout>
      {filteredNavItems.map((item) => (
        <NavItem key={`nav-${item.uuid}`} navObj={item} />
      ))}
    </ScrollBarLayout>
  );
};

export default NavContainer;
