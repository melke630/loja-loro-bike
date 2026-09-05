/*import multer from 'multer';

const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

export default upload*/

/*import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars'); // pasta onde o arquivo será salvo
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

export default upload;*/

import multer from 'multer';
import path from 'path';

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/avatars'); // pasta onde o arquivo será salvo
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// Middleware de upload
const upload = multer({ storage });

export default upload;