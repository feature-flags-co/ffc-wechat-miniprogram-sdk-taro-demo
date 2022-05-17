/*
 * @Author: kl
 * @email: qkeliang@163.com
 * @Date: 2022-05-17 15:04:56
 * @Description:
 * @LastEditors: kl
 */

import { useEffect } from "react";
import ffcClient, { ICustomizedProperty } from "ffc-wechat-miniprogram-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import { mockUserInfoState, ffcFlagsState } from "@/atoms";

const booleanDict = {
  true: true,
  false: false,
};

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
        value,
      });
    }
  }
  return result;
};

const initFfcFlagsState = (): Object => {
  let result = ffcClient.getAllFeatureFlags();
  for (let [key, value] of Object.entries(result)) {
    result[key] = booleanDict[value];
  }
  return result;
};

export const useInitFFC = () => {
  const userInfo = useRecoilValue<any>(mockUserInfoState);
  const [ffcFlags, setFfcFlags] = useRecoilState(ffcFlagsState);
  useEffect(() => {
    ffcClient.init({
      secret:
        "OTUyLTMxOGYtNCUyMDIyMDUwOTAyMjEzNl9fMTUyX18xNzZfXzM2OF9fZGVmYXVsdF80MDA2YQ==",
      user: {
        userName: "visitor",
        id: "visitor",
      },
    });

    if (!Object.keys(ffcFlags)?.length) {
      setFfcFlags(initFfcFlagsState());
    }

    ffcClient.on("ff_update", (changes) => {
      // 监听并更新所有状态，并同步到recoil中
      if (changes?.[0]) {
        const { id, newValue } = changes[0];
        if (ffcFlags[id] !== newValue) {
          setFfcFlags((prev) => ({
            ...prev,
            [id]: booleanDict[newValue],
          }));
        }
        // 此处将数据同步到后台，才能在面板中看到开关调用统计报告（已向开发方提需求）
        ffcClient.variation(id, newValue);
      }
    });
  }, []);

  useEffect(() => {
    if (!!userInfo?.userId) {
      ffcClient.identify({
        userName: userInfo?.firstName || (userInfo?.displayName as string),
        id: `${userInfo?.userId}`,
        customizedProperties: getCustomizedPropertiesByUserInfo(userInfo),
      });
    }
  }, [userInfo]);
};

export default useInitFFC;
