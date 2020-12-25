/*
 * @Description: api整合
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-06-02 12:00:07
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-18 10:14:51
 */
import { lightApi } from './baseUrl'

// common start--------------------------------------------------------------------------
// 获取数字词典值
const LookupDict = lightApi + '/Login/public/lookupDict'
// 附件上传
const MaterialUpload = lightApi + '/onlineServiceProject/public/materialUpload'
// common end----------------------------------------------------------------------------

// login start---------------------------------------------------------------------------
const LoginURL = lightApi + '/Login/dchy/public/LoginIn'
const GetLoginUserInfo = lightApi + '/Login/dchy/public/GetLoginUserInfo'
const LogoutURL = lightApi + '/Login/dchy/public/Logout'
const Register = lightApi + '/Login/dchy/public/Register'
// login end-----------------------------------------------------------------------------

// home start----------------------------------------------------------------------------
const GetMenuBar = lightApi + '/menu/public/getMenu'
const GetNoticeList = lightApi + '/notice/public/listNoticeLike'
const MenuInfoCount = lightApi + '/Project/GetMenuInfoCount'
const GetWebConfig = lightApi + '/menu/public/getMenuConfig'
// 办事服务
const GetWorkService = lightApi + '/config/public/getBsfw'
const GetCarousel = lightApi + '/lbt/public/getLbtLike'
const GetCarouselDetail = lightApi + '/lbt/public/getLbtMoreByPid'
// home end-------------------------------------------------------------------------------

// preBusiness start----------------------------------------------------------------------
// 获取表单配置项
const GetComponentConfig = lightApi + '/onlineServiceProject/public/getComponentConfig'
// 获取暂存数据
// const GetDataByTemporarily = lightApi + '/Project/GetDataByTemporarily'
// 获取暂存数据2
const GetDataByTemporarilyToCode = lightApi + '/onlineServiceProject/public/getDataByTemporarilyToCode'
// 获取重庆业务委托数据
const GetSurveyAndLocal = lightApi + '/onlineServiceProject/public/getSurveyAndLocal'
// 业务委托说明
const GetEntrustDesc = lightApi + '/onlineServiceProject/public/getEntrustDescWeb'
// 获取业务委托表单
const GetEditableContent = lightApi + '/Project/GetEditableContent'
// 获取测量事项
const GetMeasurementItems = lightApi + '/onlineServiceProject/public/getMeasurementItems'
// 获取需要提供附件材料列表
const GetProvideFileList = lightApi + '/onlineServiceProject/public/getProvideFileList'
// 业务委托提交
const SubmitEntrust = lightApi + '/onlineServiceProject/public/submitEntrust'
// 测量委托书模板下载
const GetEntrustTempWeb = lightApi + '/onlineServiceProject/public/getEntrustTempWeb'
// 根据行政区变化动态获得“现场取件地址”
const GetWindowsInfo = lightApi + '/onlineServiceProject/public/getWindowsInfo'
// 获取项目类型列表
const GetSurveyType = lightApi + '/Project/GetSurveyType'
// preBusiness end-----------------------------------------------------------------------

// ReservationEnter start ---------------------------------------------------------------
// 预约进场查询
const QueryAppointmentApproach = lightApi + '/Project/QueryYyjcsjData'
// 提交预约进场数据
const SaveAppointmentApproach = lightApi + '/Project/SaveYyjcsj'
// 撤回预约进场时间数据
const RevokeAppointmentApproach = lightApi + '/Project/RevokeYyjcsj'
// ReservationEnter end -----------------------------------------------------------------

// supplementaryMaterials start ---------------------------------------------------------
// 暂存补充材料信息
const TemporaryMaterialsList = lightApi + '/Project/TemporaryMaterialsList'
// 上传补充材料信息
const SupplMaterialsList = lightApi + '/Project/SupplMaterialsList'
// 获取需要补充的材料
const GetSupplyMaterialList = lightApi + '/Project/GetSupplyMaterialList'
// 撤回已经补充的材料
const RevokeSupplyMaterial = lightApi + '/Project/RevokeSupplyMaterial'
// supplementaryMaterials end ----------------------------------------------------------

// reportOnline start ------------------------------------------------------------------
// 业务进度查询 type 1代表预受理，2代表正式受理,3材料补充,4代表查看上传报告的数据（苏州）,5满意度评价
const QueryEntrust = lightApi + '/Project/dchy/public/QueryEntrust'
// 获取暂停原因
const GetPauseReason = lightApi + '/Project/GetPauseReason'
// 获取测绘单位联系信息
const GetSurveyCompanyInfo = lightApi + '/onlineServiceProject/public/getSurveyCompanyInfo'
// 获取测量报告
const GetSurveyReport = lightApi + '/Project/GetSurveyReport'
// reportOnline end ---------------------------------------------------------------------

// satisfactionEvaluation start ---------------------------------------------------------
// 获取满意度调查项
const GetSatisfactionItem = lightApi + '/Satisfied/GetSatisfactionItem'
// 提交满意度调查
const SubmitSatisfactionAppraise = lightApi + '/Satisfied/SubmitSatisfactionAppraise'
// 新增评价
const AddEvaluate = lightApi + '/mydpj/public/save'
// satisfactionEvaluation end ----------------------------------------------------------

// guide start -------------------------------------------------------------------------
//  获取办事指南信息
const GetBusinessGuideInfo = lightApi + '/handleGuide/public/findListLike'
// guide end ---------------------------------------------------------------------------

// notice start ------------------------------------------------------------------------
// 通知公告
const NoticeList = lightApi + '/notice/public/listNoticeLike'
// notice start ------------------------------------------------------------------------

// policiesAndRegulations start ------------------------------------------------------------------------
// 政策法规
const PoliciesAndRegulationsList = lightApi + '/zcfg/public/listZcfgListPageLike'
// policiesAndRegulations start ------------------------------------------------------------------------

// credit start ------------------------------------------------------------------------
// 信用公示
const getUnitCreditListLike = lightApi + '/unit/public/getUnitCreditListLike'
const getUnitCreditListPageLike = lightApi + '/unit/public/getUnitCreditListPageLike'
const getUnitCreditById = lightApi + '/unit/public/getUnitCreditById'
// credit start ------------------------------------------------------------------------

// chdw start ------------------------------------------------------------------------
// 测绘单位相关信息
const SurveyInstitutionsList = lightApi + '/chdw/public/list'
// chdw start ------------------------------------------------------------------------

// busiProcess start -------------------------------------------------------------------
// 根据RID删除暂存数据
const DeleteTemporarilyByCode = lightApi + '/Project/DeleteTemporarilyByCode'
// 获取我的预约信息详情
const GetPersonAppointmentDetail = lightApi + '/Project/GetPersonApmtDetail'
// 确认进度查询
const QueryProgress = lightApi + '/Project/ClbgConfirm'
// busiProcess start -------------------------------------------------------------------

// user start --------------------------------------------------------------------------
// 变更邮箱
const changeMailBox = lightApi + '/Login/ChangeMailBox'
// 验证码
const SendVerification = lightApi + '/validate/public/sendVerification'
// 变更密码
const changePasswordEx = lightApi + '/Login/ChangePasswordEx'
// 忘记密码后通过手机修改密码onlineOfficeHall-zongji
const RetrievePassword = lightApi + '/Login/RetrievePassword'
// 更新单位名称
const updateProUser = lightApi + '/Login/UpdateSmallProUser'
// 更新用户信息
const transferAccountInfo = lightApi + '/Other/TransferAccountInfo'
// 检测注册填写信息
const CheckRegisterInfo = lightApi + '/Login/public/CheckRegisterInfo'
// 检测手机验证码是否正确
const GetByValidate = lightApi + '/Login/GetByValidate'
// user end --------------------------------------------------------------------------

// user start --------------------------------------------------------------------------
// 获取信息公开列表
const GetInfoList = lightApi + '/Index/GetInfoList'
// user end --------------------------------------------------------------------------

// suggest start --------------------------------------------------------------------------
// 投诉查询
const QueryComplaint = lightApi + '/ComplaintAndAdvise/QueryComplaint'
// 投诉详情
const GetComplaintSurveyInfo = lightApi + '/ComplaintAndAdvise/GetComplaintSurveyInfo'
// 投诉暂存
const SaveComplaintDataByTemporarily = lightApi + '/ComplaintAndAdvise/SaveComplaintDataByTemporarily'
// 投诉提交
const SubmitComplaint = lightApi + '/ComplaintAndAdvise/SubmitComplaint'
// 建议查询
const QuerySuggestions = lightApi + '/ComplaintAndAdvise/QuerySuggestions'
// 建议详情
const GetSuggestionsSurveyInfo = lightApi + '/ComplaintAndAdvise/GetSuggestionsSurveyInfo'
// 建议暂存
const SaveSuggestionsDataByTemporarily = lightApi + '/ComplaintAndAdvise/SaveSuggestionsDataByTemporarily'
// 建议提交
const SubmitSuggestions = lightApi + '/ComplaintAndAdvise/SubmitSuggestions'
// suggest start --------------------------------------------------------------------------

// contact start --------------------------------------------------------------------------
// 获取联系我们详细信息
const GetContactUsInfo = lightApi + '/contact/public/getContact'
// contact start --------------------------------------------------------------------------

// other start --------------------------------------------------------------------------
// 获取省市县三级联动
const getPCCAddress = lightApi + '/other/public/getPCCAddress'
// 获取测绘单位性质
const GetInstitutionsProperty = lightApi + '/other/public/getDwxz'
// other start --------------------------------------------------------------------------

export {
  LoginURL,
  GetLoginUserInfo,
  LogoutURL,
  Register,
  GetMenuBar,
  GetNoticeList,
  MenuInfoCount,
  LookupDict,
  // GetDataByTemporarily,
  GetSurveyAndLocal,
  GetEntrustDesc,
  GetEditableContent,
  GetMeasurementItems,
  GetProvideFileList,
  MaterialUpload,
  SubmitEntrust,
  GetEntrustTempWeb,
  GetWindowsInfo,
  QueryAppointmentApproach,
  SaveAppointmentApproach,
  RevokeAppointmentApproach,
  TemporaryMaterialsList,
  SupplMaterialsList,
  GetSupplyMaterialList,
  RevokeSupplyMaterial,
  QueryEntrust,
  GetPauseReason,
  GetSurveyCompanyInfo,
  GetSurveyReport,
  GetSatisfactionItem,
  SubmitSatisfactionAppraise,
  AddEvaluate,
  GetBusinessGuideInfo,
  NoticeList,
  DeleteTemporarilyByCode,
  changeMailBox,
  SendVerification,
  changePasswordEx,
  updateProUser,
  transferAccountInfo,
  CheckRegisterInfo,
  GetInfoList,
  GetSurveyType,
  GetWebConfig,
  QueryComplaint,
  SaveComplaintDataByTemporarily,
  SubmitComplaint,
  QuerySuggestions,
  GetSuggestionsSurveyInfo,
  SaveSuggestionsDataByTemporarily,
  SubmitSuggestions,
  RetrievePassword,
  GetComplaintSurveyInfo,
  GetContactUsInfo,
  GetDataByTemporarilyToCode,
  GetPersonAppointmentDetail,
  QueryProgress,
  GetByValidate,
  GetComponentConfig,
  PoliciesAndRegulationsList,
  SurveyInstitutionsList,
  getUnitCreditListLike,
  getUnitCreditListPageLike,
  getUnitCreditById,
  GetWorkService,
  GetCarousel,
  GetCarouselDetail,
  getPCCAddress,
  GetInstitutionsProperty
}
