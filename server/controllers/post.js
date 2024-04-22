// @ts-nocheck
import { db } from "../db.js";
import jwt from 'jsonwebtoken';
import fs from 'fs';

let rowperpage = 2;
let pages = null;
let countresult = null;

export const getCount = (req, res) => {
  const countsql = req.query.cat ? `SELECT COUNT(*) FROM posts WHERE cat=?` : `SELECT COUNT(*) FROM posts`;

  db.query(countsql, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    const property = 'COUNT(*)'
    const countPosts = data[0][property];
    pages = Math.ceil(countPosts/rowperpage);

    return res.status(200).json({count: countPosts, pages: pages});
  });
};

export const getPosts = (req, res) => {

  let start = 0;
  let page = null;

  if (req.query.countresult !== null && req.query.countresult !== undefined) {
    countresult = req.query.countresult;
    pages = Math.ceil(countresult/rowperpage);
  }
  
  if (req.query.currentpage === undefined) {
    start = 0;
  }
  else {
    start = req.query.currentpage--
  }
  page = start * rowperpage;

  const q = req.query.cat ? `SELECT * FROM posts WHERE cat=? ORDER BY id DESC LIMIT ${page}, ${rowperpage}` : `SELECT * FROM posts ORDER BY id DESC LIMIT ${page}, ${rowperpage}`;

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json({data, rowperpage, countcurrentpage: start, pages: pages});
  });
};

export const getMenuPosts = (req, res) => {

  console.log(req.query)

  return res.status(200).json('test ok');
};

export const nextPage = (req, res) => {
  let rowperpage = 2;
  let page = null;
  let start = null;
  let starnewpage = null;
  if (req.query.currentpage === undefined) {
    start = 0;
  } else {
    start = req.query.currentpage++
    starnewpage = start++
    starnewpage++
  }
  page = start * rowperpage;
  
  const q = req.query.cat ? `SELECT * FROM posts WHERE cat=? ORDER BY id DESC LIMIT ${page}, ${rowperpage}` : `SELECT * FROM posts ORDER BY id DESC LIMIT ${page}, ${rowperpage}`;

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json({data, starnewpage});
  });
};

export const prevPage = (req, res) => {
  let rowperpage = 2;
  let page = null;
  let start = null;
  let starnewpage = null;
  if (req.query.currentpage === undefined) {
    start = 0;
  } else {
    start = req.query.currentpage--
    starnewpage = start
    starnewpage
  }
  page = start * rowperpage;
  
  const q = req.query.cat ? `SELECT * FROM posts WHERE cat=? ORDER BY id DESC LIMIT ${page}, ${rowperpage}` : `SELECT * FROM posts ORDER BY id DESC LIMIT ${page}, ${rowperpage}`;

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json({data, starnewpage});
  });
};

export const getPost = (req, res) => {
  const q = "SELECT p.id, `username`, `title`, `desc`, p.xl, p.sm, p.md, u.img AS userImg,`cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err)

    return res.status(200).json(data[0])
  })
};

export const addPost = (req, res) => {
  const token = req.cookies.refresh_token
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, process.env.SECRET_KEY_REFRESH, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const newNameImg = req.body.img;

    // for dev
    const lgName =`/src/images/lg/${newNameImg}`
    const smName =`/src/images/sm/${newNameImg}`
    const mdName =`/src/images/md/${newNameImg}`

    // for build
    // const lgName =`/images/lg/${newNameImg}`
    // const smName =`/images/sm/${newNameImg}`

    const q = "INSERT INTO posts(`title`, `desc`, `xl`, `sm`, `md`, `cat`, `date`, `uid`) VALUES (?)"

    const values = [
      req.body.title,
      req.body.desc,
      lgName,
      smName,
      mdName,
      req.body.cat,
      req.body.date,
      userInfo.id
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created!");
    })
  });
};

// for dev
// ../client/${xlNoQuote}
// ../client/${smNoQuote}
// ../client/src/${xlNoQuote}

// for build
// ../client/${xlNoQuote}
// ../client/dist/${xlNoQuote}

const deleteFiles = async(xlNoQuote, smNoQuote, mdNoQuote) => {

  let lgName = ''
  let smName = ''
  let mdName = ''

  // for build [3]

  if (xlNoQuote.split('/')[4] === undefined) {
    lgName = xlNoQuote
    smName = smNoQuote
    mdName = mdNoQuote
  } else {
    xlNoQuote = xlNoQuote.split('/')[4];
    smNoQuote = smNoQuote.split('/')[4];
    mdNoQuote = mdNoQuote.split('/')[4];
    xlNoQuote =`/images/lg/${xlNoQuote}`
    smNoQuote =`/images/sm/${smNoQuote}`
    mdNoQuote =`/images/md/${mdNoQuote}`
  }
  // /src/images/lg/17135274228412150960824.jpg
  // /src/images/sm/17135274228412150960824.jpg
  //../client/dist/${xlNoQuote}
  
  fs.unlink(`../client/src/${xlNoQuote}`, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('image xl deleted');

      fs.unlink(`../client/src/${smNoQuote}`, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('image sm deleted');
        }
      })
      fs.unlink(`../client/src/${mdNoQuote}`, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('image md deleted');
        }
      })
    }
  })
}

export const deletePost = (req, res) => {
  const token = req.cookies.refresh_token
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, process.env.SECRET_KEY_REFRESH, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;

    const qSearch = "SELECT `xl`, `sm`, `md` FROM posts WHERE id=?"

    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(qSearch, [postId], (err, data) => {
      if (err) return res.status(500).json(err)
      
      const xl = JSON.stringify(data[0].xl);
      const sm = JSON.stringify(data[0].sm);
      const md = JSON.stringify(data[0].md);

      // for build вывод
      // images/lg/name_img.jpg
      // const xl = JSON.stringify(data[0].xl).split('/')[4];
      // const sm = JSON.stringify(data[0].sm).split('/')[4];

      // for dev
      const xlNoQuote = xl.replace(/"/g, '');
      const smNoQuote = sm.replace(/"/g, '');
      const mdNoQuote = md.replace(/"/g, '');

      // for dev
      // ../client/dist/${xlNoQuote}

      // for build
      // ../client/public/${xlNoQuote}
      // ../client/public/${smNoQuote}

      deleteFiles(xlNoQuote, smNoQuote, mdNoQuote)

    })
    
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");
      return res.json("Post has been deleted!");
    })
  })
};

export const updatePost = (req, res) => {
  const token = req.cookies.refresh_token
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, process.env.SECRET_KEY_REFRESH, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");


    let lgName = ''
    let smName = ''
    let mdName = ''

    const newNameImg = req.body.img;

    // for build 
    // newNameImg.split('/')[3]

    // for dev
    // newNameImg.split('/')[4]

    // for dev
    // /src/images/lg/${newNameImg}
    // /src/images/lg/${nameImgSplit}

    // for build
    // /images/lg/${newNameImg}
    // /images/lg/${nameImgSplit}

    // for build replace split count on [3]
    // lgName =`/images/lg/${newNameImg}`
    // smName =`/images/sm/${newNameImg}`
    // mdName =`/images/md/${newNameImg}`

    if (newNameImg.split('/')[4] === undefined) {
      lgName =`/src/images/lg/${newNameImg}`
      smName =`/src/images/sm/${newNameImg}`
      mdName =`/src/images/md/${newNameImg}`
    } else {
      const nameImgSplit = newNameImg.split('/')[4];
      lgName =`/src/images/lg/${nameImgSplit}`
      smName =`/src/images/sm/${nameImgSplit}`
      mdName =`/src/images/md/${nameImgSplit}`
    }

    const postId = req.params.id;
    const q = "UPDATE posts SET `title`=?, `desc`=?, `xl`=?, `sm`=?, `md`=?, `cat`=? WHERE `id`=? AND `uid`=?"

    const values = [
      req.body.title,
      req.body.desc,
      lgName,
      smName,
      mdName,
      req.body.cat
    ]

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    })
  });
};
