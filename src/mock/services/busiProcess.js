import Mock from 'mockjs'

const queryEntrust = {}

const deleteTemporarilyByCode = {}

const getPauseReason = {}

const getSurveyCompanyInfo = {}

const getSurveyReport = {}

const getPersonAppointmentDetail = {}

const queryProgress = {}

Mock.mock(/\/light_api\/Project\/QueryEntrust/, 'get', queryEntrust)
Mock.mock(/\/light_api\/Project\/DeleteTemporarilyByCode/, 'post', deleteTemporarilyByCode)
Mock.mock(/\/light_api\/Project\/GetPauseReason/, 'get', getPauseReason)
Mock.mock(/\/light_api\/onlineServiceProject\/public\/getSurveyCompanyInfo/, 'get', getSurveyCompanyInfo)
Mock.mock(/\/light_api\/Project\/GetSurveyReport/, 'get', getSurveyReport)
Mock.mock(/\/light_api\/Project\/GetPersonAppointmentDetail/, 'get', getPersonAppointmentDetail)
Mock.mock(/\/light_api\/Project\/QueryProgress/, 'get', queryProgress)
