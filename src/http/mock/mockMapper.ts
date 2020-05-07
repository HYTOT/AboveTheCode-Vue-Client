import Mock from 'mockjs'

const logout:Function = ():any => {
  return { code: 200 }
}

const officialList:Function = ():Array<any> => {
  return Mock.mock({
    "list|10": [{
      "id": "@guid",
      "title": "@ctitle",
      "content": "@cparagraph",
      "documentTime": "@datetime",
      "createUser": {
        "id": "@guid",
        "sex|1": [0, 1],
        "name": "@cname",
        "depart": {
          "departName|1": ["人力资源部", "IT部", "财务部"],
        }
      }
    }]
  }).list
}

const inboxList:Function = ():any => {
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
        "name": "张三",
        "email": "3123321@163.com",
        "worktime": "2017-08-22 00:00:00",
        "depart": {
          "departName": "IT部",
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

const mailCount:Function = ():number => {
  return Mock.mock({
    "count|0-150": 1
  }).count
}

const deleteEmail:Function = ():any => {
  return { code: 200 }
}

export const mockMapper:{ [index: string]:any } = {
  '/api/user/logout': logout(),
  '/mock/officialList': officialList(),
  '/api/email/queryReceiveEmail': inboxList(),
  '/api/email/selectNotReadCount': mailCount(),
  '/api/email/deleteEmail': deleteEmail(),
}