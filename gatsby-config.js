module.exports = {
    plugins: [
      // You should only have one instance of this plugin
      {
        resolve: `gatsby-plugin-netlify-identity`,
        options: {
          url: `https://todoapp212.netlify.app/` // required!
        }
      }
    ]
  }