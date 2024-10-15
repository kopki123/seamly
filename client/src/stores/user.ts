/* eslint-disable import/prefer-default-export */
import { defineStore, acceptHMRUpdate } from 'pinia';
import * as authApiService from '@/api/auth';
import * as userApiService from '@/api/user';
import { Role } from '@/utils/role';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userId: '',
    email: '',
    isLoggedIn: false,
    isAdmin: false,
  }),
  actions: {
    logout: authApiService.logout,
    register: authApiService.register,
    verifyEmail: authApiService.verifyEmail,
    async checkLoginStatus () {
      const response = await authApiService.checkLoginStatus();

      if (response.status === 'error') {
        return response;
      }

      const { user: { role, userId } } = response.data!;

      this.$patch({
        userId,
        isLoggedIn: true,
        isAdmin: role === Role.Admin,
      });

      return response;
    },
    async login (payload: {
      email: string;
      password: string;
    }) {
      const response = await authApiService.login(payload);

      if (response.status === 'error') {
        return response;
      }

      const { user: { role, userId } } = response.data!;

      this.$patch({
        userId,
        isLoggedIn: true,
        isAdmin: role === Role.Admin,
      });

      return response;
    },
    async getUserInfo () {
      const response = await userApiService.getUserInfo();

      if (response.status === 'error') {
        return response;
      }

      const { user: { role, id, email } } = response.data!;

      this.$patch({
        userId: id,
        email,
        isLoggedIn: true,
        isAdmin: role === Role.Admin,
      });

      return response;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
