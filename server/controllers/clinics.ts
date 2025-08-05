import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getClinicInfoByID = async (req: Request, res: Response) => {
  const { clinicId } = req.params;
  try {
    const clinicInfo = await prisma.clinics.findUnique({
      where: { id: clinicId },
    });

    if (clinicInfo == null) {
      res.status(400).json({ message: "Clinic doesn't exist" });
    }
    return res.status(200).json({ clinicInfo });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
