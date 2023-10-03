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