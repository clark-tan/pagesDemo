<!--
 * @Autor: junhui li
 * @Date: 2020-11-25 13:40:39
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-16 14:38:16
 * @Description:
-->
<template>
  <div>
    <template v-for="(item, index) in openInfoData">
      <a-col :key="index" :span="8">
        <div class="cardMap">
          <a-card size="small">
            <a-tooltip>
              <template slot="title">
                {{ item.name }}
              </template>
              <div class="titleBorder">
                <span class="cardTitle">{{ item.name }} </span>
              </div>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                {{ item.address || '-' }}
              </template>
              <div class="cardInfo">
                <a @click="go2Address(item)">
                  <span
                    class="ellipsis"
                  ><CustomIcon name="onlineOfficeHall-address" class="userBtn" />{{ item.address || '-' }}</span
                  >
                </a>
              </div>
            </a-tooltip>
            <div class="cardInfo"><CustomIcon name="onlineOfficeHall-yuyue" class="userBtn" />{{ item.servertime || '-' }}</div>
            <div class="cardInfo"><CustomIcon name="onlineOfficeHall-phone" class="userBtn" />{{ item.telephone || '-' }}</div>
            <div class="cardInfo">
              <CustomIcon name="onlineOfficeHall-email" class="userBtn" />{{ item.postcode || '-' }}
            </div>
            <a-tooltip>
              <template slot="title">
                {{ item.url || '-' }}
              </template>
              <div class="cardInfo" :title="item.url || '-'">
                <a
                  :href="item.url"
                  target="_blank"
                ><CustomIcon name="onlineOfficeHall-wangzhi_huaban" class="userBtn" />{{ item.url || '-' }}</a
                >
              </div>
            </a-tooltip>
          </a-card>
        </div>
      </a-col>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data () {
    return {
      openInfoData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$WebApi.contact['GetContactUsInfo']()
        .then(res => {
          this.openInfoData = res.rowsList
        })
        .catch(err => {
          console.log(err)
        })
    },
    go2Address (item) {
      this.$store.commit('SET_CONTACT_ITEM', item)
      this.$store.commit('CHANGE_MAP_MODEL_STATE', true)
    }
  }
}
</script>

<style scoped lang="less">
.cardMap {
  margin: 30px 0 0 30px;
  box-shadow: 0 0 9px -3px #999;
  .titleBorder {
    border-left: 4px solid rgba(24, 144, 255);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
    .cardTitle {
      margin-left: 10px;
      font-size: 18px;
      font-weight: bold;
      color: rgba(89, 89, 89, 1);
    }
  }
  .cardInfo {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 2px 6px 0;
  }
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.userBtn {
  margin: 4px 10px 0 0px;
  font-size: 14px;
  float: left;
}
/deep/ .ant-card-head {
  border-bottom: 0 solid #e8e8e8;
}
</style>
