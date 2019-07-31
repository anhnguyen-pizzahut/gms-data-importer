import * as logger from './logger';

export function build() {
  logger.info('Building source mapper object');
  return {
    id: 'builder-id-123456'
  }
}
