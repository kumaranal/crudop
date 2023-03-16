const employeeModel = require("../models/employeeModel")
const departmentModel = require("../models/departmentModel")
var validator = require("email-validator");

module.exports.getfn = async (req, res) => {
    const data = await employeeModel.aggregate([

        {
            $lookup: {
                from: "Department",
                localField: "_id",
                foreignField: "_id",
                as: "Department",
            },
        },
        {
            $project: {
                "FirstName": 1,
                "LastName": 1,
                "Email": 1,
                "Department.Department": 1
            }
        }
    ])

    console.log("get result Successfully");
    res.send(data)
}

module.exports.savefn = async (req, res) => {
    console.log("req", req.body);
    const value = validator.validate(req.body.Email);
    if (!value) {
        return res.status(400).json({ msg: "EMAIL is INVALID" });
    }
    const userDATA = {};
    for (const [key, value] of Object.entries(req.body)) {
        if(value == null || value ==""){
            return res.status(400).json({ msg: `${key} value is INVALID` });
        }
        userDATA[key] = value.toUpperCase();

    }
    // console.log("userDATA", userDATA);

    if (userDATA.Department) {
        employeeModel.create(userDATA)
            .then((data) => {
                console.log("Added Successfully");
                console.log(data);
                {
                    const departmentData = new departmentModel({
                        _id: data._id,
                        Department: userDATA.Department,
                    })
                    departmentData.save()
                        .then((data) => {
                            console.log("Added Successfully in Depertment");
                            console.log(data);
                        })
                        .catch((err) => {
                            console.log(err)
                            return res.status(400).json({ msg: "Request Data INVALID" })
                        })
                }
                return res.status(200).json({ msg: "value registered" })
            })
            .catch((err) => {
                console.log(err)
                return res.status(400).json({ msg: "Request Data INVALID" })
            })
    }
    else {
        return res.status(400).json({ msg: "Department param is missing" });

    }


}

module.exports.updatefn = async (req, res) => {
    console.log("req", req.body);
    if(req.body._id=="" || req.body._id==null ||(!req.body._id)){
        return res.status(400).json({ msg: "_id is INVALID" });
    }
    if((req.body._id)){

    if(req.body.Email){
        const value = validator.validate(req.body.Email);
        if (!value) {
            return res.status(400).json({ msg: "EMAIL is INVALID" });
        }
    }
    
    const userDATA = {};
    for (const [key, value] of Object.entries(req.body)) {
        if(value == null || value ==""){
            return res.status(400).json({ msg: `${key} value is INVALID` });
        }
        userDATA[key] = value.toUpperCase();
    }

    employeeModel
        .findByIdAndUpdate(req.body._id, { $set: userDATA }, { new: true })
        .then(() => {
            departmentModel
                .findByIdAndUpdate(req.body._id, { $set: userDATA}, { new: true })
                .then(() => {
                    res.send("update Successfully...")

                })
                .catch((err) => console.log(err))

        })
        .catch((err) => {console.log(err)
            res.status(400).json({ msg: "_id is INVALID" });
        })
    }
}

module.exports.deletefn = async (req, res) => {
    // console.log("req", req.body._id);
    if(req.body._id=="" || (req.body._id==null) ||(!req.body._id)){
        return res.status(400).json({ msg: "_id is INVALID" });
    }
    if(req.body._id)
    {
    employeeModel
        .findByIdAndDelete(req.body._id)
        .then(() => {
            {
                departmentModel
                    .findByIdAndDelete(req.body._id)
                    .then(() => {
                        res.send("delete Successfully...")

                    })
                    .catch((err) => console.log(err))
            }
        })
        .catch((err) => {console.log(err)
            res.status(400).json({ msg: "_id is INVALID" });
        })
    }
}
