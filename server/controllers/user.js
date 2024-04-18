// @ts-nocheck
import {db} from '../db.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const userinfo = (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not authenticated!');
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
  
      const q = "SELECT * FROM users WHERE `id`=?"
  
      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json('Пользователь не найден!');
        const {password, ...other} = data[0];
        return res.json(other);
      })
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: 'upload avatar error'})
  }
}
