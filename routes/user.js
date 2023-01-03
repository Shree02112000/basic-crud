const {userConstroller} =  require('../controller');
const Joi = require("joi");

const user =[
    {
        method: 'POST',
        path: '/register',
        options:{
            validate:{
                payload:Joi.object({
                    username:Joi.string().required(),
                    password:Joi.string().required(),
                    role:Joi.string().optional()
                }),
                
                failAction: (req, res, source, error) => {                                                
                    console.log("Error: ", source.details[0].message);
                    return res.response({error:source.details[0].message}).code(500).takeover();                      
                }
            }
        },
        handler: userConstroller.user
        
    },
    {
        method: 'POST',
        path: '/loginuser',
        options:{
            validate:{
                payload:Joi.object({
                    username:Joi.string().required(),
                    password:Joi.string().required()
                }),
                failAction: (req, res, source, error) => {                                                
                    console.log("Error: ", source.details[0].message);
                    return res.response({error:source.details[0].message}).code(500).takeover();                      
                }
            },
        },
        handler: userConstroller.login
    },
    {
        method: 'GET',
        path: '/readAllUser',
        options: { auth: 'jwt' },
        handler: userConstroller.readAllUser
    },
    {
        method: 'GET',
        path: '/readUser',
        handler: userConstroller.readUser
    },
    {
        method: 'PUT',
        path: '/updateUser',
        handler: userConstroller.updateUser
    }
]


module.exports = user 