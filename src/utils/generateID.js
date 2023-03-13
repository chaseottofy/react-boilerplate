const generateID = () => {
  const currentTime = Date.now().toString(36);
  const randomNumber = Math.random().toString(36).substring(2);
  return currentTime + randomNumber;
};

export default generateID;