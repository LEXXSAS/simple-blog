class fileUpload {

  async addAvatarInDb (req, res) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not authenticated!');
  
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
  
      const newNameImg = req.body.img;
  
      const q = "UPDATE users SET `img`=? WHERE `id`=?"
  
      db.query(q, [newNameImg, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Avatar has been added db!");
      })
    });
  };

}

export default new fileUpload()
