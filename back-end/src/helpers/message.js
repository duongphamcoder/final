export const getMessage = (status, data, message = '') => {
  return {
    status,
    data,
    message: message,
  };
};
