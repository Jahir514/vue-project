import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './pages/coaches/CoachesLists.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesRegistration from './pages/coaches/CoachesRegistration.vue';
import ContactCoaches from './pages/requests/ContactCoaches.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      children: [{ path: '/contact', component: ContactCoaches }],
    },
    {
      path: '/register',
      component: CoachesRegistration,
    },
    {
      path: '/requests',
      component: RequestsReceived,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});
export default router;
