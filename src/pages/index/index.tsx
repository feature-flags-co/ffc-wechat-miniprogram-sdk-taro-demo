import Taro from "@tarojs/taro";
import { useRecoilValue } from "recoil";
import { ffcFlagsState } from "@/atoms";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";

export default () => {
  const ffcFlags = useRecoilValue(ffcFlagsState);
  console.log("---------------ffcFlags", ffcFlags);
  return (
    <View>
      <Text>Hello world</Text>
      {ffcFlags["开启一键投递"] && <Text>受敏捷开关控制的内容</Text>}
      <Button
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/personal/index?id=123&name=张三",
          });
        }}
      >
        跳转页面并传参
      </Button>
    </View>
  );
};
