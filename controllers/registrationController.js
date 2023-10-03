const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = (data);
    }
}

const path = require('path');
const bcrypr = require('bcrypt');
const fsPromises = require('fs').promises;

const handleNewUser = async(req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'username & password are required'})

    //check fof duplicate entry
    const duplicate = usersDB.users.find((person) => person.username === user);
    if(duplicate){
        return res.status(409).json({"error": "name already exists"})
    }
    try{
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = {username: user, password: hashedPwd}
        setUsers([...usersDB.users, newUser])
        //write the data to file
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users))
        console.log(usersDB.users)
        res.status(201).json({"result": newUser});
    }catch(err){
        return res.status(500).json({"error": err.message})
    }
}

module.exports = handleNewUser