import Taro from "@tarojs/taro";
import { RecoilRoot } from "recoil";
import { useInitFFC } from "@/hooks";
import { Initializer } from "@/components/Initializer";
import "./app.scss";

// class App extends Component {

//   componentDidMount () {
//     const option: IOption = {
//       secret: "YThmLWRmZjUtNCUyMDIxMDkxNzA3NTYyMV9fMl9fMjJfXzExNl9fZGVmYXVsdF82NTM3Mg==", // replace with your won secret
//       anonymous: true
//     };

//     // initialization client
//     ffcClient.init(option);
//   }

//   componentDidShow () {
//     console.log(ffcClient.getAllFeatureFlags())
//   }

//   componentDidHide () {}

//   componentDidCatchError () {}

//   // this.props.children 是将要会渲染的页面
//   render () {
//     return this.props.children
//   }
// }

const App = ({ children }) => {
  return (
    <RecoilRoot>
      <Initializer />
      {children}
    </RecoilRoot>
  );
};

export default App;
