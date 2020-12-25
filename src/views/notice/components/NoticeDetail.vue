<!--
 * @Description:
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-19 09:51:45
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-22 16:14:43
-->
<template>
  <div class="noticeMoreLayout">
    <a-button @click="handleBack" style="margin: 5px"><a-icon type="left" />返回</a-button>
    <h2 class="notice-title">{{ data.bt || '' }}</h2>
    <div class="notice-createUser">
      <span class="timeClass">{{ data.fbsj }}</span>
    </div>
    <a-divider />
    <div class="diyEdit">
      <editor
        :inline="true"
        :initial-value="data.tznr"
        :disabled="true"
        :init="init"
        class="editor"
      />
    </div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import BackBtn from '@/components/BackBtn/BackBtn'
export default {
  name: 'NoticeMore',
  components: {
    editor: Editor,
    BackBtn
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
      pageSize: 10
    }
  },
  props: {
    moreData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
    if (this.moreData.data) {
      this.data = this.moreData.data
      this.backPageNum = this.moreData.page
      this.pageSize = this.moreData.pageSize
    } else {
      this.data = { TITLE: '', CREATEUSER: '', CREATETIME: '' }
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    handleBack () {
      this.$emit('backList', {
        page: this.backPageNum,
        pageSize: this.pageSize
      })
    }
  }
}
</script>
<style lang="less" scoped>
.noticeMoreLayout {
  background-color: #fff;
  height: 100%;

  .notice-title {
    text-align: center;
    font-size: 22px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #595959;
  }

  .notice-createUser {
    width: 100%;
    text-align: center;
  }

  .timeClass {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #999999;
    line-height: 24px;
  }
}
</style>
