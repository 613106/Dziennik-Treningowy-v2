import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Auth from '@/services/Auth'
import emailVerification from '@/services/emailVerification.js'

const routes = [

  // Autoryzacja
  {
    path: '/auth',
    component: () => import( '@/components/DefaultLayout.vue' ),
    meta: {
      requiresGuest: true,
    },
    children: [
      {
        path: '/logowanie',
        name: 'Logowanie',
        component: () => import( '@/views/Logowanie.vue' ),
      },
      {
        path: '/rejestracja',
        name: 'Rejestracja',
        component: () => import( '@/views/Rejestracja.vue' ),
      },
      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import( '@/views/ForgotPassword.vue' ),
      },
      {
        path: "/reset-password",
        name: "ResetPassword",
        component: () => import( '@/views/ResetPassword.vue' ),
      },
    ]
  },

  // Weryfikacja e-mail
  {
    path: '/verify-email',
    component: () => import( '@/components/DefaultLayout.vue' ),    
    children: [
      {
        path: '/verify-email',
        name: 'VerifyEmail',
        meta: {
          requiresAuth: true,
        },
        component: () => import( '@/views/VerifyEmail.vue' ),
      },
      {
        path: '/verify-email-check',
        name: 'VerifyEmailCheck',
        component: () => import( '@/views/VerifyEmailCheck.vue' ),
      }
    ]
  },

  // Narzędzia
  {
    path: '/dashboard',
    component: () => import( '@/components/DefaultLayout.vue' ),
    meta: {
      requiresAuth: true,
      requiresEmailVerificated: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import( '@/views/Dashboard.vue' ),
      },
      {
        path: '/dashboard/kalendarz',
        name: 'Kalendarium',
        component: () =>
          import( '@/views/Kalendarz.vue' ),
      },
      {
        path: '/dashboard/konspekty',
        name: 'Conspect',
        component: () =>
          import( '@/views/Konspekt.vue' ),
      },              
    ]
  },

  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: ( to, from ) => {
      Auth.logout()
      return false},
    component: () => import( '@/views/Logowanie.vue' ),
  },
  
  // Strony z paska nawigacyjnego
  {
    path: '/',
    component: () => import( '@/components/DefaultLayout.vue' ),
    children: [
      {
        path: '/',
        name: 'Strona startowa',
        component: () => import( '@/views/StronaStartowa.vue' ),
      },
      {
        path: '/o-nas',
        name: 'O nas',
        component: () => import( '@/views/ONas.vue' ),
      },
      { 
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import( '@/views/NotFound.vue' ),
      }    
    ]
  },
    
]

const router = createRouter( {
  history: createWebHistory(),
  routes
} )

router.beforeEach( ( to, from, next ) => {

  const token = store.getters['user/getToken']
  const user = store.getters['user/getUser']
  const reqAuth = to.meta.requiresAuth
  const reqGuest = to.meta.requiresGuest
  const reqEmVer = to.meta.requiresEmailVerificated

  let _next = null

  if ( reqAuth && ! token){

    _next = { name: 'Logowanie' }

  } else if( token && reqGuest ) {    

    _next = { name: 'Dashboard' }

  } else if( reqEmVer && ! emailVerification() ) {

    _next = { name: 'VerifyEmail' }

  }

  // Pobierz dane, jeśli autoryzacja jest zakończona
  if( token && ! user ) {

    ;( async () => {

      await Auth.getUser()
        .then( res => {
          
          // Weryfikacja e-mail
          if( ! emailVerification() && reqEmVer ) {

            _next = { name: 'VerifyEmail' }

          }

          next( _next )

        } )

    } )()

  } else {

    next( _next )

  }

  // Próba resetu
  store.commit( {
    type: 'system/SET_ATTEMPT',
    attempt: false
  } )

} )

export default router