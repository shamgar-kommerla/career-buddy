const Department = require('../models/department');


exports.getAllDepartments = (req, res) => {
    Department.find((err, depts) => {
        if(err){
            return res.status(400).json({
                error:"Not Able to fetch departments"
            })
        }
        res.json(depts);
    })
}


exports.createDepartment = (req, res) => {
    const dept = new Department(req.body);
    dept.save((err, dept) => {
        if(err){
            return res.status(400).json({
                error:"Department not created",
                message: err
            })
        }
        res.json(dept);
    })
}