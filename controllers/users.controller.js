const{Users, Guest} = require("../models");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
    const { username, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
        username,
        role,
        password:hashPassword
    })
    

    return res.status(201).json({ data: newUser });
    } catch (error) {
       console.log(error);
    }
}

const signIn = async (req, res) => {
    try {
        const {username, password} = req.body
        const users = await Users.findOne({
            where: {
                username
              },
        })

            
    if (!users) {
        return res.status(404).json({ message: 'Invalid Credential' });
      }
      const isPasswordMatch = await bcrypt.compare(password, users.password);
      if (!isPasswordMatch) {
        return res.status(404).json({ message: 'Invalid Credential' });
      }
      const token = jwt.sign(
        { id: users.id, role:users.role,  },
        process.env.JWT_SECRETKEY
      );
      return res.status(201).json({
        accessToken: token,
        dataUser: {
          id: users.id,
          username: users.username,
        },
      });
    


    } catch (error) {
     console.log(error);
     }
}



const getAllByAdmin = async (req, res) => {
   try {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses.' });
      }
    const getAllByAdmin = await Guest.findAll()
    if(!getAllByAdmin) {
        return res.status(404).json({
            message: "Data Not Found"
        })
    }

    return res.status(200).json({
        data: getAllByAdmin,

    })
   } catch (error) {
    console.log(error);
   }
}

const getAllByUsers = async (req, res) => {
    try {
     if (req.userRole !== 'users') {
         return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses.' });
       }
     const getAllByUsers = await Guest.findAll({
        attributes: ['name', 'note']
    })
     if(!getAllByUsers) {
         return res.status(404).json({
             message: "Data Not Found"
         })
     }
 
     return res.status(200).json({
         data: getAllByUsers,
 
     })
    } catch (error) {
     console.log(error);
    }
 }

 const createByGuest = async (req, res) => {
    try {
        if (req.userRole !== 'users') {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses.' });
          }
        const {name, address, phoneNumber, note} = req.body
    
        const newGuest = await Guest.create({
           name,
           address,
           phoneNumber,
           note
        })
        
        return res.status(201).json({ data: newGuest });
    } catch (error) {
        console.log(error);
    }
}

const logout = async(req, res) => {
    try {
        res.status(200).send({ auth: false, token: null });
    } catch (error) {
        
    }
}

module.exports = {
    signIn,
    signUp,
    getAllByAdmin,
    getAllByUsers,
    createByGuest,
    logout
}