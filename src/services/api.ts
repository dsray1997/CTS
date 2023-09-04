const api = {
  loginHandler: {
    login: "/auth/login",
    institute: "/auth/institute",
  },
  menuHandler: {
    menu: "/menu",
  },
  sessionHandler: {
    session: "/session",
  },
  subjectHandler:{
    subject:'/subject',
  },
  roleHandler:{
    role: '/role'
  },
  instituteHandler:{
    institute: '/institute'
  },
  classHandler:{
    class: '/class'
  },
  chapterHandler:{
    chapter: '/chapter'
  },
  batchHandler:{
    batch: '/batch'
  },
  registerHandler:{
    register: '/auth/register'
  },
  userHandler:{
    users: '/users',
    user: '/user'
  },
  configHandler:{
    config: '/component/config'
  }
};

export const { loginHandler,menuHandler,sessionHandler, subjectHandler,roleHandler,instituteHandler,classHandler,chapterHandler,batchHandler,registerHandler,userHandler,configHandler} = api;
