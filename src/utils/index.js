module.exports = {
  /**
   * @description Verifica se os paramêtros são inválidos: string vazia, null ou undefined
   * @param {*} data
   * @returns
   */
  invalidParams: (data) => {
    return Object.entries(data)
      .filter(([key, item]) => !item)
      .map(([key]) => key);
  },
  /**
   * @description Verifica se os paramêtros são números inválidos.
   * @param {*} data
   * @returns
   */
  invalidNumberParams: (data) => {
    return Object.entries(data)
      .filter(([key, item]) => !Number(item))
      .map(([key]) => key);
  },
  /**
   * @description Verifica se os paramêtros são inválidos, caso seja informado um array de chaves ira verifica se são números.
   * @example
   * // return ["qtd", "name"]
   * foo(["value", "qtd"],{value: 1, qtd:"t",name: ""});
   * @param {string[]} arrKeysNumber
   * array das chaves que são números.
   * @param {*} data
   * @returns
   */
  invalidParamsNumberAndString: (arrKeysNumber = [], data) => {
    return Object.entries(data)
      .filter(([key, value]) => {
        if (arrKeysNumber.includes(key)) {
          return !Number(value);
        }
        return !value;
      })
      .map(([key]) => key);
  },
};
