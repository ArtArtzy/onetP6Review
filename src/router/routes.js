const routes = [{
  path: '/',
  component: () => import('pages/login.vue'),
  name: "login"
},
{
  path: '/main',
  component: () => import('pages/main.vue'),
  name: "main"
},
{
  path: '/review',
  component: () => import('pages/review.vue'),
  name: "review"
},

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
