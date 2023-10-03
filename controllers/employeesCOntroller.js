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

const deleteEmployee  = (req, res) => {
    const userToDelete = data.employees.find((user) => user.id === req.body.id);
    data.employees = data.employees.filter((user) => user.id !== req.body.id)
    res.json(userToDelete)
}

const getEmployee = (req, res) => {
    const user = data.employees.find((user) => user.id === +req.params.id);
    if(user) {
        res.json(user)
    }else {
        res.json({"error": "user not found"})
    }
   
}