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
