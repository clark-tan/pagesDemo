import Mock from 'mockjs'

const changeMailBox = { }

const sendVerification = { }

const changePasswordEx = { }

const updateProUser = {}

const transferAccountInfo = {}

const lookupDict = {}

const checkRegisterInfo = {}

const register = {}

const retrievePassword = {}

const getByValidate = {}

Mock.mock(/\/light_api\/Login\/ChangeMailBox/, 'post', changeMailBox)
Mock.mock(/\/light_api\/Other\/SendVerification/, 'get', sendVerification)
Mock.mock(/\/light_api\/Login\/ChangePasswordEx/, 'get', changePasswordEx)
Mock.mock(/\/light_api\/Login\/UpdateSmallProUser/, 'get', updateProUser)
Mock.mock(/\/light_api\/Other\/TransferAccountInfo/, 'get', transferAccountInfo)
Mock.mock(/\/light_api\/Login\/public\/lookupDict/, 'get', lookupDict)
Mock.mock(/\/light_api\/Login\/public\/CheckRegisterInfo/, 'get', checkRegisterInfo)
Mock.mock(/\/light_api\/Login\/dchy\/public\/Register/, 'get', register)
Mock.mock(/\/light_api\/Login\/RetrievePassword/, 'get', retrievePassword)
Mock.mock(/\/light_api\/Login\/GetByValidate/, 'get', getByValidate)
