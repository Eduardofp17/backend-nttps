class CNPJ {
  static formatCnpj(cnpj) {
    cnpj = String(cnpj);
    const letters = /[a-z]/gi;
    if (cnpj.match(letters)) return 'Invalid CNPJ';
    const cnpjNumber = /[0-9]/gi;
    return String(cnpj.match(cnpjNumber).join(''));
  }

  static async consultCnpj(cnpj) {
    try {
      const formatedCnpj = CNPJ.formatCnpj(cnpj);
      if (formatedCnpj === 'Invalid CNPJ') return false;
      const response = await fetch(`https://receitaws.com.br/v1/cnpj/${formatedCnpj}`, {
        method: 'GET',
        headers: {
          'sec-fetch-mode': 'no-cors',
        },
      }).then((data) => data.json());

      if (response.message === 'CNPJ inválido') return false;

      return true;
    } catch (e) {
      return false;
    }
  }
}

/**
 * Testing if when i call the function getData() I have an boolean as a result
 */
// (async () => {
//   console.log(await CNPJ.consultCnpj('07.954.514/0361-54')); // expected true
//   console.log(await CNPJ.consultCnpj('07.9af54.514/0361-54')); // expected false
// })();
export default CNPJ;
