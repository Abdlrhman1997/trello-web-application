import joi from "joi";

export const signup = joi
  .object({
    firstName: joi.string().min(3).max(25).required(),
    lastName: joi.string().min(3).max(25).required(),
    userName: joi.string().min(3).max(25).required(),
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 2,
        tlds: { allow: ["com", "edu"] },
      })
      .required(),
    password: joi
      .string()
      .pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      )
      .required(),
  })
  .required();
