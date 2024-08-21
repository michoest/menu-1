const routes = [
  {
    path: '/',
    // component: () => import('pages/settings.page.vue')
    component: () => import('layouts/app.layout.vue'),
    children: [
      { path: 'list', component: () => import('pages/list.page.vue') },
      { path: 'menu', component: () => import('pages/menu.page.vue') },
      { path: 'vendors', component: () => import('pages/vendors.page.vue') },
      { path: 'settings', component: () => import('pages/settings.page.vue') },
      { path: 'login', component: () => import('pages/login.page.vue') },
      { path: 'network', component: () => import('pages/network.page.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error.page.vue')
  }
]

export default routes
