module.exports = {
  id: 'example1',
  interval: 5000, // ms
  job() {
    return Promise.resolve({ randomNumber: Math.round(Math.random() * 1000) });
  },

};
