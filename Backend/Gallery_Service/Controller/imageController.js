const path = require("path");
const fs = require("fs");

exports.uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });
  res.json({
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
};

exports.getImages = (req, res) => {
  const directoryPath = path.join(__dirname, "../uploads");
  fs.readdir(directoryPath, (err, files) => {
    if (err) return res.status(500).send("Unable to scan files");
    const fileInfos = files.map((file) => ({
      name: file,
      url: `${req.protocol}://${req.get("host")}/uploads/${file}`.trim(),
    }));
    res.status(200).send(fileInfos);
  });
};
