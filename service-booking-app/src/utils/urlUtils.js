export const appendSlashToUrl = url => {
  if (url.substr(-1) !== "/") {
    return url + "/";
  }
  return url;
};
