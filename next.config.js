const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
  require.extensions['.css']=file=>{}
}

module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  },
  ...withCss({})
}
