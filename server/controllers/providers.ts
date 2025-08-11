import { Request, Response } from 'express';
import prisma from '../prisma/client';
import {
  checkLocationExists,
  findProviderById,
} from '../services/providerService';
import { ObjectId } from 'mongodb';

/**
 * Gets the information for a provider from the database using the id
 * Expects the 'providerId' in the parameters
 * 
 * @param req Express request object containing 
 *  - 'params.providerId': the id we're searching to find its matching provider
 * @param res Express response object returning either a Provider object or an error
 * @returns 
 *   - 200: { providerInfo }: Object containing the Provider details
 *   - 400: { message: string} if the provider doesn't exist
 *   - 500: { message: string } if server error occurs
 */
export const getProviderById = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    const providerInfo = await prisma.providers.findUnique({
      where: { id: providerId },
    });
    if (providerInfo == null) {
      return res.status(400).json({ message: "Provider doesn't exist" });
    }
    return res.status(200).json({ providerInfo });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to get provider details' });
  }
};

/**
 * Gets a list of all providers in the database
 * 
 * @param req Express request object
 * @param res Express response object returning JSON responses
 * @returns 
 *   - 200: A json listing all providers in teh system
 *   - 400: {message: string}, when there are no providers in the database
 *   - 500: { message }on server error
 */
export const getAllProviders = async (req: Request, res: Response) => {
  try {
    const providers = await prisma.providers.findMany();
    if (providers == null) {
      return res.status(400).json({ message: 'No Providers' });
    }
    return res.status(200).json({ providers });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to get providers' });
  }
};

/**
 * Adds a new provider into the database
 * 
 * @param req An Express request object, expects the body to contain:
 *   - `firstName` (string): provider's first name
 *   - `lastName` (string): provider's last name
 *   - `credentials` Array[(string)]: any credentials the provider has, i.e. MD, DO, PHD
 *   - `specialty` Array[(string)s]: What field the provider specializes in, i.e. ophthalmology
 *   - `locations` Array [[Object]] -- [{id (string): id corresponding to the _id of a Clinic.clinic, `city` (string): city of the clnic}]
 *   - `phone` (string): contact number for the provider
 *   - `fax`  (string): fax number for the provider
 * @param res Express response object, returning either an error or an Array of provider objects
 * @returns 
 */
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
    res.status(200).json({ message: 'Provider succesfully created' });
  } catch (error) {
    console.error('error creating provider: ', error);
    return res
      .status(500)
      .json({ error: 'Server error while creating provider' });
  }
};

/**
 * Retrieves a provider's information from the database by their ID.
 *
 * Expects the `providerId` parameter in the route URL.
 * Returns the provider data if found, or an error message if not found or on server error.
 *
 * @param req - Express request object containing:
 *   - `params.providerId` (string): The ID of the provider to retrieve.
 *
 * @param res - Express response object used to send JSON responses.
 *
 * @returns Sends HTTP JSON response with:
 *   - 200: `{ providerInfo: object }` containing the provider details.
 *   - 400: `{ message: string }` if the provider does not exist.
 *   - 500: `{ message: string }` on server error.
 */
export const getProviderLocations = async (req: Request, res: Response) => {
  try {
    const providerId = req.params.id;
    const provider = await findProviderById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider Not Found' });
    }

    const locations = await prisma.providers.findUnique({
      where: {
        id: providerId,
      },
      select: {
        locations: true,
      },
    });
    return res.status(200).json({ locations });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

/**
 * Adds a new location to a provider
 * 
 * @param req Express request object, expects the body to contain:
 *   - 'providerId' (string): the id of the provider we're updating
 *   - 'location' ([Object]): the location object we're adding to  "locations[]"
 *        - `id` (string): the id of the clinic, matching the _id of the corresponding clinic in the Clinics collection
 *        - `city` (string): the city where the clinic is
 * @param res Express request object with a JSON response
 * @returns An HTTP status and JSON
 *    - 200: { message } if the location is already listed under the provider's locations[]
 *    - 200: { message, updated Provider Object } if the location was added succesfully
 *    - 404: { message } if the requested provider isn't found
 *    - 500: { message, error } for server error
 */
export const addProviderLocation = async (req: Request, res: Response) => {
  try {
    const { providerId, location } = req.body;
    const provider = await findProviderById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider Not Found' });
    }
    if (!checkLocationExists(provider, location)) {
      return res.status(200).json({ message: 'Location already exists' });
    }
    const updatedProvider = await prisma.providers.update({
      where: {
        id: providerId,
      },
      data: {
        locations: {
          push: location,
        },
      },
    });

    return res.status(200).json({
      message: 'Location added succesfully',
      provider: updatedProvider,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

/**
 * Retrieves multiple providers associated with a given clinic ID.
 *
 * Expects the request body to contain the `clinicId`.
 * Returns an array of providers linked to that clinic.
 *
 * @param {import('express').Request} req - Express request object containing:
 *   - `body.clinicId` (string): The ID of the clinic to find providers for.
 *
 * @param {import('express').Response} res - Express response object used to send JSON responses.
 *
 * @returns {void} Sends HTTP JSON response with:
 *   - 200: `{ providers: object[] }` array of provider objects associated with the clinic.
 *   - 500: `{ message: string, error: string }` on server error.
 */
export const getMultipleProvidersByIDs = async (
  req: Request,
  res: Response
) => {
  const { clinicId } = req.body;
  try {
    console.log('clinicId:', clinicId, typeof clinicId);
    const providers = await prisma.providers.findMany({
      where: {
        locations: {
          some: {
            id: clinicId,
          },
        },
      },
    });
    return res.status(200).json({ providers });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// export const deleteProviderLocation = async (req: Request, res: Response) => {
//   try {
//     const { providerId, location } = req.body;
//     const provider = await findProviderById(providerId);
//     if (!provider) {
//       return res.status(404).json({ message: 'Provider Not Found'})
//     }

//     const updatedProvider = await prisma.providers.update({
//       where: {
//         id: providerId,
//       },
//       data: {
//         locations: {

//         }
//       }
//     })
//   }
