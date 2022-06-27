module.exports = {
  invalidParams: (data) => {
    return Object.entries(data)
      .filter(([key, item]) => !item)
      .map(([key]) => key);
  },
  invalidNumberParams: (data) => {
    return Object.entries(data)
      .filter(([key, item]) => !Number(item))
      .map(([key]) => key);
  },
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
