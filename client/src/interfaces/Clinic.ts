/**
 * Represents a healthcare clinic and its contact information.
 *
 * Properties:
 * - id: Unique identifier for the clinic (correlates to the MongoDB _id)
 * - name: Clinic name
 * - streetAddress: Street address of the clinic
 * - city: City where the clinic is located
 * - zip: ZIP code of the clinic
 * - phone: Clinic phone number
 * - fax: Clinic fax number
 */

export interface Clinic {
  id: String;
  name: string;
  streetAddress: string;
  city: string;
  zip: string;
  phone: string;
  fax: string;
}
