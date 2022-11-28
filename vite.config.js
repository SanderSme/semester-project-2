const { resolve } = require('path');

export default {
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        signUp: resolve(__dirname, 'signup.html'),
        logIn: resolve(__dirname, 'login.html'),
        createPost: resolve(__dirname, 'list-item.html'),
        singlePost: resolve(__dirname, 'details.html'),
        profile: resolve(__dirname, 'profile.html'),
        // editPost: resolve(__dirname, 'edit-bid.html'),
      },
    },
  },
};
