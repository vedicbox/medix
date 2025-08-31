import ScrollBarLayout from "components/layout/ScrollBarLayout";
import { MASTER_PERMISSION } from "config/module/ID_Config";
import { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import NavItem from "./NavItem";

const NavContainer = ({ navlist }) => {
  const permissions = useSelector(
    (state) => state.auth.user?.roleRef?.permission ?? [],
    shallowEqual
  );

  const hasAdminPermission = permissions.includes(MASTER_PERMISSION.ADMIN);

  const filteredNavItems = useMemo(() => {
    if (hasAdminPermission) return navlist;
    return navlist
      .filter((item) => permissions.includes(item.uuid))
      .map((item) => ({
        ...item,
        children: item.children?.filter((childItem) =>
          permissions.includes(childItem.uuid)
        ),
      }));
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
