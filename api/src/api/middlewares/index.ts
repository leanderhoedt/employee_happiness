import attachCurrentUser from './attachCurrentUser';
import isAuth from './isAuth';
import validateSignUpRequest from './validateSignUpRequest';

export default {
    attachCurrentUser,
    isAuth,
    validateSignUpRequest,
    validateSameEmailDoesntExist: ()=>{}, // @TODO: implement
};