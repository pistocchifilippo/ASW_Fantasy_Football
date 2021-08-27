import md5 from 'js-md5'

const handleError = fn => (...params) => fn(...params)

export const utils = {
  cryptoMD5: handleError(payload => {
    payload.password=md5(payload.password);
    return payload;
  })
};