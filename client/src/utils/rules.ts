const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^[a-zA-Z0-9]{6,16}$/;
const namePattern = /^[\u4e00-\u9fffa-zA-Z0-9]{1,10}$/;
const phonePattern = /^09\d{8}$/;

export {
  emailPattern,
  passwordPattern,
  namePattern,
  phonePattern,
};
