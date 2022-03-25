<template>
  <div class="wrapper">
    <!-- sidebar -->
    <div class="sidebar right-shadow">
      <div class="panel h-100 d-flex flex-column justify-content-between">
        <div class>
          <router-link to="/" class="header-links">
            <div class="d-flex justify-content-center py-1">
              <img src="../assets/images/logo.png" alt="Classe19" class="img-fluid sidebar-logo" />
            </div>
          </router-link>
          <div class="side-menu">
            <router-link class="side-menu-link" to="/">
              <i class="fa fa-th-large"></i>
              <span>Tableau de board</span>
            </router-link>
            <router-link
              :class="'in-menu side-menu-link ' + isActive(link.base)"
              @click.native="showSubpanel(link)"
              :to="link.path"
              v-for="(link, i) in links"
              :key="i"
            >
              <i :class="'fa fa-' + link.icon"></i>
              <span>{{link.title}}</span>
              <i v-if="link.children" class="fa fa-angle-right pull-right mt-1"></i>
            </router-link>
            <div class="side-menu-link" @click="logout">
              <i class="fa fa-sign-out"></i>
              <span>Déconnexion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- fin sidebar -->
    <div class="sidebar sub-sidebar right-shadow" v-if="this.subpanelVisible">
      <div class>
        <div class="text-right p-2 side-close">
          <i class="fa fa-times" @click="hideSubpanel()"></i>
        </div>
        <div class="side-menu">
          <router-link
            class="side-menu-link"
            @click.native="hideSubpanel()"
            :to="link.path"
            v-for="(link, i) in childLinks"
            :key="i"
          >
            <i :class="'fa fa-' + link.icon"></i>
            <span>{{link.title}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="h-100 w-100 pb-max">
      <!-- header -->
      <div class="navtop flex-row justify-content-between">
        <!--h4-- class="title mb-0">{{title || ' '}}</!--h4-->
        <div class="col-sm"></div>
        <div class="d-flex flex-row">
          <div class="navbar-nav ml-auto topbar-divider d-none d-sm-block"></div>
          <div class="d-flex">
            <div class="pr-1">
              <div class="username">{{fullname}}</div>
              <div class="userLevel">{{userLevel}}</div>
            </div>
            <div>
              <img
                class="img-profile rounded-circle py-auto logo-user"
                :src="'https://api.adorable.io/avatars/60/' + userEmail"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mh-100 h-100 px-4 py-4 overflow-y-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import menuLinks from "../data/menu";
import Popup from "./popup";

export default {
  components: { Popup },
  name: "dashboard-layout",
  data() {
    return {
      childLinks: [],
      subpanelVisible: false,

      levels: {
        un: "Niveau 1",
        deux: "Niveau 2"
      },

      connected: false,
      admin: false,
      user: false,
      bask: false,
      yes: false,
      info: false,
      annonce: { titre: "", msg: "" },
      panier: false,
      active: 0,
      nbrp: 0,
      firstname: "",
      lastname: "",
      level: ""
    };
  },
  computed: {
    fullname: function() {
      var adminInfo = localStorage.getItem("adminInfo");
      try {
        adminInfo = JSON.parse(adminInfo);
        return adminInfo.fullname;
      } catch (error) {
        return "";
      }
    },
    userEmail: function() {
      var adminInfo = localStorage.getItem("adminInfo");
      try {
        adminInfo = JSON.parse(adminInfo);
        return adminInfo.email;
      } catch (error) {
        return "";
      }
    },
    links: function() {
      return this.$store.getters.adminLevel
        ? menuLinks[this.$store.getters.adminLevel]
        : localStorage.getItem("adminLevel");
    },
    userLevel: function() {
      return this.$store.getters.adminLevel
        ? this.levels[this.$store.getters.adminLevel]
        : localStorage.getItem("adminLevel");
    }
  },
  props: ["title"],
  mounted() {
    this.$service.getMe((err, data) => {
      if (err) {
        this.logout();
        return;
      }
      localStorage.setItem("adminLevel", data.admin.level);
      localStorage.setItem("adminInfo", JSON.stringify(data.admin));
      this.$store.commit("getAdminInfo");
    });
  },
  methods: {
    isActive: function(routeBase) {
      const base = this.$route.fullPath.split("/");
      if (base && base[1] === routeBase) {
        return "router-link-exact-active router-link-active";
      } else {
        return "";
      }
    },
    logout() {
      this.$store.commit("resetAdminInfo");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("token");
      this.$router.push({ path: "/login" });
    },
    hideSubpanel() {
      this.subpanelVisible = false;
      this.childLinks = [];
    },
    showSubpanel(link) {
      if (!link.children) {
        this.subpanelVisible = false;
        this.childLinks = [];
        return true;
      }

      this.childLinks = link.children;
      this.subpanelVisible = true;
      return false;
    },
    next(lien, i) {
      localStorage.setItem("active", i);
      this.$router.push({ path: lien });
    }
  }
};
</script>

<style lang="scss" scoped>
$color1: rgba(228, 87, 46, 1);
$color2: rgba(255, 186, 8, 1);
$color3: rgba(0, 168, 120, 1);
$color4: rgba(244, 241, 222, 1);
$color5: #d39b03;
$color6: #f7bc1b;

.wrapper {
  // background-color: lighten($color4, 2%);
  background-color: $color4;
  height: 100%;
  display: flex;
}

.sub-sidebar {
  position: fixed;
  left: 250px;
  z-index: 75;
}

.sidebar {
  min-width: 260px;
  width: 260px;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  align-items: stretch;
  z-index: 99;
  background: transparent
    linear-gradient(180deg, darken($color6, 5%) 20%, darken($color6, 20%) 80%)
    0% 0% no-repeat padding-box;
}

.side-close i {
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
}

.logo-box {
  justify-content: center;
  padding: 19px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.116);
}

.logo-box span {
  font-size: 1.35rem;
  font-weight: 500;
  color: $color1;
  line-height: 1.1;
}

.sidebar-logo {
  width: 80px;
}

.sidebare-logo {
  display: none;
  // width: 200px;
  height: 10px;
}

.separator-line {
  width: 85px;
  background-color: #72a8d0;
  margin-top: 9px;
  margin-bottom: 13px;
}

.side-menu .side-menu-link {
  display: block;
  color: #fff;
  cursor: pointer;
  background-color: transparent;
  padding: 16px 25px;
}

.side-menu .side-menu-link:hover {
  text-decoration: none;
  background-color: darken($color5, 10%);
  color: white;
}

.side-menu .in-menu.side-menu-link.router-link-active,
.side-menu .side-menu-link.router-link-exact-active,
.side-menu .side-menu-link:active {
  text-decoration: none;
  background-color: darken($color5, 15%);
  color: white;
}

.side-menu .side-menu-link i {
  margin-right: 15px;
  width: 20px;
  text-align: center;
}

.navtop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 10px 16px;
}

.navtop-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // box-shadow: 0 6px 22px rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  padding: 4px 10px;
  background-color: #101010;
  color: #f1f1f1;
  font-size: x-small;
  opacity: 0.8;
}

.navtop .title {
  color: $color1;
  font-weight: 800;
}

.overflow-y-auto {
  overflow-y: auto;
  background-color: rgb(245, 245, 245);
}

.pb-max {
  padding-bottom: 80px;
}

.side-menu-linkInActive {
  text-decoration: none;
  display: block;
  padding: 10px;
  color: white;
  cursor: pointer;
  margin-right: -10px;
}

.side-menu-linkInActive:hover {
  text-decoration: none;
  background-color: #043d5c;
  color: white;
  margin-right: -10px;
}

.side-menu-linkInActive i {
  margin-right: 15px;
  width: 20px;
  text-align: center;
}

.panel-footer {
  text-align: center;
}

.panel-footer a {
  color: white;
}

.panel {
  color: white;
}

.my-logo {
  text-align: center;
  text-align: center;
  padding: 8px 16px;
  width: 50px;
  height: 50px;
  border-radius: 6px;
  background: transparent linear-gradient(316deg, #eaf2ea 0%, #6c9698 100%) 0%
    0% no-repeat padding-box;
  border: 0.5px solid #caced5;
}

.icon-notif {
  color: #888888;
}

.logo-ecole {
  width: 20px;
  font-size: 15px;
  word-break: break-word;
  line-height: 1.1;
}

.logo-user {
  width: 38px;
  height: 38px;
  padding-top: 3px;
}

.school-name {
  font-size: 18px;
  font-weight: bold;
  line-height: 22px;
}

.school-year {
  font-size: 11px;
}

.username {
  font-weight: bold;
  font-size: 16px;
  text-align: right;
}

.userLevel {
  font-size: 12px;
  text-align: right;
}

.header-links {
  color: #888888;
  margin: 4px;
}

.mainmenu-area {
  background: none repeat scroll 0 0 #fbfbfb;
  font-family: "Roboto Condensed", sans-serif;
  text-transform: uppercase;
  width: 100%;
  height: justify;
  z-index: 999;
  background-color: #fbfbfb;
}

.mainmenu-area span {
  color: #6e6a6a;
  font-size: 14px;
  padding: 14px;
}

.mainmenu-area span.active,
.mainmenu-area span:hover {
  background: #5a88ca;
  color: #fff;
}
.mainmenu-area span:focus {
  color: #fff;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .user-menu,
  .header-right ul.list-inline {
    text-align: center;
  }
}

.popup {
  background-color: #f1f1f1;
  border-radius: 10px;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.pos {
  position: relative;
  justify-content: center;
  text-align: center;
}

.alert {
  position: fixed;
  margin-left: 30%;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bgc {
  background-color: #aaaaaa;
}

.bgcs {
  background-color: #cccccc;
}

.search-height {
  width: 100%;
  border-color: #fff;
  border-width: 1px;
}
.afh:hover {
  cursor: pointer;
}

.search {
  width: auto;
  border: 2px solid #f4f4f4;
  background-color: #f7910b;
  border-radius: 8px;
  padding: 2px;
}

input[type="searching"] {
  width: 60%;
  border: 2px solid #f4f4f4;
  height: 34px;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: #ffffff;
  background-image: url("../assets/images/sic.png");
  background-size: 22px;
  background-position: 10px 5px;
  background-repeat: no-repeat;
  padding: 10px 20px 10px 40px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}

input[type="searching"]:focus,
input[type="searching"]:hover {
  background-color: #f4f4f4;
  border: 2px solid #f7910b;
  width: 90%;
}

@media screen and (min-width: 180px) and (max-width: 650px) and (max-width: 1120px) {
  .hider {
    display: none;
  }

  .beaud {
    background-size: cover;
    background-image: url("../assets/images/favicon.png");
  }

  input[type="searching"] {
    font-size: 12px;
    background-size: 15px;
    width: 16px;
    height: 24px;
    padding: 4px 12px 1px 28px;

    // width: 60%;
    border: 2px solid #f4f4f4;
    // height: 34px;
    border-radius: 10px;
    box-sizing: border-box;
    // font-size: 16px;
    background-color: #ffffff;
    background-image: url("../assets/images/sic.png");
    // background-size: 22px;
    background-position: 10px 5px;
    background-repeat: no-repeat;
    // padding: 10px 20px 10px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
  }

  input[type="searching"]:focus,
  input[type="searching"]:hover {
    width: 106%;
    // margin-right: auto;
  }

  // input[type=searching]:focus  {
  //   // font-size: 12px;
  //   // background-size: 20px;
  //   width: 130px;
  //   height: 26px;
  //   // height: 24px;
  // }

  .annonce {
    color: #f7910b;
    font-size: small;
  }

  .sidebar-logo {
    display: none;
  }

  .sidebare-logo {
    display: inline;
    width: 26px;
    height: 20px;
    margin-top: 8px;
  }
}
.mbtn {
  border: none;
  margin: 5px;
  background-color: #f7910b;
  color: white;
}

.icon-size {
  font-size: 150%;
  margin-left: 0%;
  padding: 4px;
}

.header-links-size {
  font-size: 120%;
  margin-left: 6px;
}
// input[type=search]:focus { width: 82%;}

.tac {
  text-align: center;
}

.minh {
  min-height: 106%;
}
</style>
