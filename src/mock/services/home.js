import Mock from 'mockjs'
import { builder } from '../util'

const getMenuConfig = () => {
  return builder({
    rowsList: [
      {
        unit: '天朝',
        qrcode: 'null',
        logo: '/logo.png',
        edition: '版权所有 &copy; 天朝',
        banner: 'logo.png',
        title: '网上办事大厅(演示版本)'
      }
    ],
    hideColumns: [],
    columns: [
      { label: '标题', type: 'text', key: 'title' },
      { label: 'logo', type: 'text', key: 'logo' },
      { label: '版本', type: 'text', key: 'edition' },
      { label: '横幅图', type: 'text', key: 'banner' },
      { label: '二维码', type: 'text', key: 'qrcode' },
      { label: '单位', type: 'text', key: 'unit' }
    ]
  })
}

const getMenuList = () => {
  return builder({
    rowsList: [
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'PoliciesAndRegulations',
        icon: '',
        is_leaf: '1',
        rid: '0044948e-e5e6-47b8-b5c2-cec53d6ff61a',
        show_pc: '1',
        parentid: '',
        url: '',
        sort_no: '',
        is_showinindex: '1',
        intro: '123',
        name: '政策法规',
        webicon: '',
        isroute: '1',
        id: 'PoliciesAndRegulations',
        keep_alive: '1',
        show_wx: '1'
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'PayOnline',
        icon: '',
        is_leaf: '',
        rid: '0d88c1aa-6c27-4152-bed4-4fe5d0491e9f',
        show_pc: '',
        parentid: '0',
        url: '',
        sort_no: '',
        is_showinindex: '',
        intro: '',
        name: '在线支付',
        webicon: '',
        isroute: '1',
        id: 'PayOnline',
        keep_alive: '1',
        show_wx: ''
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'SuggestAndComplaint',
        icon: '',
        is_leaf: '',
        rid: '19a7488c-1561-4e13-9084-dad3c956c255',
        show_pc: '',
        parentid: '0',
        url: '',
        sort_no: '',
        is_showinindex: '',
        intro: '',
        name: '建议与投诉',
        webicon: '',
        isroute: '1',
        id: 'SuggestAndComplaint',
        keep_alive: '1',
        show_wx: ''
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'PreBusiness',
        icon: '',
        is_leaf: '1',
        rid: '26f9dae2-f651-4d0c-8373-aafccb083a2f',
        show_pc: '1',
        parentid: '0',
        url: '',
        sort_no: '',
        is_showinindex: '1',
        intro: '',
        name: '项目委托',
        webicon: '',
        isroute: '1',
        id: 'PreBusiness',
        keep_alive: '1',
        show_wx: '1'
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'PreAppointment',
        icon: '',
        is_leaf: '',
        rid: '57c4524e-35e7-4f3f-8f38-65afb2089b82',
        show_pc: '',
        parentid: '0',
        url: '',
        sort_no: '',
        is_showinindex: '',
        intro: '',
        name: '预约进场',
        webicon: '',
        isroute: '1',
        id: 'PreAppointment',
        keep_alive: '1',
        show_wx: ''
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'Guidelines',
        icon: '',
        is_leaf: '1',
        rid: '5d00bdd4-275f-4eda-8f76-1a8acad9c86e',
        show_pc: '1',
        parentid: '0',
        url: '',
        sort_no: '1',
        is_showinindex: '1',
        intro: '1111',
        name: '办事指南',
        webicon: '',
        isroute: '1',
        id: 'Guidelines',
        keep_alive: '1',
        show_wx: '1'
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'InfoPublic',
        icon: '',
        is_leaf: '1',
        rid: '68098af0-6271-4a72-9cfd-c74690294bbf',
        show_pc: '1',
        parentid: '0',
        url: '',
        sort_no: '',
        is_showinindex: '1',
        intro: '',
        name: '信息公开',
        webicon: '',
        isroute: '1',
        id: 'InfoPublic',
        keep_alive: '1',
        show_wx: '1'
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'SatisfactionEvaluation',
        icon: '',
        is_leaf: '',
        rid: '73be0113-e3d0-4c5d-ad98-f5f2d64520eb',
        show_pc: '',
        parentid: '0',
        url: '',
        sort_no: '',
        is_showinindex: '',
        intro: '',
        name: '满意度评价',
        webicon: '',
        isroute: '1',
        id: 'SatisfactionEvaluation',
        keep_alive: '1',
        show_wx: ''
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'BusinessProcess',
        icon: '',
        is_leaf: '',
        rid: '80c16d42-0b27-4c7a-b31a-08fa53e74610',
        show_pc: '',
        parentid: '0',
        url: '',
        sort_no: '',
        is_showinindex: '',
        intro: '',
        name: '进度查询',
        webicon: '',
        isroute: '1',
        id: 'BusinessProcess',
        keep_alive: '1',
        show_wx: ''
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '0',
        component_name: 'YelloPages',
        icon: '',
        is_leaf: '1',
        rid: '843c642f-13dd-4a47-849a-f550ccc47fd3',
        show_pc: '1',
        parentid: '0',
        url: '',
        sort_no: '',
        is_showinindex: '1',
        intro: '',
        name: '测绘机构信息',
        webicon: '',
        isroute: '1',
        id: 'YelloPages',
        keep_alive: '1',
        show_wx: '1'
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'Contact',
        icon: '',
        is_leaf: '1',
        rid: 'a95ddd84-12c9-41cd-bbc1-9e43c949e117',
        show_pc: '1',
        parentid: '',
        url: '',
        sort_no: '',
        is_showinindex: '1',
        intro: '',
        name: '联系我们',
        webicon: '',
        isroute: '1',
        id: 'Contact',
        keep_alive: '1',
        show_wx: '1'
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'SupplementaryMaterials',
        icon: '',
        is_leaf: '1',
        rid: 'bb730129-2361-4d02-b52e-a98312346b7f',
        show_pc: '1',
        parentid: '0',
        url: '',
        sort_no: '',
        is_showinindex: '1',
        intro: '',
        name: '材料补充',
        webicon: '',
        isroute: '1',
        id: 'SupplementaryMaterials',
        keep_alive: '1',
        show_wx: '1'
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'Notice',
        icon: '',
        is_leaf: '1',
        rid: 'ce70ec74-c84f-4035-87f0-3f89799daf7d',
        show_pc: '1',
        parentid: '0',
        url: '',
        sort_no: '',
        is_showinindex: '1',
        intro: '222',
        name: '通知公告',
        webicon: '',
        isroute: '1',
        id: 'Notice',
        keep_alive: '1',
        show_wx: '1'
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'UserPanel',
        icon: '',
        is_leaf: '1',
        rid: 'dfdf7a3b-4a14-4558-9a70-2c9242b3c733',
        show_pc: '1',
        parentid: '',
        url: '',
        sort_no: '',
        is_showinindex: '1',
        intro: '',
        name: '用户中心',
        webicon: '',
        isroute: '1',
        id: 'UserPanel',
        keep_alive: '1',
        show_wx: '1'
      },
      {
        redirect: '',
        jid: '',
        hidden: '0',
        menu_type: '',
        component_name: 'ReportOnline',
        icon: '',
        is_leaf: '',
        rid: 'eccb2e70-4289-46f4-80d4-1f5afa021585',
        show_pc: '',
        parentid: '0',
        url: '',
        sort_no: '',
        is_showinindex: '',
        intro: '',
        name: '在线报告',
        webicon: '',
        isroute: '1',
        id: 'ReportOnline',
        keep_alive: '1',
        show_wx: ''
      }
    ],
    hideColumns: ['rid', 'jid'],
    columns: [
      { label: '序号', type: 'text', key: 'xh' },
      { label: '业务受理号', type: 'text', key: 'jid' },
      { label: '记录标识', type: 'text', key: 'rid' },
      { label: '菜单排序', type: 'text', key: 'sort_no' },
      { label: '是否路由菜单', type: 'text', key: 'is_route' },
      { label: '是否叶子节点', type: 'text', key: 'is_leaf' },
      { label: '模块描述', type: 'text', key: 'intro' },
      { label: '是否在首页显示', type: 'text', key: 'is_showinindex' },
      { label: '首页大图标', type: 'text', key: 'webicon' },
      { label: '菜单id', type: 'text', key: 'id' },
      { label: '父级id', type: 'text', key: 'parentid' },
      { label: '菜单标题', type: 'text', key: 'name' },
      { label: '路径', type: 'text', key: 'url' },
      { label: '组件名字', type: 'text', key: 'component_name' },
      { label: '一级菜单跳转地址', type: 'text', key: 'redirect' },
      { label: '菜单类型', type: 'text', key: 'menu_type' },
      { label: '菜单图标', type: 'text', key: 'icon' },
      { label: '是否缓存该页面', type: 'text', key: 'keep_alive' },
      { label: '是否隐藏路由', type: 'text', key: 'hidden' },
      { label: '微信首页显示', type: 'text', key: 'show_wx' },
      { label: 'pc端首页显示', type: 'text', key: 'show_pc' }
    ]
  })
}

const getNoticeList = () => {
  return builder({
    rowsList: [
      {
        bt: '习近平向博鳌亚洲论坛国际科技与创新论坛首届大会开幕致贺信',
        fbbmid: '系统管理员',
        fj: '',
        jid: '',
        fbr: '系统管理员',
        fbbm: '系统管理员',
        fbrid: '系统管理员',
        fbsj: '2020年11月25日 17时31分55秒',
        rid: '82d62592-a423-4814-a888-09a05c3db933',
        tznr:
          '<p>新华社北京11月10日电 国家主席习近平10日向博鳌亚洲论坛国际科技与创新论坛首届大会开幕致贺信。</p><p>习近平指出，当今世界，新一轮科技革命和产业变革方兴未艾，给人类发展带来了深刻变化，为解决和应对全球性发展难题和挑战提供了新路径。</p><p>习近平强调，科学技术应该造福全人类。当前，全球正面临新冠肺炎疫情等各种挑战。中国愿同各国一道，加强科技创新与合作，促进更加开放包容、互惠共享的国际科技创新交流，为推动全球经济复苏、保障人民身体健康作出贡献。博鳌亚洲论坛同澳门特别行政区政府共同举办国际科技与创新论坛大会，将为全球科技创新提供交流合作的重要平台。希望大会围绕“创新赋能可持续发展”这一主题，集思广益，增进共识，促进合作，使科技创新更好造福各国人民。</p><p>新华社北京11月10日电 国家主席习近平10日向博鳌亚洲论坛国际科技与创新论坛首届大会开幕致贺信。</p><p>习近平指出，当今世界，新一轮科技革命和产业变革方兴未艾，给人类发展带来了深刻变化，为解决和应对全球性发展难题和挑战提供了新路径。</p><p>习近平强调，科学技术应该造福全人类。当前，全球正面临新冠肺炎疫情等各种挑战。中国愿同各国一道，加强科技创新与合作，促进更加开放包容、互惠共享的国际科技创新交流，为推动全球经济复苏、保障人民身体健康作出贡献。博鳌亚洲论坛同澳门特别行政区政府共同举办国际科技与创新论坛大会，将为全球科技创新提供交流合作的重要平台。希望大会围绕“创新赋能可持续发展”这一主题，集思广益，增进共识，促进合作，使科技创新更好造福各国人民。</p><p>新华社北京11月10日电 国家主席习近平10日向博鳌亚洲论坛国际科技与创新论坛首届大会开幕致贺信。</p><p>习近平指出，当今世界，新一轮科技革命和产业变革方兴未艾，给人类发展带来了深刻变化，为解决和应对全球性发展难题和挑战提供了新路径。</p><p>习近平强调，科学技术应该造福全人类。当前，全球正面临新冠肺炎疫情等各种挑战。中国愿同各国一道，加强科技创新与合作，促进更加开放包容、互惠共享的国际科技创新交流，为推动全球经济复苏、保障人民身体健康作出贡献。博鳌亚洲论坛同澳门特别行政区政府共同举办国际科技与创新论坛大会，将为全球科技创新提供交流合作的重要平台。希望大会围绕“创新赋能可持续发展”这一主题，集思广益，增进共识，促进合作，使科技创新更好造福各国人民。</p><p>新华社北京11月10日电 国家主席习近平10日向博鳌亚洲论坛国际科技与创新论坛首届大会开幕致贺信。</p><p>习近平指出，当今世界，新一轮科技革命和产业变革方兴未艾，给人类发展带来了深刻变化，为解决和应对全球性发展难题和挑战提供了新路径。</p><p>习近平强调，科学技术应该造福全人类。当前，全球正面临新冠肺炎疫情等各种挑战。中国愿同各国一道，加强科技创新与合作，促进更加开放包容、互惠共享的国际科技创新交流，为推动全球经济复苏、保障人民身体健康作出贡献。博鳌亚洲论坛同澳门特别行政区政府共同举办国际科技与创新论坛大会，将为全球科技创新提供交流合作的重要平台。希望大会围绕“创新赋能可持续发展”这一主题，集思广益，增进共识，促进合作，使科技创新更好造福各国人民。</p><p>新华社北京11月10日电 国家主席习近平10日向博鳌亚洲论坛国际科技与创新论坛首届大会开幕致贺信。</p><p>习近平指出，当今世界，新一轮科技革命和产业变革方兴未艾，给人类发展带来了深刻变化，为解决和应对全球性发展难题和挑战提供了新路径。</p><p>习近平强调，科学技术应该造福全人类。当前，全球正面临新冠肺炎疫情等各种挑战。中国愿同各国一道，加强科技创新与合作，促进更加开放包容、互惠共享的国际科技创新交流，为推动全球经济复苏、保障人民身体健康作出贡献。博鳌亚洲论坛同澳门特别行政区政府共同举办国际科技与创新论坛大会，将为全球科技创新提供交流合作的重要平台。希望大会围绕“创新赋能可持续发展”这一主题，集思广益，增进共识，促进合作，使科技创新更好造福各国人民。</p>',
        zy: '新华社北京11月10日电 国家主席习近平10日向博鳌亚洲论坛国际科技与创新论坛首届大会开幕致贺信。'
      }
    ],
    hideColumns: ['rid', 'jid'],
    columns: [
      { label: '发布部门id', type: 'text', key: 'fbbmid' },
      { label: '发布部门', type: 'text', key: 'fbbm' },
      { label: '发布人id', type: 'text', key: 'fbrid' },
      { label: '发布人', type: 'text', key: 'fbr' },
      { label: '附件', type: 'text', key: 'fj' },
      { label: '发布时间', type: 'text', key: 'fbsj' },
      { label: '通知内容', type: 'text', key: 'tznr' },
      { label: '摘要', type: 'text', key: 'zy' },
      { label: '通知标题', type: 'text', key: 'bt' },
      { label: '业务受理号', type: 'text', key: 'jid' },
      { label: '记录标识', type: 'text', key: 'rid' }
    ]
  })
}

const menuInfoCount = () => {
  return builder({})
}

const getBsfw = () => {
  return builder({})
}

const getCarousel = () => {
  return builder({})
}

const getCarouselDetail = () => {
  return builder({})
}

Mock.mock(/\/light_api\/menu\/public\/getMenuConfig/, 'get', getMenuConfig)
Mock.mock(/\/light_api\/notice\/public\/listNoticeLike/, 'post', getNoticeList)
Mock.mock(/\/light_api\/Project\/GetMenuInfoCount/, 'get', menuInfoCount)
Mock.mock(/\/light_api\/config\/public\/getBsfw/, 'get', getBsfw)
Mock.mock(/\/light_api\/lbt\/public\/GetCarousel/, 'get', getCarousel)
Mock.mock(/\/light_api\/lbt\/public\/GetCarouselDetail/, 'get', getCarouselDetail)
Mock.mock(/\/light_api\/menu\/public\/getMenu/, 'get', getMenuList)
