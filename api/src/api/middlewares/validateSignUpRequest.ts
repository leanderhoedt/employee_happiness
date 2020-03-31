import {celebrate, Joi} from "celebrate";

const validateSignUpRequest = celebrate({
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
});

export default validateSignUpRequest;