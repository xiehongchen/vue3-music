/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2023-12-04 10:33:37
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-02-23 15:08:49
 * @FilePath: /vue3-music/src/router/routes.ts
 * @Description: 
 * 认真学习每一天
 */
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


export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/discovery',
    // component: () => import('@/layout/index.vue'),
    children: [
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
      },
      ...menuRoutes,
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]
