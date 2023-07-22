export const validation = (schema) => {
  return (req, res, next) => {
    const validationResultBody = schema.body.validate(req.body, {
      abortEarly: false,
    });
    const validationResultParams = schema.params.validate(req.params, {
      abortEarly: false,
    });

    if (validationResultBody.error) {
      return res.json(validationResultBody);
    }
    if (validationResultParams.error) {
      return res.json(validationResultParams);
    }

    return next();
  };
};
