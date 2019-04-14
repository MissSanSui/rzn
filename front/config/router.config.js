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
      { path: '/', redirect: '/home', },
      {
        name: '',
        icon: '',
        path: '/home',
        component: './Home/Home',
      },
      {
        name: 'courseWareManage',
        icon: 'courseWareManage',
        path: '/courseware-manage',
        authority: ['TEA'],
        // component: './CourseWareManage/Index',
        routes: [
          {
            name: 'add',
            icon: 'courseWareManage',
            path: '/courseware-manage/add',
            component: './CourseWareManage/Add',
            authority: ['TEA'],
          },
          {
            name: 'search',
            icon: 'courseWareManage',
            path: '/courseware-manage/search',
            component: './CourseWareManage/Index',
            authority: ['TEA'],
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
        authority: ['SYS', 'LEA'],
      },
      //  课时管理
      {
        name: 'contractManage',
        icon: 'contractManage',
        path: '/contract-manage',
        Routes: ['src/pages/Authorized'],
        authority: ['ASS'],
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
      // {
      //   name: 'chatroom',
      //   icon: 'video-camera',
      //   path: '/chat-room',
      //   component: './Chatroom/Chatroom',
      // },
      {
        path: '/join-room',
        authority: ['TEA', 'STU'],
        component: './Chatroom/Joinroom',
      },
      // 聊天室界面
      {
        name: 'my-chatroom',
        icon: 'video-camera',
        path: '/my-chat-room',
        authority: ['TEA', 'STU', 'ASS'],
        routes: [
          {
            path: '/my-chat-room/search',
            name: 'search',
            component: './Mychatroom/List',
            // routes: [
            //   {
            //     path: '/my-chat-room/search',
            //     redirect: '/my-chat-room/search',
            //   },
            //   {
            //     path: '/my-chat-room/search',
            //     component: './Mychatroom/List',
            //   },
            // ],
          },
          {
            path: '/my-chat-room/add',
            name: 'add',
            component: './Mychatroom/Add',
            authority: ['ASS'],
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
        component: '404',
      },
    ],
  },
];
