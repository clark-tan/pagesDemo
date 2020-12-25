import Mock from 'mockjs'

const loginURL = { 'code': 0, 'data': { 'ticket': '47a0c7d7-c4a3-4d29-b7ca-18a16fefb45f', 'nickName': null, 'accountType': '个人', 'LXR': null, 'DWMC': '天朝集团', 'DWDZ': '天朝路', 'userID': '39b21122-b2e8-4d68-b1c4-8ac6ee8bf663', 'ticketTime': '30', 'mailBox': '1322756555@qq.com', 'mobilePhone': '15115151515', 'ZJLX': '身份证', 'loginName': 'admin', 'ZJHM': '230407199808080808' }, 'desc': '成功！' }

const getLoginUserInfo = { 'code': 0, 'data': { 'mailBox': '1322756555@qq.com', 'mobilePhone': '15115151515', 'nickName': null, 'ZJLX': '身份证', 'loginName': 'admin', 'accountType': '个人', 'LXR': null, 'DWDZ': '天朝路', 'DWMC': '天朝集团', 'userName': 'god', 'userID': '39b21122-b2e8-4d68-b1c4-8ac6ee8bf663', 'ZJHM': '230407199808080808' }, 'desc': '成功！' }

const logoutURL = { }

Mock.mock(/\/light_api\/Login\/dchy\/public\/LoginIn/, 'post', loginURL)
Mock.mock(/\/light_api\/Login\/dchy\/public\/GetLoginUserInfo/, 'get', getLoginUserInfo)
Mock.mock(/\/light_api\/Login\/dchy\/public\/Logout/, 'get', logoutURL)
