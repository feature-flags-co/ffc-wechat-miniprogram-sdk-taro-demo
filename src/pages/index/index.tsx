import ffcClient, { IFeatureFlagChange, IFlagConfig } from "ffc-wechat-miniprogram-sdk";
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

const flagConfigs: IFlagConfig[] = [
  { key: 'hello', defaultValue: 'false' },
];

export default class Index extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    flagConfigs: flagConfigs,
    hello: 'default value'
  };

  componentWillMount () {
    ffcClient.on('ff_update:hello', (change: IFeatureFlagChange) => {
      this.setState({
        hello: change.newValue
      });
    })

  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    console.log('aaaa');
    return (
      <View className='index'>
        <Text>Hello world - {this.state.hello}</Text>
      </View>
    )
  }
}
