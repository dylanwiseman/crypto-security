const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        let matched = bcrypt.compareSync(password, users[i].password)
        if (users[i].username === username && matched) {
          let userToReturn = {...users[i]}
          delete userToReturn.password
          res.status(200).send(userToReturn)
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        let { username,email,firstName,lastName,password } = req.body
        const salt = bcrypt.genSaltSync(5)
        let passwordHash = bcrypt.hashSync(password,salt)
        let userObj = {username,email,firstName,lastName,password: passwordHash}
        users.push(userObj)
        let userToReturn = {...userObj}
        delete userToReturn.password
        res.status(200).send(userToReturn)
    }
}