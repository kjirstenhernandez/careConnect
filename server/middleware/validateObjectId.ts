import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

export async function validateObjectId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { providerId } = req.params;
  if (!ObjectId.isValid(providerId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  } else {
    next();
  }
}
