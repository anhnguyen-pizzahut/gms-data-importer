import axios from 'axios';

import OutletGps from '../../models/source/outlet-gps';

import { GOOGLE_API_PLACES_FIND_FROM_TEXT_API } from '../../configs';

export const getLatLongFromAddress = async (address: string) => {
  try {
    const response = await axios.get(
      GOOGLE_API_PLACES_FIND_FROM_TEXT_API.replace('{0}', encodeURI(address))
    );
    if (response.data && response.data.candidates[0]) {
      const { status } = response.data;
      if (status === 'OK') {
        const { lat, lng } = response.data.candidates[0].geometry.location;
        return new OutletGps(lat, lng);
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
