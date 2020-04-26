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

export const mockMap:{ [index: string]:any } = {
  '/mock/officialList': officialList(),
}