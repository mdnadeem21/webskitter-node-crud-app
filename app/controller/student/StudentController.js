const Student = require("../../models/studentModels");
const StatusCode = require('../../utils/statusCode')

class StudentController {
  async createStudent(req, res) {
    try {
      const { stdId,name, email, age, course, address } = req.body;

      
      const existingStudent = await Student.findOne({
        $or: [{ email }, { stdId }],
      });

      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: "A student with this email or stdId number already exists.",
        });
      }

      
      const newStudent = new Student({
        stdId,
        name,
        email,
        age,
        course,
        address,
      });

      const savedStudent = await newStudent.save();


      res.status(201).json({
        success: true,
        message: "Student registered successfully",
        data: savedStudent,
      });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in creation : Could not create student',
            error: error.message
          });
    }
  }

  async readStudent(req,res){
        try {
            const students = await Student.find();

            return res.status(StatusCode.SUCCESS)
                        .json({
                            status:true,
                            total:students.length,
                            message:"Students fetched successfully",
                            data:students
                        })
        } catch (error) {
            return res.status(StatusCode.BAD_REQUEST)
                        .json({
                            status:false,
                            message:"Something went wrong in getting students",
                            error:error.message
                        })
        }
  }

  async getsingleStudent(req,res){
    try {
        const id = req.params.id;
        const requiredStudent = await Student.findById(id);

        if(!requiredStudent){
            return res.status(StatusCode.BAD_REQUEST)
                        .json({
                            status:false,
                            message:"May be entered wrong student Id"
                        })
        }
        return res.status(StatusCode.SUCCESS)
                    .json({
                        status:true,
                        message:"Got Searched Student",
                        data:requiredStudent
                    });
    } catch (error) {
            return res.status(StatusCode.BAD_REQUEST)
                        .json({
                            status:false,
                            message:"Something went wrong in get single student",
                            error:error.message
                        })
    }
  }

  async updateStudent(req,res){
    try {
        const id = req.params.id;
        await Student.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(StatusCode.SUCCESS).json({
          status: true,
          message: "Student details updated successfully",
        });
      } catch (error) {
        return res.status(StatusCode.BAD_REQUEST).json({
          status: false,
          message: "something went wrong in update student",
          error: error.message,
        });
      }
  }
  async deleteStudent(req, res) {
    try {
      const id = req.params.id;
      await Student.findByIdAndDelete(id);
      return res.status(200).json({
        status: true,
        message: "Student deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "something went wrong in deletion",
        error: err,
      });
    }
  }
}

module.exports = new StudentController()
