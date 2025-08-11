import { Request, Response } from 'express';
import prisma from '../prisma/client';

/**
 * Gets clinic info through ID lookup
 * @param req An express Request object, expects clinicId (_id in MongoDB)
 * @param res An express Response object, returns either clinic data or error messages
 * @returns JSON response with clinic info if available, otherwise returns 400 error if clinic doesn't exist, or 500 error if something went wrong
 */
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

/**
 * 
 * @param req Express Request object, expecting nothing
 * @param res Express response object, returning the information for all clinics in collection
 * @returns {{ clinicInfo: Clinic[]}} JSON response object where clinicInfo is an array of Clinic objects
 * @throws {error} 400 if there are no clinics returned, 500 if something goes wrong
 */
export const getAllClinics = async (req: Request, res: Response) => {
  try {
    const clinicInfo = await prisma.clinics.findMany();

    if (clinicInfo == null) {
      res.status(400).json({ message: 'No Clinics' });
    }
    return res.status(200).json({ message: 'success', clinicInfo });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

/**
 * Adds a new clinic to the database.
 *
 * Expects the request body to contain clinic details such as name, street address,
 * city, zip code, phone, and fax. If a clinic with the same name already exists (case-insensitive),
 * returns a 400 error. On success, returns the newly created clinic information.
 *
 * @param {import('express').Request} req - Express request object. Expects a JSON body with:
 *   - `name` (string): Clinic name
 *   - `streetAddress` (string): Clinic street address
 *   - `city` (string): City name
 *   - `zip` (string): Postal code
 *   - `phone` (string): Phone number
 *   - `fax` (string, optional): Fax number
 *
 * @param {import('express').Response} res - Express response object used to send back JSON responses.
 *
 * @returns {void} Sends HTTP JSON response with:
 *   - 200: `{ message: string, newClinic: object }` on success
 *   - 400: `{ message: string }` if clinic already exists
 *   - 500: `{ message: string, error: string }` on server error
 */

export const addClinic = async (req: Request, res: Response) => {
  try {
    const { name, streetAddress, city, zip, phone, fax } = req.body;

    // Check to see if clinic is already in system
    const existingClinic = await prisma.clinics.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    if (existingClinic) {
      return res
        .status(400)
        .json({ message: `A clinic named ${name} already exists.` });
    }

    const newClinic = await prisma.clinics.create({
      data: {
        name,
        streetAddress,
        city,
        zip,
        phone,
        fax,
      },
    });
    res.status(200).json({ message: 'New clinic Added: ', newClinic });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to create clinic',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

/**
 * Checks an array of IDs against the database and returns an array of clinics that match, if any
 * Expects a a body object 
 * @param req Expects the body to contain an array of id strings
 * @param res 
 * @returns 200 HTTP response and a JSON of the Clinics that match the IDs 
 * @throws 
 *  - 200: { clinics[] }
 *  - 500: { message: string, error: Error || string}
 *  - 400: { message:]: string }
 */

export const getMultipleClinicsByIDs = async (req: Request, res: Response) => {
  const { clinicIds } = req.body; // expects an array of IDs
  if (!Array.isArray(clinicIds) || clinicIds.length === 0) {
    return res
      .status(400)
      .json({ message: 'clinicIds must be a non-empty array.' });
  }
  try {
    const clinics = await prisma.clinics.findMany({
      where: { id: { in: clinicIds } },
    });
    return res.status(200).json({ clinics });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
