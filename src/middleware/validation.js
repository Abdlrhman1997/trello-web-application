export const validationResult = auhtValidation.signup.validate(req.body, {
  abortEarly: false,
});
return res.json(validationResult);
