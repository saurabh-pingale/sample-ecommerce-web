import { Router } from "./services/Router.js";
import { routes } from "./routes.js";

document.addEventListener('DOMContentLoaded', () => {
    new Router(routes);
});