import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const addProvider = async (req: Request, res: Response) => {
  const { firstName, lastName, credentials, specialty, locations, phone, fax } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !credentials ||
    !specialty ||
    !locations ||
    !phone
  ) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const newProvider = await prisma.providers.create({
      data: {
        firstName,
        lastName,
        credentials,
        specialty,
        locations,
        phone,
        fax,
      },
    });
  } catch (error) {
    console.error('error creating provider: ', error);
    return res
      .status(500)
      .json({ error: 'Server error while creating provider' });
  }
};
