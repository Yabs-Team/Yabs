module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:8080/', 'http://localhost:8080/admin', 'http://localhost:8080/find'],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
