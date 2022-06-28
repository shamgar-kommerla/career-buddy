const Company = require('../models/company');
const formiddable = require('formidable');

const _ = require('lodash');

exports.createNewCompany = (req, res) => {
    const company = new Company(req.body);
    company.save((err, company) => {
        if(err){
            return res.status(400).json({
                error:"Company not created",
                message: err
            })
        }else{
            res.json(company);
        }
    })
}

exports.getAllCompanies = (ereq, res) => {
    Company.find((err, companies) => {
        if(err){
            return res.status(400).json({
                error:"Couldn't fetch companies"
            })
        }
        res.json(companies);
    })
}
