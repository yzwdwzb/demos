


const routes = [
    {
        id: 1,
        path: '',
        title: '首页',
        name: 'index',
        component: '<div>这里是首页内容</div>'
    }, {
        id: 2,
        path: '/category',
        name: 'category',
        title: '类目',
        component: '<div>这里是类目内容</div>'
    }, {
        id: 3,
        path: '/service',
        name: 'service',
        title: '服务',
        component: '<div>这里是服务内容</div>'
    }, {
        id: 4,
        path: '/console',
        name: 'console',
        title: '控制台',
        component: '<div>这里是控制台内容</div>'
    }
]

let btnArray = []



let _wr = function (type) {
    let orig = history[type]
    return function () {
        let rv = orig.apply(this, arguments)
        let e = new Event(type)
        e.arguments = arguments
        window.dispatchEvent(e)
        return rv
    }
}
history.pushState = _wr('pushState')
history.replaceState = _wr('replaceState')


routes.forEach((r, i) => {
    btnArray[i] = document.getElementById(`btn${r.id}`)
    btnArray[i].addEventListener('click', () => {
        history.pushState({ state: r.id }, null, `/src/router/history/index.html${r.path}`)
    })
})

window.addEventListener('pushState', e => {
    //监听pushState自定义事件，拿到pushState的参数，做出页面渲染
    let { state } = e.arguments[0]
    if (state) {
        routes.forEach(r => {
            if (r.id == state) {
                document.getElementById('content').innerHTML = r.component
            }
        })
    }
})





