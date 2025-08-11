import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

/**
 * Middleware to validate that a route parameter ending with 'Id' is a valid MongoDB ObjectId.
 *
 * Searches the request parameters for a key ending with 'Id' (e.g., 'clinicId', 'providerId').
 * If the corresponding value is missing or invalid, responds with a 400 error.
 * Otherwise, passes control to the next middleware or route handler.
 *
 * @param {import('express').Request} req - Express request object containing route parameters.
 * @param {import('express').Response} res - Express response object used to send error responses.
 * @param {import('express').NextFunction} next - Express next middleware function.
 *
 * @returns {void} Calls `next()` if validation passes; otherwise sends 400 response.
 */
export async function validateObjectId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const idParam = Object.keys(req.params).find((key) => key.endsWith('Id'));
  const idValue = idParam ? req.params[idParam] : null;

  if (!idValue || !ObjectId.isValid(idValue)) {
    return res.status(400).json({ message: 'Invalid ID' });
  } else {
    next();
  }
}
