import { atom } from "recoil";

export const ffcFlagsState = atom({
  key: "ffcFlagsState",
  default: {},
});

export const mockUserInfoState = atom({
  key: "mockUserInfoState",
  default: {
    userId: 123,
    firstName: "秦柯",
    position: "产品研发部-前端工程师",
    positionTags: "",
    receiveEmail: true,
    recommendMyself: true,
    workEmail: "kl@meituan.com",
  },
});
