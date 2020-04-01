import attachCurrentUser from './attachCurrentUser';
import isAuth from './isAuth';
import validateSignUpRequest from './validateSignUpRequest';
import validateLoginRequest from './validateLoginRequest';
import validateSameEmailDoesntExist from './validateSameEmailDoesntExist';
import isManager from './isManager';

export default {
    isAuth,
    isManager,
    attachCurrentUser,
    validateSignUpRequest,
    validateLoginRequest,
    validateSameEmailDoesntExist
};