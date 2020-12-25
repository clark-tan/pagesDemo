import Mock from 'mockjs'

const queryComplaint = {}

const querySuggestions = {}

const submitSuggestions = {}

const submitComplaint = {}

const getSuggestionsSurveyInfo = {}

const saveSuggestionsDataByTemporarily = {}

const saveComplaintDataByTemporarily = {}

const getComplaintSurveyInfo = {}

Mock.mock(/\/light_api\/ComplaintAndAdvise\/QueryComplaint/, 'get', queryComplaint)
Mock.mock(/\/light_api\/ComplaintAndAdvise\/QuerySuggestions/, 'get', querySuggestions)
Mock.mock(/\/light_api\/ComplaintAndAdvise\/SubmitSuggestions/, 'get', submitSuggestions)
Mock.mock(/\/light_api\/ComplaintAndAdvise\/SubmitComplaint/, 'get', submitComplaint)
Mock.mock(/\/light_api\/ComplaintAndAdvise\/GetSuggestionsSurveyInfo/, 'get', getSuggestionsSurveyInfo)
Mock.mock(/\/light_api\/ComplaintAndAdvise\/SaveSuggestionsDataByTemporarily/, 'get', saveSuggestionsDataByTemporarily)
Mock.mock(/\/light_api\/ComplaintAndAdvise\/SaveComplaintDataByTemporarily/, 'get', saveComplaintDataByTemporarily)
Mock.mock(/\/light_api\/ComplaintAndAdvise\/GetComplaintSurveyInfo/, 'get', getComplaintSurveyInfo)
