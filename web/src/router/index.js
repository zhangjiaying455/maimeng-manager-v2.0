import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');//登录
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');//注册
const password = r => require.ensure([], () => r(require('@/page/password')), 'password');//忘记密码
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const management = r => require.ensure([], () => r(require('@/page/management')), 'management');
const newModel = r => require.ensure([], () => r(require('@/page/model/newModel')), 'newModel');
const modelTraining = r => require.ensure([], () => r(require('@/page/model/modelTraining')), 'modelTraining');
const modelToEvaluate = r => require.ensure([], () => r(require('@/page/model/modelToEvaluate')), 'modelToEvaluate');
const modelToPredict = r => require.ensure([], () => r(require('@/page/model/modelToPredict')), 'modelToPredict');
const modelOutput = r => require.ensure([], () => r(require('@/page/model/modelOutput')), 'modelOutput');
const MmDataSource = r => require.ensure([], () => r(require('@/page/data/MmDataSource')), 'MmDataSource');
const cooperativeDataSource = r => require.ensure([], () => r(require('@/page/data/cooperativeDataSource')), 'cooperativeDataSource');
const labelFeatureManagement = r => require.ensure([], () => r(require('@/page/data/labelFeatureManagement')), 'labelFeatureManagement');
const modelDataManagement = r => require.ensure([], () => r(require('@/page/data/modelDataManagement')), 'modelDataManagement');
const crowdPackManagement = r => require.ensure([], () => r(require('@/page/data/crowdPackManagement')), 'crowdPackManagement');
const statistical = r => require.ensure([], () => r(require('@/page/touch/statistical')), 'statistical');
const call_center = r => require.ensure([], () => r(require('@/page/touch/call_center')), 'call_center');
const platform = r => require.ensure([], () => r(require('@/page/touch/platform')), 'platform');//投放平台
const sms_touch = r => require.ensure([], () => r(require('@/page/touch/sms_touch')), 'sms_touch');//短信触达
const certification = r => require.ensure([], () => r(require('@/page/account/certification')), 'certification');//企业认证
const security = r => require.ensure([], () => r(require('@/page/account/security')), 'security');//账号安全
const role = r => require.ensure([], () => r(require('@/page/account/role')), 'role');//角色管理
const role_edit = r => require.ensure([], () => r(require('@/page/account/role_edit')), 'role_edit');
const role_info = r => require.ensure([], () => r(require('@/page/account/role_info')), 'role_info');
const subaccount = r => require.ensure([], () => r(require('@/page/account/subaccount')), 'subaccount');//子账号管理
const thread = r => require.ensure([], () => r(require('@/page/marketing/thread')), 'thread');//线索管理
const monitoring = r => require.ensure([], () => r(require('@/page/marketing/monitoring')), 'monitoring');//数据监测
const bordereaux = r => require.ensure([], () => r(require('@/page/marketing/bordereaux')), 'bordereaux');//业务报表
const business = r => require.ensure([], () => r(require('@/page/marketing/business')), 'business');//业务需求
const business_edit = r => require.ensure([], () => r(require('@/page/marketing/business_edit')), 'business_edit');//业务需求
const business_update = r => require.ensure([], () => r(require('@/page/marketing/business_update')), 'business_update');//业务需求
const clue_management = r => require.ensure([], () => r(require('@/page/marketing/clue_management')), 'clue_management');//业务需求  线索管理

/*addGoods*/
/*const createRole = r => require.ensure([], () => r(require('@/page/account/createRole')), 'createRole');*/

const routes = [
	{
		path: '/',
		component: login
	},
    {
        path: '/register',
        component: register
    },
    {
        path: '/password',
        component: password
    },
	{
	    path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
            path: '/thread',
            component:thread,
            meta: ['营销管理','线索管理'],
        },{
                path: '/monitoring',
                component:monitoring,
                meta: ['营销管理','数据监测'],
        },{
                path: '/bordereaux',
                component:bordereaux,
                meta: ['营销管理','业务报表'],
            },
            {
                path: '/business',
                component:business,
                meta: ['营销管理','业务需求'],
            },
            {
                path: '/business_edit',
                component:business_edit,
                meta: ['营销管理','业务需求'],
            },
            {
                name:'business_update',
                path: '/business_update',
                component:business_update,
                meta: ['营销管理','业务需求'],
            },
            {
                name:'clue_management',
                path: '/clue_management',
                component:clue_management,
                meta: ['营销管理','线索管理'],
            },
            {
                path: '/MmDataSource',
                component: MmDataSource,
                meta: ['数据管理', '麦盟大数据'],
            },{
                path: '/cooperativeDataSource',
                component: cooperativeDataSource,
                meta: ['数据管理', '合作数据源'],
            },{
                path: '/labelFeatureManagement',
                component: labelFeatureManagement,
                meta: ['数据管理', '标签特征管理'],
            },{
                path: '/modelDataManagement',
                component: modelDataManagement,
                meta: ['数据管理', '模型数据管理'],
            },{
                path: '/crowdPackManagement',
                component: crowdPackManagement,
                meta: ['数据管理', '人群包管理'],
            },{
			path: '/newModel',
			component: newModel,
			meta: ['模型管理', '新建模型'],
		},{
			path: '/modelTraining',
			component: modelTraining,
			meta: ['模型管理', '模型训练'],
		},{
			path: '/modelToEvaluate',
			component: modelToEvaluate,
			meta: ['模型管理', '模型评估'],
		},{
			path: '/modelToPredict',
			component: modelToPredict,
			meta: ['模型管理', '模型预测'],
		},{
			path: '/modelOutput',
			component: modelOutput,
			meta: ['模型管理', '模型输出'],
		},
            {
                path: '/statistical',
                component: statistical,
                meta: ['触达系统','智能外呼'],
            },
            {
                path: '/call_center',
                component: call_center,
                meta: ['触达系统','呼叫中心'],
            },
            {
                path: '/platform',
                component: platform,
                meta: ['触达系统','投放平台'],
            },
            {
                path: '/sms_touch',
                component: sms_touch,
                meta: ['触达系统','短信触达'],
            },
            {
                path: '/certification',
                component: certification,
                meta: ['账号管理','企业认证'],
            },
            {
                path: '/security',
                component: security,
                meta: ['账号管理','账号安全'],
            },
            {
                path: '/role',
                component: role,
                meta: ['账号管理','角色管理'],
            },
            {
                path: '/role_edit',
                component: role_edit,
                meta: ['账号管理','角色管理'],
            },
            {
                path: '/role_info',
                component: role_info,
                meta: ['账号管理','角色管理'],
            },
            {
                path: '/subaccount',
                component: subaccount,
                meta: ['账号管理','子账号管理'],
            }
        ]
	}
]


export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
