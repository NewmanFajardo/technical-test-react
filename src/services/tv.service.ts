import { loadAbort } from '../utilities/load-abort-axios.utility';
import { axiosCustom } from '../interceptors/axiosCustom';
import { API_KEY } from '../constants/apiKey';
import { ITv, ITvDetails } from '../models/tv.model';

export const tvChanges = () => {
  const controller = loadAbort();
  return {
    call: axiosCustom.get<ITv>('tv/changes', { 
        signal: controller.signal,
        params: {
          api_key: API_KEY,
          page: 1
        }
    }),
    controller
  };
};

export const tvDetails = (tvId: number) => {
  const controller = loadAbort();
  return {
    call: axiosCustom.get<ITvDetails>(`tv/${tvId}`, { 
        signal: controller.signal,
        params: {
          api_key: API_KEY
        }
    }),
    controller
  };
};



export const tvSimilar = (tvId: number) => {
  const controller = loadAbort();
  return {
    call: axiosCustom.get<ITvDetails>(`tv/${tvId}/similar`, { 
        signal: controller.signal,
        params: {
          api_key: API_KEY
        }
    }),
    controller
  };
};

