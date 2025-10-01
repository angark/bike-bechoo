const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "bikebecho";
    if (file.fieldname === "rcImage") folder = "bikebecho/rcImages";
    if (file.fieldname === "bikeImages") folder = "bikebecho/bikeImages";

    return {
      folder,
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
