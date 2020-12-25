<!--
 * @Description: 需要显示的公约或者协议
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-07-17 09:17:21
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-09-03 16:51:50
-->

<!--  -->
<template>
  <div class="protocol">
    <a-spin :spinning="spinning" :delay="delayTime">
      <div class="top">
        <div class="DKBT">{{ protocolRowslist.DKBT }}</div>
        <div class="DYBFSM suojin">{{ protocolRowslist.DYBFSM }}</div>
        <div class="DEBFSMBT">{{ protocolRowslist.DEBFSMBT }}：</div>
        <div class="DSBFSM"><a-icon type="info-circle" /> {{ protocolRowslist.DSBFSM }}</div>
      </div>
      <div
        class="content"
        :style="{
          maxHeight: clientHeight ? clientHeight - 250 + 'px' : '100%'
        }"
      >
        <div class="CXTABLE1 suojin">
          <a-list bordered :data-source="protocolRowslist.CXTABLE1">
            <a-list-item slot="renderItem" slot-scope="item">
              {{ item.value }}
            </a-list-item>
          </a-list>
        </div>
      </div>
      <div class="footer">
        <div>
          <a-checkbox @change="onChange">
            {{ protocolRowslist.GXKWZ }}
          </a-checkbox>
        </div>
        <div class="button">
          <a-button
            @click="handleYY"
            :disabled="!(isChecked && numTime <= 0)"
          >我要预约业务
            <template v-if="numTime > 0">({{ numTime }}s)</template>
          </a-button>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { tableUtils } from '@/utils/index'
export default {
  name: 'ShowProtocol',
  components: {},
  props: {},
  data () {
    return {
      clientHeight: null,
      protocolData: '',
      protocolRowslist: [],
      isChecked: false,
      spinning: false,
      delayTime: 0,
      numTime: 5
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.GetEntrustDesc()
    this.changeNum()
    console.log(this.$parent.$el.clientHeight)
    this.clientHeight = this.$parent.$el.clientHeight
    console.log(this)
  },
  methods: {
    // 业务委托说明_小程序版
    GetEntrustDesc () {
      this.spinning = true
      this.$WebApi.preBusiness['GetEntrustDesc']()
        .then(res => {
          // this.WTS = res.rowsList[0]
          console.log(res)
          this.protocolRowslist = res.rowsList[0]
          this.protocolData = tableUtils.table2Desc(res)
          console.log(this.protocolData)
          // this.$set(this.inData, 'projectList', res.rows)
          // this.inData.projectList = res.rows
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.spinning = false
        })
    },
    onChange (e) {
      this.isChecked = e.target.checked
    },
    handleYY () {
      this.$emit('currentStepOK', {
        componentName: 'ShowProtocol',
        num: 1
      })
    },
    changeNum () {
      setInterval(() => {
        if (this.numTime > 0) {
          this.numTime--
        } else {
          return false
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
.protocol {
  color: rgba(51, 51, 51, 1);
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  .top {
    height: 150px;
  }
  .content {
    flex: 1;
    background: #f4f4f4;
    overflow: auto;
  }
  .footer {
    margin-top: 10px;
    height: 70px;
  }
}

/deep/ .ant-list-bordered .ant-list-item {
  padding-right: 0;
  padding-left: 0;
  border-bottom: 0px solid #e8e8e8;
}
/deep/ .ant-list-bordered {
  border: 0px solid #d9d9d9;
}
.DKBT {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
}
.DYBFSM {
  margin: 10px 0;
}
.DEBFSMBT {
  font-weight: bold;
  font-size: 16px;
}
.DSBFSM {
  color: red;
}
.CXTABLE1 {
  margin: 10px;
  background: rgba(244, 244, 244, 1);
  height: 100%;
  overflow: auto;
}
.suojin {
  text-indent: 2em;
}
.button {
  text-align: center;
}
</style>
