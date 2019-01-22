import multer from 'multer';

export default (app) => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'imageuploads');
    },
    filename: (req, file, cb) => {
      cb(null, `${new Date().toISOString()}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
};
