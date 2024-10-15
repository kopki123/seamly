import 'vue-router';
import { Access } from './index';

declare module 'vue-router' {
  interface RouteMeta {
    access?: Access;
  }
}
