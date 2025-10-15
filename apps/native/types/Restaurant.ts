export interface Restaurant {
  id: number;
  name: string;
  cuisineType: string;
  priceRange: string;
  rating: number;
  deliveryFee: number;
  deliveryTime: number;
  imageUrl: string;
  phoneNumber: string;
  website: string;
  distance: number;
}

export interface AddressSuggestion {
  properties: {
    label: string;
    name: string;
    city: string;
    postcode: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}
