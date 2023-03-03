const express = require("express");
const middlewares = require("./libs/middleware/middleware");
const authRoutes = require("./routes/authRoutes").router;
const imagesRoutes = require("./routes/imagesRoutes").router;
const adminRoutes = require("./routes/adminRoutes").router;
const userRoutes = require("./routes/userRoutes").router;
const expressSanitizer = require("express-sanitizer");
var cors = require('cors')
const app = express();
const PORT = 4000;

require("./libs/database/database");
app.use(expressSanitizer());
middlewares.setupMiddleware(app);

app.use(cors())

app.use("/auth", authRoutes);
app.use("/images", imagesRoutes);
app.use("/admin", adminRoutes);
app.use('/user', userRoutes);


app.use("/", (req, res) => {
  res.send("Hello Friend, fixing?!");
});

app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));

exports.app = app;
