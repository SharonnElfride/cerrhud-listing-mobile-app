import type { PermissionMap } from "./Permission";

type UserPermissionResource = "profiles" | "medical_tests";

type UserPermissions = PermissionMap<UserPermissionResource>;

export {
    type UserPermissions
}
