

import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import CastBallot from '@/components/CastBallot'
import UploadID from '@/components/UploadID'
import VoterAuthorization from '@/components/VoterAuthorization'
import GetCurrentStanding from '@/components/GetCurrentStanding'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/castBallot',
      name: 'CastBallot',
      component: CastBallot
    },
    {
      path: '/uploadID',
      name: 'UploadID',
      component: UploadID
    },
    {
      path: '/voterAuthorization',
      name: 'VoterAuthorization',
      component: VoterAuthorization
    },
    {
      path: '/getCurrentStanding',
      name: 'GetCurrentStanding',
      component: GetCurrentStanding
    }
  ]
})