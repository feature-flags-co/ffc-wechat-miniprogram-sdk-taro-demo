import ffcClient from "ffc-wechat-miniprogram-sdk";

export const flagsDefaultValues = {
  // 设置将会用到的，所有的开关的默认值
  // 设置以后即便 SDK 和敏捷开关服务器间网络连接出现问题，仍能够按照默认值来显示相关功能
  // '开启一键投递': 'false'
}

export const createFlagsProxy = () => {
  return new Proxy({}, {
    get(target: Object, prop: string, receiver: Object) {
      console.log(prop);
        const variation = ffcClient.variation(prop, flagsDefaultValues[prop] || '');

        // 如果你们所有返回值都是 true or false 的话可以使用下边四行代码
        if (variation.toLowerCase() === 'false') {
          return false;
        }

        if (variation.toLowerCase() === 'true') {
          return true;
        }

        return variation;
    }
  })
}
