import ffcClient, { IOption, IUser } from 'ffc-wechat-miniprogram-sdk';
import { Component } from 'react'
import './app.scss'

class App extends Component {

  componentDidMount () {
    const option: IOption = {
      secret: "YThmLWRmZjUtNCUyMDIxMDkxNzA3NTYyMV9fMl9fMjJfXzExNl9fZGVmYXVsdF82NTM3Mg==", // replace with your won secret
      anonymous: true
    };

    // initialization client
    ffcClient.init(option);
  }

  componentDidShow () {
    console.log(ffcClient.getAllFeatureFlags())
  }

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
