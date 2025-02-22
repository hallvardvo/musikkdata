import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/stats/:trackId', // <- Dynamic parameter
    name: 'stats',
    component: () => import('@/views/Stats.vue'),
    props: true // Optional but recommended
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Stats' && !to.params.trackId) {
    next('/'); // Redirect to home if no track ID
  } else {
    next();
  }
});

export default router;
