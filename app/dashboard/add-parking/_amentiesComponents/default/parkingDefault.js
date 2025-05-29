export const parkingDefaults = {
  userId: "", // should be set dynamically when the user is authenticated
  spotNumber: "",
  location: "",
  city: "",
  state: "",
  locality: "",
  sublocality: "",
  areaNumber: "",
  type: "standard", // 'standard' | 'disabled' | 'electric' | 'compact' | 'premium'
  isAvailable: true,
  hourlyRate: 0,
  size: "medium", // 'small' | 'medium' | 'large'

  amenitiesDetails: {
    securityGuard: false,
    securityCameras: false,
    evCharging: false,
    valetService: false,
    coveredParking: false,
  },

  images: [],

  accessibility: {
    wheelchairAccessible: false,
    nearEntrance: false,
  },

  coordinates: {
    latitude: null,
    longitude: null,
  },
};
