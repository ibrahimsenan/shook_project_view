import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

 interface Props{
  reconnectFunction: ()=> void
}

const InterAccessMessage:React.FC<Props> =({reconnectFunction})=> {
  return (
    <View
      style={{
        width: '100%',
        paddingRight: '3%',
        paddingLeft: '3%',
        height: 10 * 5,
        backgroundColor: '#484848',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Text style={{color: "#ffffff", fontWeight: '400'}}>
        No Internet Connection!
      </Text>
      <TouchableOpacity
        onPress={reconnectFunction }>
        <Text style={{color: 'orange', fontWeight: '500'}}>Reconnect</Text>
      </TouchableOpacity>
    </View>
  );
}

export default InterAccessMessage