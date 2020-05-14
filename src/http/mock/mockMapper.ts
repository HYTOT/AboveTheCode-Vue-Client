import Mock from 'mockjs'
import {
  Roles,
  User_VO,
  Schedule_VO,
  Official_VO,
  Email_VO,
  SuccessCode,
} from './../../util/types'

const login:Function = ():User_VO => {
  return {
    code: 200,
    data: Mock.mock({
      "permissions": ["addEmailOrDraft", "deleteEmail", "uploadFile", "queryReceiveEmail", "updateEmail", "queryDraft", "queryDocument", "querySendEmail", "queryByEmail"],
      "email": "3123321@163.com",
      "roles": Roles.SUPERVISOR,
      "token": "33F2C8B757644402ABA0E54BD716A4DB",
      "user": {
        "depart": {
          "departid": 2,
          "departname": "IT部",
          "fax": "83123299",
          "telephone": "83123233",
        },
        "email": "3123321@163.com",
        "name": "模拟张三",
        "phone": "",
        "sex": 1,
        "status": 1,
        "uid": "8363BCB85F064430A1A41D05CD1B5342",
        "username": "sam",
        "worktime": "2017/08/22",
      }
    })
  }
}

const logout:Function = ():SuccessCode => ({ code: 200 })

const futureSchedules:Function = ():Schedule_VO => ({
  code: 200,
  data: Mock.mock({
    "list|15": [{
      "createtime": "@datetime",
      "address": "腾讯大厦",
      "schcontent": "开会",
      "endtime": "@datetime",
      "begintime": "@datetime",
      "id|+1": 1,
      "createuser": {
        "uid": "@guid",
        "name": "大管理员",
        "depart": {
          "departname|1": ["人力资源部", "IT部", "财务部"],
        },
      },
      "title": "会议xxx",
    }]
  }).list
})

const todaySchedules:Function = ():Schedule_VO => ({
  data: Mock.mock({
    "list|15": [{
      "createtime": "@datetime",
      "address": "腾讯大厦",
      "schcontent": "开会",
      "endtime": "@datetime",
      "begintime": "@datetime",
      "id|+1": 1,
      "createuser": {
        "uid": "@guid",
        "name": "大管理员",
        "depart": {
          "departname|1": ["人力资源部", "IT部", "财务部"],
        },
      },
      "title": "会议xxx",
    }]
  }).list
})

const uploadFile:Function = ():SuccessCode => ({ code: 200 })

const officialList:Function = ():Official_VO => {
  return {
    code: 200,
    data: Mock.mock({
      "list|5": [{
        "id": "@guid",
        "title": "@ctitle",
        "content": "@cparagraph",
        "documentTime": "@datetime",
        "createUser": {
          "id": "@guid",
          "sex|1": [0, 1],
          "name": "@cname",
          "depart": {
            "departname|1": ["人力资源部", "IT部", "财务部"],
          }
        }
      }]
    }).list
  }
}

const inboxList:Function = ():Email_VO => {
  const list = Mock.mock({
    "list|10": [{
      "messageid": "@guid",
      "title": "@csentence",
      "content": "@cparagraph",
      "createtime": "@datetime",
      "sendtime": "@datetime",
      "fromuser": {
        "uid": "@guid",
        "sex|1": [0, 1],
        "name": "@cname",
        "email": "@email",
        "worktime": "@datetime",
        "depart": {
          "departname|1": ["人力资源部", "IT部", "财务部"],
        }
      },
      "touser": {
        "uid": "8363BCB85F064430A1A41D05CD1B5342",
        "sex": 1,
        "name": "模拟张三",
        "phone": "",
        "email": "3123321@163.com",
        "worktime": "2017-08-22 00:00:00",
        "depart": {
          "departname": "IT部",
        }
      },
      "ifread|1": [1, 2],
      "toifdelete|1": [1, 2]
    }]
  }).list
  return {
    data: {
      notReadEmails: list,
      ReadEmails: list,
    }
  }
}

const draftList:Function = ():Email_VO => {
  return {
    code: 200,
    data: Mock.mock({
      "list|10": [{
        "messageid": "@guid",
        "title": "@csentence",
        "content": "@cparagraph",
        "createtime": "@datetime",
        "sendtime": "@datetime",
        "fromuser": {
          "uid": "8363BCB85F064430A1A41D05CD1B5342",
          "sex": 1,
          "name": "模拟张三",
          "phone": "",
          "email": "3123321@163.com",
          "worktime": "2017-08-22 00:00:00",
          "depart": {
            "departname": "IT部",
          }
        },
        "touser": {
          "uid": "@guid",
          "sex|1": [0, 1],
          "name": "@cname",
          "email": "@email",
          "worktime": "@datetime",
          "depart": {
            "departname|1": ["人力资源部", "IT部", "财务部"],
          }
        },
        "ifread|1": [1, 2],
        "toifdelete|1": [1, 2]
      }]
    }).list
  }
}

const mailCount:Function = ():number => {
  return Mock.mock({
    "count|0-150": 1
  }).count
}

const emailUserList:Function = ():User_VO => {
  return {
    code: 200,
    data: Mock.mock({
      "list|20": [{
        "uid": "@guid",
        "sex|1": [0, 1],
        "name": "@cname",
        "email": "@email",
        "worktime": "@datetime",
        "depart": {
          "departname|1": ["人力资源部", "IT部", "财务部"],
        }
      }]
    }).list
  }
}

const deleteEmail:Function = ():SuccessCode => ({ code: 200 })

export const mockMapper:{ [index:string]:any } = {
  '/api/user/login': login(),
  '/api/user/init': login(),
  '/api/user/logout': logout(),
  '/api/schedule/querySchedules': futureSchedules(),
  '/api/schedule/queryTodaySchedules': todaySchedules(),
  '/api/schedule/searchSchedules': futureSchedules(),
  '/api/schedule/addSchedule': uploadFile(),
  '/api/file/uploadFile': uploadFile(),
  '/api/documentinfo/queryDocument': officialList(),
  '/api/documentinfo/searchDocument': officialList(),
  '/api/email/queryReceiveEmail': inboxList(),
  '/api/email/queryDraft': draftList(),
  '/api/email/querySendEmail': draftList(),
  '/api/email/selectNotReadCount': mailCount(),
  '/api/email/getUser': emailUserList(),
  '/api/email/deleteEmail': deleteEmail(),
}