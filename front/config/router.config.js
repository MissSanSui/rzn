export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // 系统配置页面
      { path: '/', redirect: '/user-manage', authority: ['admin', 'user', 'guest'] },
      {
        name: 'sys',
        icon: 'sys',
        path: '/sys',
        authority: ['admin', 'sys',],
        routes: [
          {
            path: '/sys/users',
            name: 'usersManage',
            component: './Sys/Users/UsersManage',
          }
        ],
      },
      // {
      //   name: 'courseWareManage',
      //   icon: 'sys',
      //   path: '/coursewareManage',
      //   authority: ['admin', 'sys',],
      //   component: './CourseWareManage/Index',
      // },
      // 用户信息管理
      {
        name: 'userManage',
        icon: 'userManage',
        path: '/user-manage',
        component: './UserManage/UserManage',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'sys',],
      },
      //  课时管理
       {
        name: 'contractManage',
        icon: 'contractManage',
        path: '/contract-manage',
        component: './ContractManage/Index',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'sys',],
      },
      // 聊天室界面
      {
        name: 'chatroom',
        icon: 'video-camera',
        path: '/chat-room',
        component: './Chatroom/Chatroom',
      },
      {
        name: 'joinroom',
        icon: 'video-camera',
        path: '/join-room',
        // authority: ['admin', 'sys', 'teacher', 'student'],
        component: './Chatroom/Joinroom',
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
