import App from "./app";
import _log from "./util/log";
import _router from "./express/router";
import _gcp from "./gcp";

export const log = _log;
export const router = _router;
export const gcp = _gcp;

export default App;
