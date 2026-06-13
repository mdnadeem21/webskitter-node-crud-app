const Employee = require('../../models/employeeModels')


class EmployeeController{
    async createEmployee(req,res){
        try {
            const {
                name,
                username,
                email,
                address,
                phone,
                website,
                company
            } = req.body
            const employee = new Employee({
                name,
                username,
                email,
                address,
                phone,
                website,
                company
            })
            const data = await employee.save()

            return res.status(201).json({
                status:true,
                message:"Employee created successfully",
                data:data
            })
        } catch (error) {
            return res.status(500).json({
                status:false,
                message:"something went wrong in employee creation",
                error:error.message
            })
        }
    }
}

module.exports = new EmployeeController