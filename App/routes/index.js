const routes = (app) => {
    app.use("/pet", require("./pet"));
    app.use("/user", require("./user"));
    app.use("/userRequest", require("./userrequest"));
    app.use("/adoptionRequest", require("./adoptionrequest"));
    app.use("/adoption", require("./adoption"));
    app.use("/admin", require("./admin"));
    app.use("/tracking", require("./tracking"));
    app.use("/surrender", require("./surrender"));
  
  };
  
  module.exports = routes;