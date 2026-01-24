import express from 'express';
import config from '../../config/config';
import docsRoute from './docs.route';
import userRoutes from './user.route'
// import captchaRoutes from './captcha.route'
import AccessRoleRoutes from './accessRole.route'
import ProfileRoutes from './profile.route'
import SpecializationRoutes from './specialization.route'
import SubSpecializationRoutes from './subSpecialization.route'
import authRouter from './auth.routes'

const router = express.Router();


const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter
  },
  {
    path: '/user',
    route: userRoutes
  },
  {
    path: '/profile',
    route: ProfileRoutes
  },
  {
    path: '/specializations',
    route: SpecializationRoutes
  },
  {
    path: '/subSpecializations',
    route: SubSpecializationRoutes
  },
  // {
  //   path: '/captcha',
  //   route: captchaRoutes
  // }
  
  {
    path: '/role-access',
    route: AccessRoleRoutes

  },

];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
