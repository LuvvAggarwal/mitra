const ph_number = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const gender = /MALE|FEMALE|OTHER/;
const type = /USER|NGO|COUNSALER/;
const visibility = /PUBLIC|PRIVATE|FRIENDS/;
const dl_model = /help_type|post_category|problem_category|countries/;
const theme = /LIGHT|DARK/;
const notification = /IMPORTANT|STANDARD|NO_NOTIFICATION/;
const take_notification = /notification|notification_full/;
const postType = /TEXT|MULTIMEDIA|DOCUMENT/;
const Joi = require("joi")
module.exports = {
    boolean: Joi.boolean(),
    boolean_req: Joi.boolean().required(),
    true_req: Joi.boolean().invalid(false),
    array_id: Joi.array().items(Joi.string().min(36).max(36).required()).max(20),
    id: Joi.string().min(36).max(36).required(),
    id_opt: Joi.string().min(36).max(36).allow(null),
    str_50: Joi.string().max(50).allow(""),
    str_50_req: Joi.string().max(50).required(),
    str_100: Joi.string().max(100).allow(""),
    str_100_req: Joi.string().max(100).required(),
    str_150: Joi.string().max(150).allow(""),
    str_150_req: Joi.string().max(150).required(),
    str_200: Joi.string().max(200).allow(""),
    str_200_req: Joi.string().max(200).required(),
    str_250: Joi.string().max(250).allow(""),
    str_250_req: Joi.string().max(250).required(),
    // address: Joi.string().max(200),
    // city: Joi.string().min(30).max(30),
    ph_number: Joi.string().regex(ph_number),
    // profile_photo: Joi.string(),
    img_url: Joi.string().allow(""),
    text: Joi.string().allow(""),
    text_req: Joi.string().required(),
    // occupation: Joi.string(),
    post_type: Joi.string().regex(postType).required(),
    // problem_category: Joi.string().min(30).max(30).required(),
    take_notification: Joi.string().regex(take_notification),
    gender: Joi.string().regex(gender),
    visibility: Joi.string().regex(visibility),
    dl_model: Joi.string().regex(dl_model).required(),
    theme: Joi.string().regex(theme),
    notification: Joi.string().regex(notification),
    integer: Joi.number().integer().required(),
    number: Joi.number().required(),
    // help_type: Joi.string().min(30).max(30).required(),
    // registration_code: Joi.string().max(100).required(),
    email: Joi.string().email({ tlds: {allow: false} }).max(150).required(),
    type: Joi.string().regex(type),
    password: Joi.string().required().min(8).max(15),
}