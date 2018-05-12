module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]
    },
    "globals": {
        "document": false,
        "window":true
      }
};