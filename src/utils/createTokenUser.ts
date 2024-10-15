const createTokenUser = (user: { id: string, role: number }) => {
  return {
    userId: user.id,
    role: user.role
  };
};

export default createTokenUser;
