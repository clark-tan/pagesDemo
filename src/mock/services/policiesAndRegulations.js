import Mock from 'mockjs'

const policiesAndRegulations = { }

Mock.mock(/\/light_api\/zcfg\/public\/listZcfgListPageLike/, 'get', policiesAndRegulations)
