import log from 'roarr';

export function info(msg: Object): void {
  log.info(msg);
}

export function error(msg: Object): void {
  log.error(msg);
}

export function warn(msg: Object): void {
  log.warn(msg);
}
