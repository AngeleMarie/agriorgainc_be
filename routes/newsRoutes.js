import express from 'express';
import multer from 'multer';
import newsController from '../controllers/newsController.js';

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder for file uploads
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`); // Add timestamp to avoid duplicate filenames
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept only image files
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter,
});

// Get all news
router.get('/', newsController.getAllNews);

// Create news with optional image upload
router.post('/add', upload.single('image'), newsController.createNews);

router.put('edit/:id', newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

export default router;
