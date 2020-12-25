<!--
 * @Description: CommonMore 首页公用详情模块
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-19 09:51:45
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-18 11:43:34
-->
<template>
  <div class="noticeMoreLayout">
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
    <div v-if="pageData.fj" style="margin-left: 20px">
      <h3>附件下载:</h3>
      <a-list item-layout="horizontal" :data-source="pageData.fj" style="margin-left:30px;">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta>
            <a
              slot="title"
              href="javascript:void(0)"
              @click="downloadFj(item.url)"
              style="color: #1990FF;"
            ><a-icon type="download" />{{ item.name }}</a
            >
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import BackBtn from '@/components/BackBtn/BackBtn'
export default {
  name: 'CommonMore',
  components: {
    editor: Editor,
    BackBtn
  },
  props: {
    pageData: {
      type: Object,
      default: () => {
        return { name: '', is_blacklist: '', all_score: '' }
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
      pageSize: 10
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    handleBack () {
      this.$store.commit('CHANGE_SHOW_MORE', false)
      this.$router.push({
        name: 'home'
      })
    },
    downloadFj (url) {
      window.open(url)
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
.noticeMoreLayout {
  background-color: #fff;
  height: 100%;
}
</style>
