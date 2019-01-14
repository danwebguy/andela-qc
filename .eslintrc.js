module.exports = {
    "extends": "airbnb-base",
    globals: {
        SwaggerEditor: false
      },
      env: {
        browser: true,
        node: true,
        mocha: true
      },
      rules:{
        "linebreak-style": 0,
        "no-param-reassign": [2, { 
              "props": false
          }],
      }
    };