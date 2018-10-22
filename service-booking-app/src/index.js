import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import registerServiceWorker from "utils/registerServiceWorker";
import * as Sentry from "@sentry/browser";

ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();

Sentry.init({
  dsn: window.APP_DEPL_VAR.SentryDSN,
  environment: window.APP_DEPL_VAR.Env
});

// Enable Hot Reloading
if (module.hot) {
  module.hot.accept();
}
