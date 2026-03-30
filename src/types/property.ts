export interface Property {
  id: string;
  type: string;
  price: number;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  contractType: "sale" | "rent";
  featured?: boolean;
  year_built?: number;
  garage?: number;
  pool?: boolean;
  garden?: boolean;
  elevator?: boolean;
  features?: string[];
  description_en?: string;
  description_es?: string;
}
