<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="header">
          <logo/>
        </div>
        <div class="desc">
        </div>
      </div>

      <route-view></route-view>

      <div class="footer">
        <div class="links">
          <!-- <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'
import Logo from '@/components/tools/Logo'

export default {
  name: 'UserLayout',
  components: { RouteView, Logo },
  mixins: [mixinDevice],
  data () {
    return {}
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(/login_bg.png) no-repeat 50%;
      background-size: cover;
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;

      a {
        text-decoration: none;
      }

      .top {
        margin-top: -34px;
        text-align: center;

        .header {
          /deep/.router-link-active {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            .logoImg {
              width: 44px;
              height: 44px;
            }
            .logoTitle {
              margin-top: 1px;
              font-size: 40px;
            }
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        // width: 368px;
        width: 860px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 24px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
