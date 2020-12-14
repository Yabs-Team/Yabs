module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/admin', 'http://localhost:3000/find'],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
