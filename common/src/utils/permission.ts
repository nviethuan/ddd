export enum Permission {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const PERMISSIONS_MAP = {
  r: 4,
  w: 2,
  x: 1,
};

export const DEFAULT_PERMISSIONS = [6, 4, 4];

/**
 * Extracts the permission string to a number array
 * @param permissionString - The permission string to extract
 * @returns The permission number array [root, group, public] - array of 3 digits [7,7,7]
 */
export function extractPermission(permissionString: string): number[] {
  let root = 0,
    group = 0,
    _public = 0;

  for (let i = 0; i < 9; i++) {
    const value = PERMISSIONS_MAP[permissionString[i]] || 0;
    if (i < 3) {
      root += value;
    } else if (i < 6) {
      group += value;
    } else {
      _public += value;
    }
  }

  return [root, group, _public];
}
