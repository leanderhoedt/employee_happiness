import {celebrate, Joi} from "celebrate";

const validateLoginRequest = celebrate({
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
});

export default validateLoginRequest;