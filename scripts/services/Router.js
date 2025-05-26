export class Router {
    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
        this._setupHashChange();
    }

    _loadInitialRoute() {
        const path = window.location.hash.substring(1) || 'home';
        this._loadRoute(path);
    }

    _setupHashChange() {
        window.addEventListener('hashchange', () => {
            const path = window.location.hash.substring(1);
            this._loadRoute(path);
        });
    }

    async _loadRoute(path) {
        const route = this.routes.find(route => route.path === path) || 
                     this.routes.find(route => route.path === 'not-found');
        
        const app = document.getElementById('app');
        app.innerHTML = await route.component();
        
        if (route.setup) {
            route.setup();
        }
    }
}