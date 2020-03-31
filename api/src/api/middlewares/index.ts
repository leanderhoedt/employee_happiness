import attachCurrentUser from './attachCurrentUser';
import isAuth from './isAuth';
import validateSignUpRequest from './validateSignUpRequest';
import validateLoginRequest from './validateLoginRequest';

export default {
    attachCurrentUser,
    isAuth,
    validateSignUpRequest,
    validateLoginRequest,
    validateSameEmailDoesntExist: ()=>{}, // @TODO: implement
};