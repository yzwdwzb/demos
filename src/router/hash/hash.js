class HashRouter {
    constructor(routes = []) {
        this.routes = routes //路由映射
        this.currentHash = '' //当前hash
        this.refresh = this.refresh.bind(this)
        window.addEventListener('load', this.refresh, false)
        //hash改变的时候，触发该事件
        window.addEventListener('hashchange', this.refresh, false)
    }

    getUrlPath(url) {
        //get hash
        return url.indexOf('#') >= 0 ? url.slice(url.indexOf('#') + 1) : '/'
    }

    refresh(event) {
        let newURL = event.newURL || window.location.hash

        this.currentHash = this.getUrlPath(newURL || '')
        this.matchComponent()
    }

    matchComponent() {
        let currentRoute = this.routes.find(route => route.path === this.currentHash)
        if (!currentRoute) {
            //当前URL中hash不存在的时候，默认取第一个
            currentRoute = this.routes.find(route => route.path === '/')
        }
        const { component } = currentRoute
        document.getElementById('content').innerHTML = component
    }
}

const routes = [
    {
        path: '/',
        name: 'index',
        component: '<div>这里是首页内容</div>'
    }, {
        path: '/category',
        name: 'category',
        component: '<div>这里是类目内容</div>'
    }, {
        path: '/service',
        name: 'service',
        component: '<div>这里是服务内容</div>'
    }, {
        path: '/console',
        name: 'console',
        component: '<div>这里是控制台内容</div>'
    }
]

const router = new HashRouter(routes)