import { body } from "express-validator";

export const loginValidation = [
  body("email", "Wrong mail format").isEmail(),
  body("password", "Password must contain at least 5 symbols").isLength({min: 5}),
];

export const registerValidation = [
  body("email", "Wrong mail format").isEmail(),
  body("password", "Password must contain at least 5 symbols").isLength({min: 5}),
  body("fullName", "Enter your name").isLength({min: 3}),
  body("avatarUrl", "Wrong avatar URL").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Enter the Article Title").isLength({min: 3}).isString(),
  body("text", "Enter the Article Text").isLength({min: 3}).isString(),
  body("tags", "Wrong tag format (need Array)").optional().isString(),
  body("imageUrl", "Wrong image URL").optional().isString(),
];