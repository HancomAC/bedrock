import './util/env'
import App from "./app";
import _log from "./util/log";
import _router from "./express/router";
import _gcp from "./gcp";
import _algolia, {ProblemIndex} from "./util/algolia";
import {auth as _auth} from "./util/jwt";

export const log = _log;
export const router = _router;
export const gcp = _gcp;
export const algolia = {
    client: _algolia,
    ProblemIndex
}
export const auth = _auth

export default App;
