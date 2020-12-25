<!--
 * @Autor: fzs
 * @Date: 2020-03-23 11:34:15
 * @Description:
 -->
<template>
  <div class="IndexPage">
    <a-spin :spinning="spinning">
      <div class="menuContainer">
        <div class="scrollTips">
          <a-row type="flex">
            <a-col :span="2">
              <div class="gif-img">
                <CustomIcon name="onlineOfficeHall-004laba-2" class="myGis" />
                <CustomIcon name="onlineOfficeHall-shengbo" class="myGis scale-up-left" />
              </div>
            </a-col>
            <a-col :span="18">
              <vue-seamless-scroll :data="noticeList" :class-option="classOption" class="seamless-warp">
                <a-list size="small" :split="false" :data-source="noticeList">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <div :key="index" class="my-ellipsis" @click="go2NoticeMore(item)">
                      <a href="javascript:void(0);" class="scroll-list-a">{{ item.TITLE }}</a>
                    </div>
                  </a-list-item>
                </a-list>
              </vue-seamless-scroll></a-col
            >
            <a-col :span="4" style="display: flex; align-self: center; justify-content: flex-end">
              <router-link :to="{ name: 'notice' }" class="linkBtn"><span class="white-font">更多>></span></router-link>
            </a-col>
          </a-row>
        </div>
        <a-row :gutter="{ sm: 20, xxl: 40 }" type="flex" justify="start" align="stretch" style="flex: 1">
          <a-col v-for="(item, index) in menuList" :key="index" :span="8" class="menuCol">
            <a-card class="menuCard" @click="goMainPage(item)">
              <div class="imgBox">
                <img :alt="item.name" :src="item.meta.webicon || `/home/nav_0${index+1}.png`" />
              </div>
              <span class="menuCount" v-if="item.count">{{ item.count || '暂无数据' }}</span>
              <a-card-meta :title="item.meta.title || '暂无数据'">
                <template slot="description">{{ item.meta.intro || '暂无数据' }}</template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { timeFix } from '@/utils/util'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import vueSeamlessScroll from 'vue-seamless-scroll'
import { convertRoutes } from '@/utils/routeConvert'

export default {
  name: 'Home',
  components: {
    GlobalHeader,
    GlobalFooter,
    vueSeamlessScroll
  },
  data () {
    return {
      listData: [],
      timeFix: timeFix(),
      loading: true,
      radarLoading: true,
      projects: [],
      activities: [],
      teams: [],

      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80
        }
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      radarData: [],

      dataArray: [], // 接口返回的初始值
      spinning: false,
      noticeList: [],
      msgIndex: 0,
      nextDisabled: true,
      preDisabled: true,
      isMsgBox: false,
      isCountDisabled: false
    }
  },
  computed: {
    ...mapGetters({ user: 'user', hasShowMsgBox: 'hasShowMsgBox', token: 'token' }),
    ...mapState({
      // 动态主路由
      menuList: (state) => {
        const routes = convertRoutes(state.permission.addRouters.find(item => item.path === '/'))
        return ((routes && routes.children) || []).filter(item => item.name !== 'home')
      }
    }),
    classOption () {
      return {
        direction: 1,
        limitMoveNum: 1,
        step: 0.5,
        singleHeight: 30,
        waitTime: 2500
      }
    }
  },
  created () {
  },
  mounted () {
    // this.goNoticeList()
  },
  watch: {
    sidebarOpened (val) {
      this.collapsed = !val
    }
  },
  methods: {
    goMainPage (item) {
      this.$router.push({
        name: item.name
      })
    },

    // 重要通知事件
    goNoticeList () {
      this.noticeList = []
      this.$WebApi.home['GetNoticeList']().then((data) => {
        this.noticeList = data.rowsList || []
        this.noticeList = this.noticeList.concat(this.noticeList)
        this.isMsgBox = true
        this.$store.commit('SET_MSG_BOX', true)
        if (this.noticeList.length > 1) {
          this.nextDisabled = false
        }
      })
    },
    nextMsg () {
      this.preDisabled = false
      this.msgIndex++
      if (this.msgIndex >= this.noticeList.length - 1) {
        this.nextDisabled = true
        this.msgIndex = this.noticeList.length - 1
      }
    },
    preMsg () {
      this.nextDisabled = false
      this.msgIndex--
      if (this.msgIndex <= 0) {
        this.preDisabled = true
        this.msgIndex = 0
      }
    },
    closeMsgBox () {
      this.isMsgBox = false
    },
    go2NoticeMore (item) {
      console.log(item)
      this.$router.push({
        name: 'noticeMore',
        params: {
          data: item
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.IndexPage {
  // margin: -24px 0 0px;

  // 顶部图片
  .bannerContainer {
    height: 400px;
    background: url(/titleBackgroud.png) no-repeat center bottom;
    .bannerTitle {
      /deep/.ant-layout-header {
        background-color: transparent;
        /deep/.header-index-wide {
          // 标题容器
          max-width: 1228px;
          margin: auto;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          padding-top: 48px;
          line-height: 1 !important;
          // 左边
          /deep/.header-index-left {
            .logo {
              .router-link-active {
                display: flex;
                align-items: flex-start;
                .logoImg {
                  width: 32px;
                  height: 32px;
                }
                .logoTitle {
                  margin-top: 1px;
                  font-size: 28px;
                }
              }
            }
          }
          // 右边
          /deep/.header-index-right {
            flex: 1;
            padding-top: 3px;
            margin-right: -15px;
            align-self: flex-start;
            .content-box {
              text-align: right;
              .linkBtn {
                font-size: 14px;
                color: #fff;
                padding: 0 15px;
                position: relative;
              }
              .ant-dropdown-link {
                position: relative;
              }
              .linkBtn + .linkBtn,
              .linkBtn + .ant-dropdown-link {
                &::before {
                  width: 1px;
                  height: 14px;
                  background-color: #fff;
                  content: '';
                  position: absolute;
                  left: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
.scrollTips {
  color: white;
  margin-bottom: 15px;
}
// 菜单格子
.menuContainer {
  width: 1200px;
  // margin: -10vh auto 0;
  margin: 0 auto;
  min-height: calc(110vh - 400px + 24px - 50px);
  display: flex;
  flex-direction: column;
  // flex列
  .menuCol {
    margin-bottom: 20px;
    // height: calc(33% - 20px);
    // 卡片
    .menuCard {
      height: 100%;
      cursor: pointer;
      text-align: center;
      transition: all 0.3s ease;
      box-shadow: 0 0 1.5rem rgba(9, 41, 77, 0.12);
      border-radius: 10px;
      border: none;
      display: flex !important;
      align-items: center !important;
      justify-content: center;
      // 卡片内容：大屏布局从上到下，小屏从左到右
      /deep/.ant-card-body {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 20px;
        // 右上角的数量图标
        .menuCount {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          border-radius: 15px;
          background: #f00;
          color: #fff;
        }
        // 图片：大屏占卡片高度的50%，小屏占卡片宽度的的50%
        .imgBox {
          flex: 1 50%;
          overflow: hidden;
          img {
            height: 100%;
          }
        }
        // 卡片文本
        /deep/.ant-card-meta {
          flex: 1 50%;
          padding: 0 5px;
          display: flex;
          // align-items: center;
          .ant-card-meta-detail {
            width: 100%;
          }
          // 标题：大屏居中，小屏靠左
          /deep/.ant-card-meta-title {
            font-weight: 700;
            font-size: 18px;
            margin: 15px 0 0;
            line-height: 2;
          }
          // 详细内容：大屏最多两行，小屏最多四行
          /deep/.ant-card-meta-description {
            color: #727475;
            font-size: 13px;
            line-height: 1.5;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            text-align: center;
          }
        }
      }

      // 卡片悬浮效果
      &:hover {
        background-color: #4293f4;
        transform: translate3d(0, -0.3rem, 0);
        box-shadow: 0 0.25rem 1.25rem rgba(62, 151, 223, 0.3);
        /deep/.ant-card-meta-title {
          color: #fff;
        }
        /deep/.ant-card-meta-description {
          color: #fff !important;
        }
      }
    }
  }
}

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media screen and (max-width: 1600px) {
  // 卡片
  .menuCard {
    // 卡片内容
    /deep/.ant-card-body {
      flex-direction: row !important;
      height: auto !important;
      width: 100%;
      padding: 5px 10px !important;
      // 右上角的数量图标
      .menuCount {
        width: 20px !important;
        height: 20px !important;
        line-height: 20px !important;
        font-size: 14px;
        border-radius: 15px !important;
      }
      // 图片
      .imgBox {
        padding: 20px;
        flex: 1 40% !important;
        img {
          width: 100% !important;
          height: auto !important;
        }
      }
      /deep/.ant-card-meta {
        align-items: flex-start !important;
      }
      // 标题
      /deep/.ant-card-meta-title {
        text-align: left !important;
        padding-top: 15px;
      }
      // 详细信息
      /deep/.ant-card-meta-description {
        -webkit-line-clamp: 4 !important;
        text-align: left !important;
      }
    }
  }
}
.seamless-warp {
  height: 30px;
  overflow: hidden;
  font-size: 14px;
  line-height: 30px;
}
.seamless-warp2 {
  overflow: hidden;
  height: 25px;
  width: 1280px;
  ul.item {
    width: 580px;
    li {
      float: left;
      margin-right: 10px;
    }
  }
}
.white-font {
  font-size: 16px;
  color: white;
}
.my-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
  font-size: 16px;
  line-height: 30px;
}
/deep/ .ant-list-sm .ant-list-item {
  padding: 0;
}
.scroll-list-a {
  color: #fff;
}
.gif-img {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .myGis {
    width: 2em;
    height: 2em;
  }
  .myGisCup {
    animation-name: myGisCup;
    animation-duration: 1s;
    animation-direction: normal;
    animation-iteration-count: infinite;
    animation-timing-function: steps(3);
  }
  .my-img {
    height: 30px;
    width: 30px;
    margin-right: 30px;
  }
  .scale-up-left {
    -webkit-animation: scale-up-left 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) 0.5s infinite alternate both;
    animation: scale-up-left 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) 0.5s infinite alternate both;
  }
  @-webkit-keyframes scale-up-left {
    0% {
      -webkit-transform: scale(0.3);
      transform: scale(0.3);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
    }
    100% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
    }
  }
  @keyframes scale-up-left {
    0% {
      -webkit-transform: scale(0.3);
      transform: scale(0.3);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
    }
    100% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
    }
  }
}
</style>
