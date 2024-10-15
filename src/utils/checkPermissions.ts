import { UnauthorizedError } from '../errors/index.js';

const checkPermissions = (requestUser: {
    userId: string,
    role: number
  },
  resourceUserId: string) => {
  if (requestUser.role === 1) {
    return;
  };

  if (requestUser.userId === resourceUserId) {
    return;
  };

  throw new UnauthorizedError('未經授權存取');
};

export default checkPermissions;
