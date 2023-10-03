const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = (data);
    }
}

const path = require('path');
const bcrypt = require('bcrypt');
const fsPromises = require('fs').promises;

const handleLogin = async(req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'username & password are required'});

    //find user by username
    const foundUser = usersDB.users.find((person) => person.username === user);
    if(!foundUser) return res.sendStatus(401) //Unauthorized

    //evaluate password
    const match = bcrypt.compare(pwd, foundUser.password)
    if(match){
        res.status(200).json({"user": foundUser.username})
    }else{
        res.sendStatus(401)
    }


}

module.exports = {handleLogin}

