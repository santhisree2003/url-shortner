const logger = {
  log: (action, payload) => {
    const logs = JSON.parse(localStorage.getItem("logs")) || [];
    logs.push({ action, payload, time: new Date() });
    localStorage.setItem("logs", JSON.stringify(logs));
  }
};
export default logger;
