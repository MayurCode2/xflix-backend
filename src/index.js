const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

mongoose
  .connect(config.mongoose.url)
  .then(() => console.log("Connected to Database at ", config.mongoose.url))
  .catch((error) => console.log("Failed to connect database at ", error));

app.listen(config.port, () => {
  console.log("server is running on port ", config.port);
});
