const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = (data);
    }
}

const path = require('path');
const bcrypt = require('bcrypt');
const fsPromises = require('fs').promises;
const jwt =  require('jsonwebtoken');
const { cursorTo } = require('readline');
require('dotenv').config();

const handleLogin = async(req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'username & password are required'});

    //find user by username
    const foundUser = usersDB.users.find((person) => person.username === user);
    if(!foundUser) return res.sendStatus(401) //Unauthorized

    //evaluate password
    const match = bcrypt.compare(pwd, foundUser.password)
    if(match){
        const accessToken =  jwt.sign(
            {"username": foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        )

        const refreshToken =  jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )

        //get the current user and add refresh token to it
        const otherusers = usersDB.users.filter((user) => user.username !== foundUser.username);
        const currentUser = {...foundUser, refreshToken} 
        usersDB.setUsers([...otherusers, currentUser])

        //write back the users to the json file
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )

        // the the token back as an httpOnly cookie because its not available to javascript
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
        res.status(200).json({accessToken})
    }else{
        res.sendStatus(401)
    }


}

module.exports = {handleLogin}

