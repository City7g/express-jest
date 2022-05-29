const app = require("./app");
const sequelize = require('./backend/data/db')

app.listen(3000, async () => {
  // try {
  //   await sequelize.authenticate();
  //   console.log('Connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);
  // }

  try {
    // await sequelize.sync({force: true})
    await sequelize.sync()
    // app.listen(PORT)
  } catch (err) {
    console.log(err)
  }


  console.log("Example app listening on port 3000!");
});