export const uploadFile = async (req, res) => {
  res.json({ 
    message: "File uploaded with success",
    filename: req.file.filename,
  });
}
