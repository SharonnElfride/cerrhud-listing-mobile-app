interface BasePermission {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

type PermissionMap<T extends string> = Record<T, BasePermission>;

export { type PermissionMap };
