<!--
 * @Description: 企业名录（黄页）
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-09-08 13:40:57
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-16 16:04:37
-->
<template>
  <a-layout class="guideLayout">
    <a-spin tip="正在加载..." :spinning="spinning" style="height: 100%">
      <div class="ShowYelloPages">
        <!-- titleCard -->
        <div class="my-card">
          <a-card style="width: 100%" size="small" :bordered="false">
            <template slot="title">
              <a-row>
                <a-col :span="6">
                  <a-card size="small" :bordered="false">
                    <div class="meta">
                      <div class="typeIconDiv"><CustomIcon :name="'onlineOfficeHall-zongji'" class="typeIcon" /></div>
                      <div class="title-meta">
                        <div class="meta-font">总计</div>
                        <div class="num-font">14</div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="6">
                  <a-card size="small" :bordered="false">
                    <div class="meta">
                      <div class="typeIconDiv">
                        <CustomIcon name="onlineOfficeHall-qiye" class="typeIcon" />
                      </div>
                      <div class="title-meta">
                        <div class="meta-font">企业</div>
                        <div class="num-font">14</div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="6">
                  <a-card size="small" :bordered="false">
                    <div class="meta">
                      <div class="typeIconDiv">
                        <CustomIcon name="onlineOfficeHall-shiyedanwei" class="typeIcon" />
                      </div>
                      <div class="title-meta">
                        <div class="meta-font">事业单位</div>
                        <div class="num-font">14</div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="6">
                  <a-card size="small" :bordered="false">
                    <div class="meta">
                      <div class="typeIconDiv">
                        <CustomIcon name="onlineOfficeHall-shehuizuzhi" class="typeIcon" />
                      </div>
                      <div class="title-meta">
                        <div class="meta-font">社会组织</div>
                        <div class="num-font">14</div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </template>

            <a-form-model
              ref="ruleForm"
              :model="form"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
              class="form"
            >
              <a-form-model-item
                label="服务机构名称"
                prop="fwjgmc"
                ref="fwjgmc"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 20 }"
              >
                <a-input-search
                  placeholder="请输入测绘服务机构名称"
                  enter-button="查询"
                  size="default"
                  v-model="form.fwjgmc"
                  @search="onSearch"
                />
              </a-form-model-item>

              <a-row>
                <a-col span="12">
                  <a-form-model-item label="机构类型" prop="jglx" ref="jglx">
                    <a-radio-group v-model="form.jglx" @change="jglxChange" button-style="solid">
                      <template v-for="(item, index) in searchField.jglx">
                        <a-radio-button :key="index" :value="item">
                          {{ item }}
                        </a-radio-button>
                      </template>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
                <a-col span="12">
                  <a-form-model-item label="归属地" prop="gsd" ref="gsd">
                    <a-cascader
                      v-model="form.gsd"
                      :options="searchField.gsd"
                      placeholder="请选择归属地"
                      @change="gsdChange"
                    />
                  </a-form-model-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col span="12">
                  <a-form-model-item label="单位资质" prop="dwzz" ref="dwzz">
                    <a-radio-group v-model="form.dwzz" @change="dwzzChange" button-style="solid">
                      <template v-for="(item, index) in searchField.dwzz">
                        <a-radio-button :key="index" :value="item"> {{ item }} </a-radio-button>
                      </template>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
                <a-col span="12">
                  <a-form-model-item label="入驻时间" prop="rzsj" ref="rzsj">
                    <!-- <a-date-picker v-model="form.rzsj" @change="rzsjChange" dateFormat="YYYY-MM-DD HH:mm:ss" /> -->
                    <a-range-picker @change="handleDatePicker" :format="'YYYY-MM-DD'" />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </a-card>
        </div>

        <!-- TODO: components -->
        <page-table :formData="transferForm" />
        <!-- <a-empty v-else /> -->
      </div>
    </a-spin>
    <a-back-top />
  </a-layout>
</template>

<script>
import moment from 'moment'
import PageTable from './components/pageTable'
export default {
  name: 'YelloPages',
  components: {
    PageTable
  },
  data () {
    return {
      cardTitle: {
        total: 71,
        qy: 38,
        sydw: 19,
        shzz: 14
      },
      form: {
        jglx: '不限',
        fwjgmc: '',
        gsd: [],
        dwzz: '不限',
        // rzsj: moment(this.getNowFormatDate(), 'YYYY-MM-DD HH:mm:ss')
        dateStart: '',
        dateEnd: ''
      },
      searchField: {
        jglx: ['不限', '企业', '事业单位', '社会组织'],
        gsd: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake'
                  }
                ]
              }
            ]
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men'
                  }
                ]
              }
            ]
          }
        ],
        dwzz: ['不限', '甲级', '乙级']
      },
      spinning: false,
      transferForm: {}
    }
  },
  created () {
    // if (this.$route.params.page) {
    //   this.pagination.current = this.$route.params.page
    //   this.pagination.pageSize = this.$route.params.pageSize
    // }
  },
  methods: {
    moment,
    // 查询
    getNowFormatDate () {
      const date = new Date()
      const seperator1 = '-'
      const seperator2 = ':'
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      const currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        ' ' +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds()
      return currentdate
    },
    getCurrentStyle (current, today) {
      const style = {}
      if (current.date() === 1) {
        style.border = '1px solid #1890ff'
        style.borderRadius = '50%'
      }
      return style
    },
    onSearch (value) {
      this.transferForm = this.form
    },
    jglxChange () {
      this.transferForm = this.form
    },
    gsdChange () {
      this.transferForm = this.form
    },
    dwzzChange () {
      this.transferForm = this.form
    },
    rzsjChange (date, dateString) {
      this.transferForm = this.form
    },
    handleDatePicker (date, dateString) {
      this.form.dateStart = dateString[0]
      this.form.dateEnd = dateString[1]
      this.transferForm = this.form
    }
  }
}
</script>

<style scoped lang="less">
.guideLayout {
  background-color: #fff;
  flex: 1;
  padding: 20px;
  .ShowYelloPages {
    height: 100%;
    background-color: @diy-global-bg-color;
    display: flex;
    flex-direction: column;
    width: 100%;
    .my-card {
      height: 275px;
      box-shadow: 0 0 9px -3px #999;
    }
  }
}
.meta {
  display: flex;
  justify-content: center;
  .typeIconDiv {
    margin-right: 25px;
    .typeIcon {
      font-size: 60px;
    }
  }
  .title-meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .meta-font {
      width: 53px;
      height: 14px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #404040;
      line-height: 40px;
      margin-bottom: 12px;
    }
    .num-font {
      width: 53px;
      height: 30px;
      font-size: 30px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #1890ff;
      line-height: 40px;
    }
  }
}
/deep/ .ant-form-item {
  margin-bottom: 10px;
}
/deep/ .ant-card-head {
  border-bottom: 0 solid #e8e8e8;
}
/deep/ .ant-pagination-options-size-changer.ant-select {
  margin-right: 0;
}
</style>
