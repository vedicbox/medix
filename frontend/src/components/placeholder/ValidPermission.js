import { ACCESS_TAG } from "config/module/tags";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const usePermissions = () => {
    const permissions = useSelector(state =>
        state.auth.user?.roleRef?.permission || []
    );
    const hasPermission = useMemo(() => {
        return (uuid) => uuid == ACCESS_TAG.PUBLIC || permissions.includes(uuid) || permissions.includes("0");
    }, [permissions]);

    return { permissions, hasPermission };
};


export default function ValidPermission({ uuid, children }) {
    const { hasPermission } = usePermissions();
    const hasAccess = useMemo(() => hasPermission(uuid), [hasPermission, uuid]);

    return hasAccess ? children : null;
}
