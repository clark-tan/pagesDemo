<!--
 * @Description: 信用公示的详情
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-19 09:51:45
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-10 16:33:10
-->
<template>
  <div class="creditPublicityMoreLayout">
    <a-button @click="handleBack" style="margin: 5px"><a-icon type="left" />返回</a-button>
    <h2 class="notice-title">{{ pageData.name || '' }}</h2>
    <div class="notice-createUser">
      <span class="timeClass">
        <template v-if="pageData.fbr && !_.isEmpty(pageData.fbr)">来源：{{ pageData.fbr }} &nbsp;&nbsp; </template>
        <template v-if="pageData.fbsj && !_.isEmpty(pageData.fbsj)">发布时间：{{ pageData.fbsj }}</template>
      </span>
    </div>
    <a-divider />
    <div class="diyEdit">
      <editor :inline="true" :initial-value="pageData.markdown || ''" :disabled="true" :init="init" />
    </div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import BackBtn from '@/components/BackBtn/BackBtn'
export default {
  name: 'CreditPublicityDetail',
  components: {
    editor: Editor,
    BackBtn
  },
  props: {
    moreData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      data: {},
      init: {
        height: 400,
        branding: false,
        menubar: false
      },
      backPageNum: 1,
      pageSize: 10,
      pageData: this.moreData.data
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    handleBack () {
      this.$emit('backList', {
        page: this.moreData.page,
        pageSize: this.moreData.pageSize
      })
    }
  }
}
</script>
<style lang="less" scoped>
.notice-title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: #5a5a5a;
}
.notice-createUser {
  width: 100%;
  text-align: center;
}
.timeClass {
  font-size: 12px;
  color: #9a9a9a;
}
.diyEdit {
  padding: 0 40px 20px 40px;
}
.creditPublicityMoreLayout {
  background-color: #fff;
  height: 100%;
}
</style>
