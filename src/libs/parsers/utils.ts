import axios from 'axios';

import { GOOGLE_API_PLACES_FIND_FROM_TEXT_API } from '../../configs';

export const getLatLongFromAddress = async (address: string) => {
  try {
    const response = await axios.get(
      GOOGLE_API_PLACES_FIND_FROM_TEXT_API.replace(
        '{0}',
        encodeURIComponent(address)
      )
    );
    return response.data ? response.data.candidates[0].geometry.location : null;
  } catch (error) {
    return null;
  }
};
