<!--
 * @Description: 首页
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-09-11 09:28:18
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-25 10:48:41
-->
<!--  -->
<template>
  <div class="ShowMain">
    <template v-if="showMore === false">
      <div class="up-content">
        <a-row :gutter="20" style="height: 100%">
          <!-- 轮播图 -->
          <a-col :span="12" style="height: 100%">
            <swiper ref="mySwiper" :options="swiperOptions" @someSwiperEvent="swiperCallback">
              <template v-for="(item, index) in swipData">
                <swiper-slide :key="index">
                  <div class="imgBox">
                    <img :src="item.picture[0].url" :alt="item.p_name" class="img" @click="imgClick(item)" />
                  </div>
                  <div class="swiperFont">
                    <div class="swiperOp">{{ item.p_name }}</div>
                  </div>
                </swiper-slide>
              </template>
              <div v-for="(item, index) in swipData" :key="index" class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </a-col>
          <!-- 列表 -->
          <a-col :span="12" style="height: 100%">
            <div>
              <NewList :showListData="noticeData" :showLine="5" @CommonMorePage="go2CommonMore"></NewList>
            </div>
            <div style="margin-top: 50px">
              <NewList :showListData="guideData" :showLine="5" @CommonMorePage="go2CommonMore"></NewList>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="center-content">
        <a-row :gutter="30" style="height: calc(100% + 1px)">
          <!-- 中间-左 -->
          <a-col :span="8" style="height: 100%">
            <div class="center-left-content">
              <a-card size="small" :bodyStyle="{ padding: 0 }" :bordered="false">
                <!-- 头部 -->
                <template slot="title">
                  <span class="titleBox">
                    <CustomIcon :name="workServiceData.icon || 'onlineOfficeHall-gonggao'" class="iconClass" />{{
                      workServiceData.title
                    }}
                  </span>
                </template>
                <!-- 内容 -->
                <a-row :gutter="30" style="margin-top: 30px" type="flex" justify="space-between">
                  <a-col
                    :span="12"
                    style="text-align: center"
                  ><a-button
                    style="
                      background: url(/home/iconBg1.png);
                      background-size: cover;
                      border-color: #d69a63;
                      height: 132px;
                    "
                    type="primary"
                    @click="go2Url(workServiceData.data[1] || '')"
                  >
                    <CustomIcon :name="'onlineOfficeHall-cehuiyudili'" class="iconButtonClass" />
                    <div style="margin: 10px 0 20px">{{ workServiceData.data[1].label || '联系我们' }}</div>
                  </a-button></a-col
                  >
                  <a-col
                    :span="12"
                    style="text-align: center"
                  >
                    <a-button
                      style="
                      background: url(/home/iconBg2.png);
                      background-size: cover;
                      border-color: #93be60;
                      height: 132px;
                    "
                      type="primary"
                      @click="()=>{surveyingUnitRegisterModel=true}"
                    >
                      <!-- @click="go2Url(workServiceData.data[2] || '')" -->
                      <CustomIcon :name="'onlineOfficeHall-bumen'" class="iconButtonClass" />
                      <div style="margin: 10px 0 20px">{{ workServiceData.data[2].label || '测绘机构入口' }}</div>
                    </a-button>
                    <a-modal v-model="surveyingUnitRegisterModel" width="450px" :mask="false" centered :footer="null">
                      <a-col class="turnBox">
                        <a-button
                          class="turnBtn"
                          type="primary"
                          shape="round"
                          style="
                            background-color: #9ECA69;
                            border-color: #9ECA69;
                          "
                          @click="turnSys"
                        >
                          <CustomIcon :name="'onlineOfficeHall-iconzhengli_tiaozhuan'" class="iconButtonClass" />
                          <div style="margin: 10px 0 20px">跳转系统</div>
                        </a-button>
                        <a-button
                          type="primary"
                          class="turnBtn"
                          shape="round"
                          @click="turnSurveyingUnitRegister"
                        >
                          <CustomIcon :name="'onlineOfficeHall-zhuce'" class="iconButtonClass" />
                          <div style="margin: 10px 0 20px">测绘单位注册</div>
                        </a-button>
                      </a-col>
                    </a-modal>
                  </a-col>
                </a-row>
                <a-row
                  style="text-align: center; margin-top: 30px"
                ><a-button
                  type="primary"
                  style="
                    background: url(/home/iconBg3.png);
                    background-size: cover;
                    border-color: #93be60;
                    height: 60px;
                  "
                >{{ workServiceData.data[0].label || '多测合一项目管理平台' }}</a-button
                ></a-row
                >
              </a-card>
            </div>
          </a-col>
          <!-- 中间-右 -->
          <a-col :span="16">
            <div class="commonListCol">
              <NewList :showListData="policiesAndRegulationsData" :showLine="7" @CommonMorePage="go2CommonMore"></NewList>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="footer-content">
        <a-row :gutter="30" style="height: 100%">
          <a-col :span="12" style="height: 100%">
            <div class="commonListCol">
              <NewList :showListData="mlkData" :showLine="7" @CommonMorePage="go2CommonMore">
                <div style="height: 3px"></div
                ></NewList>
            </div>
          </a-col>
          <a-col :span="12" style="height: 100%">
            <div class="commonListCol">
              <NewList :showListData="creditData" :showLine="6" @CommonMorePage="go2CommonMore">
                <div class="footerListBtn">
                  <a-button
                    v-for="btn in creditData.typeList"
                    :key="btn.value"
                    type="link"
                    :class="[btn.value === creditData.curType && 'active']"
                    ghost
                    size="small"
                    @click="handleCreditTypeChange(btn.value)"
                  >
                    {{ btn.label }}
                  </a-button>
                </div>
              </NewList>
            </div>
          </a-col>
        </a-row>
      </div>
    </template>
    <template v-else>
      <CommonMore :pageData="pageData"></CommonMore>
    </template>
  </div>
</template>

<script>
import NewList from './components/NewList'
import CommonMore from './components/CommonMore'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'TopMenuHome',
  components: { Swiper, SwiperSlide, NewList, CommonMore },
  props: {},
  data () {
    return {
      pageData: {},
      showMore: false,
      swipData: [
        {
          picture: [
            {
              url: ''
            }
          ],
          p_name: '德玛西亚'
        },
        {
          picture: [
            {
              url: ''
            }
          ],
          p_name: '德玛西亚2'
        },
        {
          picture: [
            {
              url: ''
            }
          ],
          p_name: '德玛西亚3'
        }
      ],
      swiperOptions: {
        // 分页器配置
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets'
        },
        // 设定初始化时slide的索引
        initialSlide: 0,
        // Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
        direction: 'horizontal',
        // 自动切换图配置
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        // 箭头配置
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // 环状轮播
        loop: true
      },
      showListData: [
        {
          label: '新闻标题3',
          createTime: '2020/09/09'
        },
        {
          label: '新闻标题4',
          createTime: '2024/08/08'
        },
        {
          label: '新闻标题4新闻标题4新闻标题4新闻标题4新闻标题4新闻标题4新闻标题4新闻标题4新闻标题4',
          createTime: '2024/08/08'
        },
        {
          label: '2323232新闻标题4新闻标题4新闻标题4新闻标题4新闻标题4新闻标题4新闻标题4新闻标题4新闻标题4',
          createTime: '2024/08/08'
        }
      ],
      noticeData: {
        title: '通知公告',
        icon: 'onlineOfficeHall-gonggao',
        tabUrlName: 'Notice',
        data: [],
        morePageName: 'Notice',
        loading: true
      },
      guideData: {
        title: '办事指南',
        icon: 'onlineOfficeHall-zhinan',
        tabUrlName: 'Guidelines',
        data: [],
        morePageName: 'Guidelines',
        loading: true
      },
      policiesAndRegulationsData: {
        title: '政策法规',
        icon: 'onlineOfficeHall-zhengcefagui',
        tabUrlName: 'PoliciesAndRegulations',
        data: [],
        morePageName: 'PoliciesAndRegulations',
        loading: true
      },
      mlkData: {
        title: '测绘单位信息',
        icon: 'onlineOfficeHall-mulu',
        tabUrlName: 'YelloPages',
        data: [],
        morePageName: 'YelloPages',
        loading: true
      },
      creditData: {
        title: '信用公示',
        icon: 'onlineOfficeHall-xinyong',
        tabUrlName: 'SatisfactionEvaluation',
        data: [],
        morePageName: 'CreditPublicity',
        loading: true,
        typeList: [
          {
            label: '信用评价',
            value: '1'
          },
          {
            label: '黑名单',
            value: '2'
          }
        ],
        curType: '1'
      },
      workServiceData: {
        title: '办事服务',
        icon: 'onlineOfficeHall-fuwu',
        data: [
          {
            label: ''
          },
          {
            label: ''
          },
          {
            label: ''
          }
        ]
      },
      swipMoreData: {},
      surveyingUnitRegisterModel: false
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  watch: {
    '$store.state.home.showMore': function (val) {
      this.showMore = val
    }
  },
  created () {},
  mounted () {
    this.getNoticeData()
    this.getGuideData()
    this.getPoliciesAndRegulationsData()
    this.getMlkData()
    this.getCreditData()
    this.getWorkServiceData()
    this.getLbtData()
  },
  methods: {
    go2CommonMore (params) {
      this.showMore = true
      this.pageData = params
    },
    imgClick (item) {
      console.log(item)
      this.getLbtMoreData(item.sys_parentrid)
    },
    swiperCallback (e) {
      console.log(e)
    },
    getNoticeData () {
      this.noticeData.loading = true
      this.$WebApi.notice['NoticeList']({
        bt: ''
      })
        .then(data => {
          const temp = data.rowsList
          this.noticeData.data = temp.map((item, index) => {
            return {
              ...item,
              name: item.bt,
              extra: item.fbsj.split(' ')[0],
              markdown: item.tznr
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.noticeData.loading = false
        })
    },
    getGuideData () {
      this.guideData.loading = true
      this.$WebApi.guide['GetBusinessGuideInfo']({})
        .then(data => {
          const temp = data.rowsList
          this.guideData.data = temp.map((item, index) => {
            return {
              ...item,
              name: item.bt,
              extra: item.fbsj.split(' ')[0],
              markdown: item.bszn
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.guideData.loading = false
        })
    },
    getPoliciesAndRegulationsData () {
      this.policiesAndRegulationsData.loading = true
      this.$WebApi.policiesAndRegulations['PoliciesAndRegulationsList']({
        bt: ''
      })
        .then(data => {
          const temp = data.rowsList
          this.policiesAndRegulationsData.data = temp.map((item, index) => {
            return {
              ...item,
              name: item.bt,
              extra: item.fbsj.split(' ')[0],
              markdown: item.PoliciesAndRegulations
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.policiesAndRegulationsData.loading = false
        })
    },
    getMlkData () {
      this.mlkData.loading = true
      this.$WebApi.chdw['SurveyInstitutionsList']({
        page: 1,
        size: 20
      })
        .then(data => {
          const temp = data.rowsList
          this.mlkData.data = temp.map((item, index) => {
            return {
              ...item,
              name: '【' + item.zcdzsf + ',' + item.zcdzs + '】' + item.dwmc,
              extra: item.clrq,
              markdown: null
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.mlkData.loading = false
        })
    },
    getCreditData () {
      this.creditData.loading = true
      this.$WebApi.credit['getUnitCreditListLike']({})
        .then(data => {
          const temp = data.rowsList
          this.creditData.data = temp.map((item, index) => {
            return {
              ...item,
              name: '【' + item.address + '】' + item.name,
              extra: Number(item.all_score) * 20 + '分',
              markdown: item.blackmark
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.creditData.loading = false
        })
    },
    getWorkServiceData () {
      console.log('调用获取配置函数')
      this.$WebApi.home['GetWorkService']({
        id: 'web_bsfw'
      })
        .then(data => {
          this.workServiceData.data = data.rowsList
        })
        .catch(err => {
          console.log(err)
        })
    },
    getLbtData () {
      this.$WebApi.home['GetCarousel']({
        showindex: true
      })
        .then(data => {
          this.swipData = data.rowsList
        })
        .catch(err => {
          console.log(err)
        })
    },
    getLbtMoreData (pid) {
      this.$WebApi.home['GetCarouselDetail']({
        pid: pid
      })
        .then(data => {
          const object = data.rowsList[0]
          for (const key in object) {
            if (object.hasOwnProperty(key)) {
              if (key === 'bt') {
                object['name'] = object[key]
              }
              if (key === 'tznr' || key === 'bszn' || key === 'PoliciesAndRegulations') {
                object['markdown'] = object[key]
              }
            }
          }
          this.$router.push({
            name: 'CommonMore',
            params: {
              data: object,
              page: 1,
              pageSize: 1
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleListItemClick () {},
    go2Url (item) {
      window.open(item.url, '_blank')
    },
    handleCreditTypeChange (type) {
      this.creditData.curType = type
      this.getCreditData()
    },
    turnSys () {
      window.open('http://192.168.10.26/mainProject/login.html?scode=web')
      this.surveyingUnitRegisterModel = false
    },
    turnSurveyingUnitRegister () {
      this.$router.push('/surveyingUnit/UnitCheckIn')
      this.surveyingUnitRegisterModel = false
    }
  }
}
</script>

<style scoped lang="less">
.ShowMain {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .up-content {
    height: 540px;
    background: #fff;
    box-shadow: 0 0 1.5rem rgba(9, 41, 77, 0.12);
    padding: 35px 20px 0 30px;
  }
  .commonListCol {
    padding: 20px 24px 30px;
    box-shadow: 0 0 1.5rem rgba(9, 41, 77, 0.12);
    background: #fff;
  }
  .center-content {
    margin: 30px 0 0 0;

    .center-left-content {
      padding: 20px 24px 30px;
      box-shadow: 0 0 1.5rem rgba(9, 41, 77, 0.12);
      background: #fff;

      // 头部
      /deep/ .ant-card-head {
        min-height: unset;
        height: 31px;
        padding: 0;

        // 标题文本
        .ant-card-head-title {
          font-weight: bold;
          font-size: 16px;
          color: #1890ff;
          padding: 0 !important;

          .titleBox {
            border-bottom: 3px solid #1890ff;
            padding-right: 5px;
            height: 31px;
            display: inline-block;
          }
        }

        .iconClass {
          color: #1890ff;
          margin: 0 10px 0 5px;
        }
      }

      // 内容按钮
      .ant-btn-primary {
        height: 40px;
        background-color: #548fc8;
        border-color: #548fc8;
        width: 100%;
        height: 100%;
        font-weight: 500;
        font-size: 18px;
      }
    }
  }
  .footer-content {
    margin: 30px 0 10px;

    .footerListBtn {
      height: 39px;
      display: flex;
      align-items: flex-end;

      .ant-btn + .ant-btn {
        margin-left: 15px;
      }

      .ant-btn-link {
        color: #848484;

        &:hover {
          color: #1990ff;
        }

        &.active {
          color: #1990ff;
          border-color: #1990ff;
        }
      }
    }
  }
}
/deep/ .swiper-container {
  height: 100%;

  .imgBox {
    width: 100%;
    height: 470px;
    background: #ccc;

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .swiperFont {
    position: absolute;
    bottom: 35px;
    width: 100%;
    height: 50px;
    background: #20262b;
    opacity: 0.8;
    display: flex;
    align-items: center;
    padding-left: 18px;
    .swiperOp {
      color: #fff;
      font-size: 18px;
      font-weight: 400;
    }
  }
}

.iconButtonClass {
  height: 60px;
  width: 60px;
  margin-top: 10px;
}
.swiper-button-prev,
.swiper-button-next {
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }
}

.turnBox {
  display: flex;
  justify-content: space-around;

  .turnBtn {
    width: 159px;
    height: 132px;
  }
}
</style>
