export interface signUpPayload {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  description: string;
  address: {
    address: string;
    addressDetail: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };
}
