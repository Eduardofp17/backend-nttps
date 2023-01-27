const generateCode = () => {
  const code = ['#'];
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ';
  for (let i = 0; i < 11; i++) {
    const randomValue = Math.floor(Math.random() * chars.length);
    code.push(chars[randomValue]);
  }
  return code.join('');
};
export default function codeGenerator() {
  let codeValue = generateCode();
  const number = /[0-9]/gi;
  const hasNumber = codeValue.match(number);
  do {
    codeValue = generateCode();
  } while (!hasNumber);

  return codeValue;
}
