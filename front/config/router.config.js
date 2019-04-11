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
      // {
      //   name: 'sys',
      //   icon: 'sys',
      //   path: '/sys',
      //   authority: ['admin', 'sys',],
      //   routes: [
      //     {
      //       path: '/sys/users',
      //       name: 'usersManage',
      //       component: './Sys/Users/UsersManage',
      //     }
      //   ],
      // },
      {
        name: 'courseWareManage',
        icon: 'courseWareManage',
        path: '/courseware-manage',
        authority: ['admin', 'sys',],
        // component: './CourseWareManage/Index',
        routes: [
          {
          name: 'add',
          icon: 'courseWareManage',
          path: '/courseware-manage/add',
          component: './CourseWareManage/Add',
        },
        {
          name: 'search',
          icon: 'courseWareManage',
          path: '/courseware-manage/search',
          component: './CourseWareManage/Index',
        }
        ]
      },
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
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'sys',],
        routes: [
          {
          name: 'add',
          icon: '',
          path: '/contract-manage/add',
          component: './ContractManage/AddContract',
        },
        {
          name: 'search',
          icon: '',
          path: '/contract-manage/search',
          component: './ContractManage/Index',
        }
        ]
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
      // 聊天室界面
      {
        name: 'my-chatroom',
        icon: 'video-camera',
        path: '/my-chat-room',
        routes: [
          {
            path: '/my-chat-room/search',
            name: 'search',
            component: './Mychatroom/List',
            routes: [
              {
                path: '/my-chat-room/search',
                redirect: '/my-chat-room/search',
              },
              {
                path: '/my-chat-room/search',
                component: './Mychatroom/List',
              },
            ],
          },
          {
            path: '/my-chat-room/add',
            name: 'add',
            component: './Mychatroom/Add',
            routes: [
              {
                path: '/my-chat-room/add',
                redirect: '/my-chat-room/add',
              },
              {
                path: '/my-chat-room/add',
                component: './Mychatroom/Add',
              },
            ],
          },
        ],
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
