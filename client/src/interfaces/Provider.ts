/**
 * Represents a healthcare provider and their profile information.
 *
 * Properties:
 * - id: Unique identifier for the provider (ObjectId for MongoDB)
 * - firstName: Provider's first name
 * - lastName: Provider's last name
 * - locations: Array of clinic locations where the provider works {
 * -    - id: the id of the clinic; correlates to its MongoDB document
 * -    - city: city of the clinic (to differentiate between Offices that may have multiple  locations))
 * - phone: Provider's phone number
 * - fax: Provider's fax number
 * - credentials: Array of provider's credentials (e.g., MD, PA)
 * - specialty: Provider's medical specialty
 * - imageUrl: URL to the provider's profile image
 */
export interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  locations: {
    id: string;
    city: string;
  }[];
  phone: string;
  fax: string;
  credentials: string[];
  specialty: string;
  imageUrl: string;
}
