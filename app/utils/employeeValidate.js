const joi = require('joi');


const employeeValidation=joi.object({
    name:joi.string()
    .required()
    .min(3),
    username:joi.string(),
    email:joi.string()
    .required()
    .email(),
    address:joi.string(),
    phone:joi.number()
    .required()
    .min(10)
    .message({
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number is required',
        'string.min': 'Phone number must be at least 10 characters long',
    }),
    website:joi.string(),
    company:joi.string(),

  

   
})



module.exports= employeeValidation