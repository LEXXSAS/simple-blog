// @ts-nocheck
import { db } from "../db.js";
import jwt from 'jsonwebtoken';
import sharp from 'sharp';

const fileUploadFunc = async(file, avatarImg) => {
  await file.mv('./static/lg/' + avatarImg)
  sharp(`./static/lg/${avatarImg}`)
  .jpeg({ quality: 30 })
  .resize(200)
  .toFile(`./static/${avatarImg}`)
  .then(() => {
  });
}

class FileController {

  async uploadAvatar(req, res) {
    try {
      const token = req.cookies.refresh_token
      if (!token) return res.status(401).json('Not authenticated!');
      jwt.verify(token, process.env.SECRET_KEY_REFRESH, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const file = req.files.file
        const avatarName = Date.now() + file.name
        fileUploadFunc(file, avatarName)
    
        const q = "UPDATE users SET `img`=? WHERE `id`=?"
    
        db.query(q, [avatarName, userInfo.id], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json({avatarName: avatarName, message: "Аватар был успешно загружен!"});
        })
      });
    } catch (error) {
      console.log(error)
      return res.status(400).json({message: 'upload avatar error'})
    }
  }

}

export default new FileController()
