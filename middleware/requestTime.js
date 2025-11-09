export const requestTime = (req, res, next) => {
  const date = new Date().toISOString();
  console.log(`date time ${date}`);
  next();
};