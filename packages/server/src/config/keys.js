module.exports = {
  app: {
    name: "MERN App",
    apiEndpoint: (process.env.API_URL) ? `/${process.env.API_URL}` : '/api',
  },
  database: {
    // url: process.env.MONGODB_URI || 'mongodb://localhost:27017/MERNApp', // for local mongodb
    url: "mongodb+srv://bongo-admin:Y0uC@nD0It@cluster0.jb6ow.mongodb.net/bongo?retryWrites=true&w=majority" // for mongodb atlas, comment the above line, uncomment this line, and add your connection string.
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt-secret',
    tokenLife: '7d',
  },
}
