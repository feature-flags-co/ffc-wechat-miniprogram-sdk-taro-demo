import { getCurrentInstance, useRouter } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useRecoilValue } from "recoil";
import { ffcFlagsState } from "@/atoms";

export default () => {
  const { params } = useRouter<PageParams>();
  const _params = getCurrentInstance()?.router?.params;
  const ffcFlags = useRecoilValue(ffcFlagsState);

  console.log({
    params,
    _params,
  });
  return (
    <View>
      <Text>个人中心</Text>
      {ffcFlags["开启找牛人"] && <Text>受敏捷开关控制的开启找牛人</Text>}
    </View>
  );
};
