import * as z from "zod";
import { Request, Response, NextFunction } from "express";
import { ErrorFields, ValidationError } from "../utils/error";

export default function validate(schema: z.ZodSchema, fallbackMessage: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new ValidationError(fallbackMessage, formatZodError(result.error)));
    }

    req.body = result.data;
    next();
  };
}

function formatZodError(error: z.ZodError): ErrorFields {
  const { fieldErrors } = z.flattenError(error);

  // Map fieldErrors into => [fieldName, errorMessage]
  const errors = Object.entries<string[]>(fieldErrors).map(([field, messages]) => [field, messages[0]]);

  // Change mapped fieldErrors into an object => { fieldName: errorMessage }
  return Object.fromEntries(errors);
}
