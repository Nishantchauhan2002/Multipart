const { error } = require("console");
const express = require("express");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
//enctype="multipart/form-data" is used to encrypt the data that we have passed in the forms 


const app = express();

const path = require("path");
const PORT = 3990;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}- ${file.originalname}`);
  },
});

const upload = multer({ storage });
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("homepage");
});

app.get("/uploaded", (req, res) => {
  //   res.json({ msg: "File uploaded SuccesFully" });
  res.render("successPage");
});
app.post("/upload", upload.single("profileImage"), (req, res) => {
  if (!req.file) return res.json({ msg: "Please upload a file" });

  console.log(req.body);
  console.log(req.file);

  return res.redirect("/uploaded");
});

app.listen(PORT, () => {
  console.log(`Hello from the server ${PORT}`);
});
