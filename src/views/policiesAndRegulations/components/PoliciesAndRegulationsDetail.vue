<!--
 * @Description: 政策法规详情
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-05-19 09:51:45
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-22 15:25:25
-->
<template>
  <div class="guideMoreLayout">
    <a-button @click="handleBack" style="margin: 5px"><a-icon type="left" />返回</a-button>
    <h2 class="guide-title">{{ data.bt || '' }}</h2>
    <div class="guide-createUser">
      <span class="timeClass">{{ data.fbsj }}</span>
    </div>
    <a-divider />
    <div class="diyEdit">
      <editor
        :inline="true"
        :initial-value="data.zcfg"
        :disabled="true"
        :init="init"
        class="editor"
      />
    </div>
    <div v-if="data.fj">
      <h2>附件下载:</h2>
      <a-list item-layout="horizontal" :data-source="data.fj" style="margin-left:30px;">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta>
            <a slot="title" href="javascript:void(0)" @click="downloadFj(item.url)" style="color: #1990FF;"><a-icon type="download" />{{ item.name }}</a>
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
  name: 'PoliciesAndRegulationsDetail',
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
    },
    downloadFj (url) {
      window.open(url)
    }
  }
}
</script>
<style lang="less" scoped>
.guideMoreLayout {
  background-color: #fff;
  height: 100%;

  .guide-title {
    text-align: center;
    font-size: 22px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #595959;
  }

  .guide-createUser {
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

  .diyEdit {
    padding: 0 40px 20px 40px;

    .editor {
      text-indent:2em;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #595959;
      line-height: 30px;
    }
  }
}
</style>
