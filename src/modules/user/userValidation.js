import joi from "joi";

export const changePassword = {
  body: joi
    .object({
      oldPassword: joi.string().required(),
      newPassword: joi
        .string()
        .pattern(
          new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        )
        .required(),
      cPassword: joi.string().valid(joi.ref("newPassword")).required(),
    })
    .required(),
};
export const updateUser = {
  body: joi
    .object({
      userName: joi.string().min(3).max(25).required(),
      age: joi.number().integer().min(5).max(120).required(),
      phone: joi
        .string()
        .pattern(new RegExp(/^01[0125][0-9]{8}$/))
        .required(),
    })
    .required(),
};
