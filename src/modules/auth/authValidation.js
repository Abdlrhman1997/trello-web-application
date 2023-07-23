import joi from "joi";

export const signup = {
  body: joi
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

      cPassword: joi.string().valid(joi.ref("password")).required(),
      gender: joi.string().required(),
    })
    .required(),

  params: joi
    .object({
      flag: joi.boolean().required(),
    })
    .required(),
};

export const login = {
  body: joi
    .object({
      email: joi
        .string()
        .email({
          minDomainSegments: 2,
          maxDomainSegments: 2,
          tlds: { allow: ["com", "edu"] },
        })
        .required(),
      password: joi.string().required(),
    })
    .required(),
};
