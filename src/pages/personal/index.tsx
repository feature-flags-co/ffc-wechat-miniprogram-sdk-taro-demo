import { getCurrentInstance, useRouter } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

export default () => {
  const { params } = useRouter<PageParams>();
  const _params = getCurrentInstance()?.router?.params;
  // 问题在这里
  console.log({
    params,
    _params,
  });
  return (
    <View>
      <Text>个人中心</Text>
    </View>
  );
};
