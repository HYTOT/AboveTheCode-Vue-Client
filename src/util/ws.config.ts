// 配置 ip地址、端口
const [
  protocol,
  path,
  port,
] = [
  location.protocol === 'https:'
    ? 'wss://'
    : 'ws://',
  'www.lqx542.top',
  90,
]

export const wsBaseUrl = `${protocol}${path}:${port}/socket/`

// export const wsBaseUrl = `ws://www.lqx542.top:90/socket/`