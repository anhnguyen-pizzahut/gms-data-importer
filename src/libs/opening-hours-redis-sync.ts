import axios from 'axios';
import * as logger from './logger';

async function send_request(clientId) {
  return await axios({
    method: 'post',
    baseURL: 'http://api.int-phdva.io',
    url: '/v1/product-hut-fe/cron/set_opening_hours_v2',
    timeout: 300000,
    headers: {
      client: clientId,
      lang: 'en',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(function(response) {
      logger.info('Success');
      logger.info(response.data);
      logger.info(response.status);
      logger.info(response.statusText);
      logger.info(response.headers);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response.data)
      };
    })
    .catch(function(error) {
      logger.error(`Error ${error}`);
      logger.info(error.data);
      logger.info(error.status);
      logger.info(error.statusText);
      logger.info(error.headers);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error.data)
      };
    });
}

// FIXME: uncomment this code if prod needs syncing
// async function send_request_prod(axios, clientId) {
//   return await axios({
//       method: 'post',
//       baseURL: 'http://hut-fe-v1.apse1-phdva.io:8080',
//       url: '/v1/product-hut-fe/cron/set_opening_hours_v2',
//       timeout: 300000,
//       headers: {
//           'client': clientId,
//           'lang': 'en',
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//       }
//   })
//   .then(function (response) {
//       logger.info('Success');
//       logger.info(response.data);
//       logger.info(response.status);
//       logger.info(response.statusText);
//       logger.info(response.headers);
//       return {
//           statusCode: 200,
//           headers: { "Content-Type" : "application/json" },
//           body: JSON.stringify(response.data)
//       };
//   }).catch(function (error) {
//       logger.error(`Error ${error}`);
//       logger.info(error.data);
//       logger.info(error.status);
//       logger.info(error.statusText);
//       logger.info(error.headers);
//       return {
//           statusCode: 200,
//           headers: { "Content-Type" : "application/json" },
//           body: JSON.stringify(error.data)
//       };
//   });
// }

export const synchronizeRedis = async (isForcedUpdate) => {
  var clientID = {
    9: '1',
    12: '2',
    8: ['3', '5', '8'],
    7: ['4', '6'],
    3: '122',
    '-3': '126'
  };

  var date = new Date();
  var currentHour = date.getHours();

  for (var timezone in clientID) {
    if (currentHour + parseInt(timezone) === 24 || isForcedUpdate) {
      logger.info(`Timezone: ${timezone}`);
      if (typeof clientID[timezone] == 'object') {
        for (var id in clientID[timezone]) {
          await send_request(clientID[timezone][id]);
        }
      } else {
        await send_request(clientID[timezone]);
      }
    } else {
      logger.info(`Skipping clients ${clientID[timezone]} until ${Math.abs(24 - (currentHour + parseInt(timezone)))} hour(s) later.`);
    }
  }
};
