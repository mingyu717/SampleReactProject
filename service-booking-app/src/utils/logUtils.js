import * as Sentry from "@sentry/browser";

export function logError(error, info = {}) {
  Sentry.configureScope(scope => {
    Object.keys(info).forEach(key => {
      scope.setExtra(key, info[key]);
    });
  });
  Sentry.captureException(error);
}
