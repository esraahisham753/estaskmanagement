import multer from 'multer';
import nextConnect from 'next-connect';

// Set up multer storage
const storage = multer.diskStorage({
  destination: './public/uploads', // Define where to save files
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to filename
  }
});

// Initialize multer
const upload = multer({ storage });

const handler = nextConnect();

// Use multer middleware to handle file uploads
handler.use(upload.single('image')).post((req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`; // Generate URL for the uploaded image
  res.status(200).json({ imageUrl });
});

export { handler as GET, handler as POST }; // Export GET and POST handlers
