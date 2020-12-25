<!--
 * @Description: 合并表格 Ant Design Table 封装
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-25 11:54:11
 * @LastEditors: clark tan
 * @LastEditTime: 2020-11-11 14:20:01
-->

<template>
  <div>
    <!-- <a-table :columns="columns2" :data-source="data" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
  </a-table> -->
    <UploadTable :tableData="tableData"></UploadTable>
  </div>
</template>

<script>
import UploadTable from '@/views/common/UploadTable.vue'
import { mapGetters } from 'vuex'
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  }
  if (index === 4) {
    obj.attrs.colSpan = 0
  }
  return obj
}

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 11,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 22,
    address: 'London No. 2 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 33,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 3 Lake Park'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 44,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 4 Lake Park'
  },
  {
    key: '5',
    name: 'Jake White',
    age: 55,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 5 Lake Park'
  }
]
export default {
  name: 'MergeTable',
  components: { UploadTable },
  props: {},
  data () {
    const columns = [
      {
        title: 'Name',
        colSpan: 2,
        dataIndex: 'name',
        customRender: (text, row, index) => {
          if (index < 2) {
            return {
              children: <a href="javascript:;">{text}</a>,
              attrs: {
                colSpan: 1
              }
            }
          }
          if (index === 2) {
            return {
              children: <a href="javascript:;">{text}hehe</a>,
              attrs: {
                colSpan: 1,
                rowSpan: 2
              }
            }
          }
          if (index === 3) {
            return {
              children: <a href="javascript:;">{text}hehe</a>,
              attrs: {
                colSpan: 1,
                rowSpan: 0
              }
            }
          }
          return {
            children: <a href="javascript:;">{text}</a>,
            attrs: {
              colSpan: 5
            }
          }
        }
      },
      {
        title: 'Age',
        colSpan: 0,
        dataIndex: 'age',
        customRender: (text, row, index) => {
          switch (index) {
            case index:
              return {
                children: text,
                attrs: {
                  colSpan: 1,
                  rowSpan: 1
                }
              }
            default:
          }
        }
      },
      {
        title: 'Home phone',
        colSpan: 2,
        dataIndex: 'tel',
        customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {}
          }
          if (index === 2) {
            obj.attrs.rowSpan = 2
          }
          // These two are merged into above cell
          if (index === 3) {
            obj.attrs.rowSpan = 0
          }
          if (index === 4) {
            obj.attrs.colSpan = 0
          }
          return obj
        }
      },
      {
        title: 'Phone',
        colSpan: 0,
        dataIndex: 'phone',
        customRender: renderContent
      },
      {
        title: 'Address',
        dataIndex: 'address',
        customRender: renderContent
      }
    ]
    return {
      data,
      columns,
      columns2: [],
      InputColumns: [
        {
          title: 'Name',
          colSpan: 1,
          key: 'name',
          properties: [
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            }
          ]
        },
        {
          title: 'Age',
          colSpan: 1,
          key: 'age',
          properties: [
            {
              colSpan: 1,
              rowSpan: 2
            },
            {
              colSpan: 1,
              rowSpan: 0
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 2
            },
            {
              colSpan: 1,
              rowSpan: 0
            }
          ]
        },
        {
          title: 'Home phone',
          colSpan: 1,
          key: 'tel',
          properties: [
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            }
          ]
        },
        {
          title: 'Phone',
          colSpan: 1,
          key: 'phone',
          properties: [
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            }
          ]
        },
        {
          title: 'Address',
          colSpan: 1,
          key: 'address',
          properties: [
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            },
            {
              colSpan: 1,
              rowSpan: 1
            }
          ]
        }
      ],
      tableData: {}
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  watch: {},
  created () {
    this.QueryEntrust()
  },
  mounted () {
    this.columns2 = this.addAtt2Col(this.InputColumns)
    // console.log(this.columns2)
  },
  methods: {
    // type 1代表预受理，2代表正式受理,3材料补充,4代表查看上传报告的数据（苏州）,5满意度评价
    QueryEntrust () {
      this.$WebApi.busiProcess['QueryEntrust']({
        userid: this.user.userID
      })
        .then(res => {
          this.tableData = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    addAtt2Col (InputColumns) {
      return InputColumns.map((items, indexs) => {
        return {
          title: items['title'],
          colSpan: items['colSpan'],
          key: items['key'],
          dataIndex: items['key'],
          customRender: (text, row, index) => {
            switch (index) {
              case index:
                return {
                  children: text,
                  attrs: {
                    colSpan: items['properties'][index]['colSpan'],
                    rowSpan: items['properties'][index]['rowSpan']
                  }
                }
              default:
                return {
                  children: text,
                  attrs: {
                    colSpan: 1,
                    rowSpan: 1
                  }
                }
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
