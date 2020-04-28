import Mock from 'mockjs'

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

const inboxList:Function = ():Array<any> => {
  return Mock.mock({
    "list|10": [{
      "messageid": "@guid",
      "title": "@ctitle",
      "sendtime": "@datetime",
      "fromuser": {
        "id": "@guid",
        "sex|1": [0, 1],
        "name": "@cname",
        "depart": {
          "departName|1": ["人力资源部", "IT部", "财务部"],
        }
      },
      "ifread|1": [1, 2],
      "toifdelete|1": [1, 2]
    }]
  }).list
}

const mailCount:Function = ():number => {
  return Mock.mock({
    "count|0-150": 1
  }).count
}

export const mockMap:{ [index: string]:any } = {
  '/mock/officialList': officialList(),
  '/mock/inboxList': inboxList(),
  '/mock/mailCount': mailCount(),
}