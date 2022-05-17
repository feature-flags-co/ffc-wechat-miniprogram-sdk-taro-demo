/*
 * @Author: kl
 * @email: qkeliang@163.com
 * @Date: 2022-05-17 15:04:56
 * @Description:
 * @LastEditors: kl
 */

import { useEffect } from "react";
import ffcClient, { ICustomizedProperty, IFeatureFlag, IFeatureFlagChange } from "ffc-wechat-miniprogram-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import { mockUserInfoState, ffcFlagsState } from "@/atoms";
import { createFlagsProxy, flagsDefaultValues } from "./ffcutils";


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
      // 通过 bootstrap 参数传入默认值
      bootstrap: Object.keys(flagsDefaultValues).map(k => ({
        id: k,
        variation: flagsDefaultValues[k]
      })) as IFeatureFlag[]
    });

    if (!Object.keys(ffcFlags)?.length) {
      setFfcFlags(createFlagsProxy());
    }

    ffcClient.on("ff_update", (changes: IFeatureFlagChange[]) => {
      if (changes.length) {
        const flags = createFlagsProxy();
        setFfcFlags(() => flags);
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
