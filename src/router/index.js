import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import UserList from '../pages/UserList.vue'
import UserDetail from '../pages/UserDetail.vue'
import UserEdit from '../pages/UserEdit.vue'
import ProjectList from "../pages/project/ProjectList.vue";
import ProjectDetail from "../pages/project/ProjectDetail.vue";
import ProjectEdit from "../pages/project/ProjectEdit.vue";
import ProjectCreate from "../pages/project/ProjectCreate.vue";

Vue.use(Router);
//获取原型对象上的push函数
const originalPush = Router.prototype.push;
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        leftTabShow: true,
        headerShow: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        headerShow: false
      }
    },
    {
      path: '/user_list',
      name: 'UserList',
      component: UserList,
      meta: {
        leftTabShow: true,
        headerShow: true
      }
    },
    {
      path: '/user_detail',
      name: 'UserDetail',
      component: UserDetail,
      meta: {
        leftTabShow: true,
        headerShow: true
      }
    },
    {
      path: '/user_edit',
      name: 'UserEdit',
      component: UserEdit,
      meta: {
        leftTabShow: true,
        headerShow: true
      }
    },
    {
      path: '/project_list',
      name: 'ProjectList',
      component: ProjectList,
      meta: {
        leftTabShow: true,
        headerShow: true
      }
    },
    {
      path: '/project_detail',
      name: 'ProjectDetail',
      component: ProjectDetail,
      meta: {
        leftTabShow: true,
        headerShow: true
      }
    },
    {
      path: '/project_edit',
      name: 'ProjectEdit',
      component: ProjectEdit,
      meta: {
        leftTabShow: true,
        headerShow: true
      }
    },
    {
      path: '/project_create',
      name: 'ProjectCreate',
      component: ProjectCreate,
      meta: {
        leftTabShow: true,
        headerShow: true
      }
    }
  ]
})
