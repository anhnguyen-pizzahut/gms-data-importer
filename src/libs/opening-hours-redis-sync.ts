import axios from 'axios';
import * as logger from './logger';

async function send_request(clientId) {
  return await axios({
    method: 'post',
    baseURL: 'https://api.phdvasia.com',
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
      return;
    })
    .catch(function(error) {
      logger.error(`${error}`);
      return;
    });
}

export const synchronizeRedis = async isForcedUpdate => {
  var clientID = {
    '-3': '57950680-0208-4703-9e0b-c5a8cc45cf42'
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
      logger.info(
        `Skipping clients ${clientID[timezone]} until ${Math.abs(
          24 - (currentHour + parseInt(timezone))
        )} hour(s) later.`
      );
    }
  }
};
