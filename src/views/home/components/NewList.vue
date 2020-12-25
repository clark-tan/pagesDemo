<!--
 * @Description: 首页信息流
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-09-11 11:02:58
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-12-08 20:13:09
-->
<!--  -->
<template>
  <div class="NewList">
    <a-card size="small" :bodyStyle="{ padding: 0 }">
      <template slot="title">
        <span class="titleBox">
          <CustomIcon :name="showListData.icon || 'onlineOfficeHall-gonggao'" class="iconClass" />{{
            showListData.title
          }}
        </span>
      </template>
      <template slot="extra">
        <router-link
          :to="{ name: showListData.tabUrlName }"
        ><a-button type="link" size="small"> <a-icon type="unordered-list" />更多 </a-button></router-link
        >
      </template>

      <div class="list">
        <slot />
        <a-list
          v-if="!showListData.loading"
          :style="{ minHeight: `${showLine * 36}px` }"
          :bordered="false"
          :split="false"
          :data-source="
            showListData.data && showListData.data.length >= showLine
              ? showListData.data.slice(0, showLine)
              : showListData.data
          "
        >
          <a-list-item slot="renderItem" slot-scope="item" @click="handleListItemClick(item)">
            <template slot="extra">
              <div class="listExtra">{{ item.extra }}</div>
            </template>
            <span class="span-ellipsis">
              <CustomIcon name="onlineOfficeHall-fangkuai" class="iconClass" /><a class="listText">{{ item.name }}</a>
            </span>
          </a-list-item>
        </a-list>
        <a-skeleton v-else :style="{ minHeight: `${showLine * 36}px` }" />
      </div>
    </a-card>
    <a-modal
      :visible="institutionsModal"
      @ok="institutionsModal = false"
      @cancel="institutionsModal = false"
      :title="institutionsInfo.title"
      :maskClosable="false"
      width="60vw"
      :bodyStyle="{ padding: 0 }"
    >
      <a-card
        :bordered="false"
        :headStyle="{ fontWeight: 'bold' }"
        :title="institutionsInfo.dwmc || '单位名称'"
        :loading="institutionsLoading"
      >
        <a-descriptions title="详细信息">
          <a-descriptions-item label="单位名称">
            {{ institutionsInfo.dwmc }}
          </a-descriptions-item>
          <a-descriptions-item label="单位性质">
            {{ institutionsInfo.dwxz }}
          </a-descriptions-item>
          <a-descriptions-item label="机构代码">
            {{ institutionsInfo.tyshxydm }}
          </a-descriptions-item>
          <a-descriptions-item label="联系电话">
            {{ institutionsInfo.yddh }}
          </a-descriptions-item>
          <a-descriptions-item label="联系人">
            {{ institutionsInfo.lxr }}
          </a-descriptions-item>
          <a-descriptions-item label="联系地址">
            {{ institutionsInfo.bgxxdz }}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="测绘信息" style="margin-top: 20px;">
          <a-descriptions-item label="法人代表">
            {{ institutionsInfo.frdb }}
          </a-descriptions-item>
          <a-descriptions-item label="资质等级" :span="2">
            {{ institutionsInfo.zzdj }}
          </a-descriptions-item>
          <a-descriptions-item label="资质证书编号">
            {{ institutionsInfo.zzzsbh }}
          </a-descriptions-item>
          <a-descriptions-item label="资质有效期止" :span="2">
            {{ institutionsInfo.zzyxqz }}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="经营范围" style="margin-top: 20px;">
          <a-descriptions-item label="描述" :span="3">
            {{ institutionsInfo.jyfw }}
          </a-descriptions-item>
          <a-descriptions-item label="主要成员" :span="3">
            {{ institutionsInfo.xms }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'NewList',
  components: {},
  props: {
    showListData: {
      default: () => {},
      type: Object,
      required: true
    },
    showLine: {
      default: 0,
      type: Number,
      required: true
    }
  },
  data () {
    return {
      institutionsModal: false,
      institutionsLoading: false,
      institutionsInfo: {}
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    handleListItemClick (item) {
      if (this.showListData.tabUrlName === 'YelloPages') {
        this.institutionsInfo = item
        this.institutionsModal = true
      } else {
        const params = {
          ...item
        }
        this.$emit('CommonMorePage', params)
        console.log(item)
        this.$router.push({
          name: 'CommonMore',
          params: {
            data: item,
            page: 1,
            pageSize: 1
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ a:link {
  color: red;
}
/deep/ a:visited {
  color: black;
}
.span-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.NewList {
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
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

    // 更多
    .ant-card-extra {
      padding: 0;
      display: flex;
      align-items: center;
      height: 16px;

      .ant-btn {
        color: #848484;

        &:hover {
          color: #1990ff;
        }
      }
    }
  }

  // 列表行
  .ant-list-item {
    padding: 15px 0 0;

    .iconClass,
    .listText {
      color: #404040;
    }

    .listExtra {
      padding-right: 8px;
    }

    &:hover {
      .iconClass,
      .listText,
      .listExtra {
        color: #1890ff;
      }
    }
  }
}
.iconClass {
  color: #1890ff;
  margin: 0 10px 0 5px;
}
/deep/ .ant-card-bordered {
  border: 0px solid #e8e8e8;
}
</style>
