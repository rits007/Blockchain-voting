<template>
  <div id="app" style="margin: auto; background-color: black; color: aqua">
    <img alt="Election logo" src="./assets/electionsecurity.png">
      <h2>SECURED VOTING USING BLOCKCHAIN TECHNOLOGY</h2>
      <font-awesome-icon :icon="coffee" />
        <sidebar-menu :menu="menu"/>
      <router-view></router-view>
    </div>
</template>

<script>

import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

export default {
  name: 'app',
  components: {
    SidebarMenu
  },

  data () {
    return {
      menu:[
        {
          header: true,
          title: 'Main Navigation',
          hiddenOnCollapse: true
        },
        {
          href: '/',
          title: 'HOME',
          icon: 'fa fa-user'
        },
        {
          href: '/castBallot',
          title: 'CAST BALLOT',
          icon: 'fa fa-user'
        },
        {
          href: '/uploadID',
          title: 'UPLOAD ID',
          icon: 'fa fa-user'
        },
        {
          href: '/voterAuthorization',
          title: 'VOTER AUTHORIZATION',
          icon: 'fa fa-user'
        },
        {
          href: '/getCurrentStanding',
          title: 'GET POLL STANDINGS',
          icon: 'fa fa-chart-area'
        }
      ]
    }
  },

  props: {

    // Sidebar width (expanded)
    width: {
      type: String,
      default: '350px'
    },

    // Sidebar width (collapsed)
    widthCollapsed: {
      type: String,
      default: '50px'
    },

    // Sidebar right to left
    rtl: {
      type: Boolean,
      default: false
    },

    // Make sidebar relative to the parent (by default the sidebar is relative to the viewport)
    relative: {
      type: Boolean,
      default: false
    },

    // Hide toggle collapse btn
    hideToggle: {
      type: Boolean,
      default: false
    },

    // Hide toggle collapse btn
    isCollapsed: {
      type: String,
      default: "vsm_expanded"
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.chart-wrapper {
  width: 100%;
  height: 700px;
}
.echarts {
  width: 100%;
  height: 100%;
}

#loader {
  position:fixed;
  padding-top: 250px;
}

.chart-wrapper {
  position:fixed;
  padding-left:32%;
}

.voterIDText {
  width: 200px;
  height: 20px;
  border: 2px solid aqua;
}

.standardInputText {
  width: 200px;
  height: 20px;
  border: 2px solid aqua;
  float: right;
}

.regVoterInput {
  margin-left: 50px;
  margin-right: 50px;
}

.regVoterLabel {
  float: left;
  color: blue;
}

.standardButton {
  border-radius: 4px;
  background-color: black;
  border: none;
  color: aqua;
  text-align: center;
  font-size: 15px;
  padding: 10px;
  width: 120px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.standardButton span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.standardButton span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.standardButton:hover span {
  padding-right: 25px;
}

.standardButton:hover span:after {
  opacity: 1;
  right: 0;
}

.candidateInfo {
  width: 250px;
  color: black;
  background-color: white;
  float: right;
}

.candidateImage {
  float:left;
}

.candidateContainer {
  width: 600px;
  margin: auto;
}

</style>
