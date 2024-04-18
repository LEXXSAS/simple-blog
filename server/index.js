// @ts-nocheck
import express from "express";
import cors from "cors"; 
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import fileRoutes from './routes/file.js';
import sharp from 'sharp';
import 'dotenv/config'
import path from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload'
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.SERVER_PORT || 8888;

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('static'))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));


let newNameImg;

// build dist
// '../client/dist/images/lg/' + newNameImg
// ../client/dist/images/lg/${newNameImg}
// ../client/dist/images/sm/${newNameImg}

// dev
//'../client/src/images/lg/' + newNameImg
// ../client/src/images/lg/${newNameImg}
// ../client/src/images/sm/${newNameImg}

const middleWareUploadFile = async(req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
  });

  const file = req.files.file
  newNameImg = Date.now() + file.name
  await file.mv('../client/dist/images/lg/' + newNameImg)
  sharp(`../client/dist/images/lg/${newNameImg}`)
  .jpeg({ quality: 30 })
  .resize(500)
  .toFile(`../client/dist/images/sm/${newNameImg}`)
  .then(() => {
  });
  next()
}

// for server linux

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../client/dist')));

// app.use(express.static(path.join(__dirname, '../client/dist', 'index.html')));
// console.log(path.join(__dirname, '../client/dist', 'index.html'));

const arrayPath = ['/', '/register', '/login', '/profile', '/write', '/post/:id', ];

app.get(arrayPath, function (req, res) {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.post('/api/upload', middleWareUploadFile, (req, res) => {
  res.status(200).json(newNameImg)
})

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/uploadavatar', fileRoutes);

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
})
