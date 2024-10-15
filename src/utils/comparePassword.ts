import bcrypt from 'bcryptjs';

const comparePassword = async (candidatePassword: string, password: string) => {
  const isMatch = await bcrypt.compare(candidatePassword, password);
  return isMatch;
};

export default comparePassword;