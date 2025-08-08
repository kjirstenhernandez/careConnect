export interface Provider {
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
  imageURL: string;
}
