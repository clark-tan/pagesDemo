<template>
  <a-cascader
    v-model="newValue"
    :options="options"
    :load-data="loadData"
    placeholder="请选择"
    @change="onChange"
  />
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      newValue: [],
      options: []
    }
  },
  watch: {
    value () {
      // 观测渲染完毕后，父组件再直接设置值的情况，更新下拉数据
      if (this.value.map(address => address.value).join() !== this.newValue.join()) {
        this.initOptions()
      }
    }
  },
  mounted () {
    this.initOptions()
  },
  methods: {
    // 初始化下拉的数据
    async initOptions () {
      let options = []
      if (this.value.length) {
        // 有初始值时，加载对应省市区的数据
        const [address1, address2, address3] = await Promise.all([
          this.getAddress(),
          this.getAddress(this.value[0].id),
          this.getAddress(this.value[1].id, true)
        ])
        address2.find(address => address.id === this.value[1].id).children = address3
        address1.find(address => address.id === this.value[0].id).children = address2
        options = address1
      } else {
        // 无初始值时，加载省份的数据
        options = await this.getAddress()
      }
      this.options = options
      this.newValue = this.value.map(address => address.value)
    },
    // 获取下拉的数据 id：行政区代码，isLeaf：是否最后一层节点
    getAddress (id = '', isLeaf = false) {
      return new Promise(resolve => {
        fetch(`/ws/district/v1/getchildren?key=XRJBZ-GC7W6-ETTSA-EBFEN-2LN4K-2IFS4${id ? '&id=' + id : ''}`)
          .then(response => response.json())
          .then(data => {
            resolve(data.result[0].map(address => ({
              id: address.id,
              isProvince: id === '',
              value: address.fullname,
              label: address.fullname,
              isLeaf
            })))
          })
      })
    },
    // 点击下拉选项时，获取子数据
    async loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      targetOption.children = await this.getAddress(targetOption.id, !targetOption.isProvince)
      this.options = [...this.options]
      targetOption.loading = false
    },
    onChange (value, selectedOptions) {
      const changeValue = selectedOptions.map(address => ({
        id: address.id,
        value: address.value
      }))
      this.$emit('change', changeValue)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
