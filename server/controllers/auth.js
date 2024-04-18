// @ts-nocheck
import {db} from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const register = (req, res) => {

  const q = "SELECT * FROM users WHERE email=? OR username=?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('Такой пользователь уже существует!');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      hash
    ];

    db.query(q, [values], (err,data) => {
      if (err) return res.json(err);
      res.status(200).json('Пользователь создан успешно')
    })
  })
}

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username=?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('Пользователь не найден!');

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

    if (!isPasswordCorrect) return res.status(400).json('Имя пользователя или пароль не верны');

    const token = jwt.sign({id: data[0].id}, process.env.SECRET_KEY);
    const {password, ...other} = data[0];

    res.cookie('access_token', token, 
    {
      httpOnly: true,
      // secure: true,
      sameSite: true
    })
    .status(200).json(other);
  });
}

export const logout = (req, res) => {
  res.clearCookie('access_token', {
    sameSite: 'none',
    secure: true
  })
  res.status(200).json('Пользователь вышел из системы')
}
