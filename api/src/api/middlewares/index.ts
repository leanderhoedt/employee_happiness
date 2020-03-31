import attachCurrentUser from './attachCurrentUser';
import isAuth from './isAuth';
import validateSignUpRequest from './validateSignUpRequest';
import validateLoginRequest from './validateLoginRequest';
import validateSameEmailDoesntExist from './validateSameEmailDoesntExist';

export default {
    attachCurrentUser,
    isAuth,
    validateSignUpRequest,
    validateLoginRequest,
    validateSameEmailDoesntExist
};