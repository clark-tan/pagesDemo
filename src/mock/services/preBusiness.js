import Mock from 'mockjs'

const lookupDict = { }

const getDataByTemporarily = { }

const getDataByTemporarilyToCode = { }

const getSurveyAndLocal = { }

const getEntrustDesc = { }

const getEditableContent = { }

const getMeasurementItems = { }

const getProvideFileList = { }

const materialUpload = { }

const submitEntrust = { }

const getEntrustTempWeb = { }

const getWindowsInfo = { }

const getSurveyType = { }

const getComponentConfig = { }

Mock.mock(/\/light_api\/Login\/public\/lookupDict/, 'get', lookupDict)
Mock.mock(/\/light_api\/Project\/GetDataByTemporarily/, 'get', getDataByTemporarily)
Mock.mock(/\/light_api\/Project\/GetDataByTemporarilyToCode/, 'get', getDataByTemporarilyToCode)
Mock.mock(/\/light_api\/onlineServiceProject\/public\/getSurveyAndLocal/, 'get', getSurveyAndLocal)
Mock.mock(/\/light_api\/onlineServiceProject\/public\/getEntrustDescWeb/, 'get', getEntrustDesc)
Mock.mock(/\/light_api\/Project\/GetEditableContent/, 'get', getEditableContent)
Mock.mock(/\/light_api\/onlineServiceProject\/public\/getMeasurementItems/, 'get', getMeasurementItems)
Mock.mock(/\/light_api\/onlineServiceProject\/public\/getProvideFileList/, 'get', getProvideFileList)
Mock.mock(/\/light_api\/onlineServiceProject\/public\/materialUpload/, 'get', materialUpload)
Mock.mock(/\/light_api\/onlineServiceProject\/public\/submitEntrust/, 'get', submitEntrust)
Mock.mock(/\/light_api\/onlineServiceProject\/public\/getEntrustTempWeb/, 'get', getEntrustTempWeb)
Mock.mock(/\/light_api\/onlineServiceProject\/public\/getWindowsInfo/, 'get', getWindowsInfo)
Mock.mock(/\/light_api\/Project\/GetSurveyType/, 'get', getSurveyType)
Mock.mock(/\/light_api\/onlineServiceProject\/public\/getComponentConfig/, 'get', getComponentConfig)
