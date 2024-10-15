export default function maskPhoneNumber (phone: string) {
  return phone.replace(/(\d{2})\d{4}(\d{4})/, '$1****$2');
}
