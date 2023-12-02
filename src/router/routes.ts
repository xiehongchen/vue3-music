import { RouteRecordRaw } from "vue-router"

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/discovery',
    name: 'discovery',
    component: () => import('@/views/discovery/index.vue'),
    meta: {
      title: '发现音乐',
      icon: 'music'
    }
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: () => import('@/views/playlists/index.vue'),
    meta: {
      title: '推荐歌单',
      icon: 'playlist-menu',
    },
  },
  {
    path: '/songs',
    name: 'songs',
    component: () => import('@/views/songs/index.vue'),
    meta: {
      title: '最新音乐',
      icon: 'yinyue',
    },
  },
  {
    path: '/mvs',
    name: 'mvs',
    component: () => import('@/views/mvs/index.vue'),
    meta: {
      title: '最新MV',
      icon: 'mv',
    },
  },
]

export const layoutCenterNames = ['discovery', 'playlists', 'songs', 'mvs']

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/discovery',
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: () => import('@/views/playlist-detail/index.vue'),
  },
  {
    path: '/search/:keywords',
    name: 'search',
    component: () => import('@/views/search/index.vue'),
    props: true,
    children: [
      {
        path: '',
        name: 'searchDefault',
        redirect: 'songs',
      },
      {
        path: 'songs',
        name: 'searchSongs',
        component: () => import('@/views/search/songs.vue'),
      },
      {
        path: 'playlists',
        name: 'searchPlaylists',
        component: () => import('@/views/search/playlist.vue'),
      },
      {
        path: 'mvs',
        name: 'searchMvs',
        component: () => import('@/views/search/mvs.vue'),
      },
    ],
  },
  {
    path: '/mv/:id',
    name: 'mv',
    component: () => import('@/views/mv/index.vue'),
    props: (route) =>  ({id: +route.params.id}),
  },
  ...menuRoutes,
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]
