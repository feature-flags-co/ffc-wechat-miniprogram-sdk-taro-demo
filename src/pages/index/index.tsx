import Taro from "@tarojs/taro";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { ffcFlagsState } from "@/atoms";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";
import { mockUserInfoState } from "@/atoms";
//import ffcClient, { ICustomizedProperty } from "../../ffc-wechat-miniprogram-sdk";
import ffcClient, { ICustomizedProperty } from "ffc-wechat-miniprogram-sdk";

const getCustomizedPropertiesByUserInfo = (
  userInfo: any
): ICustomizedProperty[] => {
  let result = [];
  for (let [key, value] of Object.entries(userInfo)) {
    if (
      ["number", "string", "boolean"].includes(typeof value) &&
      value !== ""
    ) {
      result.push({
        // @ts-ignore
        name: key,
        // @ts-ignore
        value: `${value}`,
      });
    }
  }
  return result;
};

export default () => {
  const userInfo = useRecoilValue<any>(mockUserInfoState);

  const identify = () => {
    if (!!userInfo?.userId) {
      console.log('identif1');
      ffcClient.identify({ 
        userName: userInfo?.firstName || (userInfo?.displayName as string),
        id: `${userInfo?.userId}`,
        customizedProperties: getCustomizedPropertiesByUserInfo(userInfo),
      });
    }
  };

  const ffcFlags = useRecoilValue(ffcFlagsState);
  console.log("---------------ffcFlags", ffcFlags);
  return (
    <View>
      <Text>Hello world {ffcFlags["开关5"]}</Text>
      {ffcFlags["开关5"] && <Text>受敏捷开关控制的内容</Text>}
      <Button
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/personal/index?id=123&name=张三",
          });
        }}
      >
        跳转页面并传参
      </Button>
      <Text className="dt">{new Date().toISOString()}</Text>
      <Button
        onClick={() => identify()}
      >
        Identify
      </Button>
    </View>
  );
};
