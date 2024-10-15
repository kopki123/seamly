/* eslint-disable no-unused-vars */
import { createWebHistory, createRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

export enum Access {
  public = 'public',
  guest = 'guest',
  auth = 'auth',
  admin = 'admin',
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/Home.vue'),
      meta: { access: Access.public },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue'),
      meta: { access: Access.guest },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/Register.vue'),
      meta: { access: Access.guest },
    },
    {
      path: '/auth/verify-email',
      name: 'verifyEmail',
      component: () => import('@/views/verifyEmail/VerifyEmail.vue'),
      meta: { access: Access.guest },
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/product/Product.vue'),
      meta: { access: Access.public },
    },
    {
      path: '/cart',
      name: 'cart',
      meta: { access: Access.auth },
      component: () => import('@/views/cart/Cart.vue'),
      children: [
        {
          path: '',
          name: 'CartContent',
          component: () => import('@/views/cart/CartContent.vue'),
        },
        {
          path: 'order-checkout',
          name: 'orderCheckout',
          component: () => import('@/views/cart/Checkout.vue'),
        },
      ],
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user/User.vue'),
      meta: { access: Access.auth },
      children: [
        {
          path: '',
          name: 'UserInfo',
          component: () => import('@/views/user/UserInfo.vue'),
        },
        {
          path: 'orders',
          name: 'userOrders',
          component: () => import('@/views/user/Orders.vue'),
        },
      ],
    },
    {
      path: '/order/:id',
      name: 'order',
      component: () => import('@/views/order/Order.vue'),
      meta: { access: Access.auth },
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/Admin.vue'),
      meta: { access: Access.admin },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/',
    },
  ],
});

// 只有初次進入畫面，需取得用戶狀態
const unwatch = router.beforeEach(async () => {
  const userStore = useUserStore();
  await userStore.checkLoginStatus();
  unwatch();
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const { isAdmin, isLoggedIn } = userStore;

  switch (to.meta.access) {
    case Access.public:
      return true;
    case Access.auth:
      return isLoggedIn ? true : { name: 'home' };
    case Access.guest:
      return !isLoggedIn ? true : { name: 'home' };
    case Access.admin:
      return isLoggedIn && isAdmin ? true : { name: 'home' };
    default:
      return true;
  }
});

export default router;
