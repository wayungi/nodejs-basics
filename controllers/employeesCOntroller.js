const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const user = {
        "id": req.body.id,
        'firstname': req.body.firstname,
        'lastname': req.body.lastname
    }
    data.employees.push(user);
    res.json(user)
}

const updateEmployee = (req, res) => {
    let index = data.employees.findIndex((item) => item.id === req.body.id);
    if(index !== -1){
        const updatedUser = {
            'id': req.body.id,
            'firstname': req.body.firstname,
            'lastname': req.body.lastname
        }
        data.employees[index] = updatedUser
        res.json(updatedUser);
    }else {
        res.json({"error": "user not found"})
    }
}