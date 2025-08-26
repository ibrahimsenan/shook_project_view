import React, { useEffect, useState, ReactNode } from "react";
import { SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import InternetAccessMessage from "../../shared/InternetActionService/InternetAccessMessage";
import CheckInternetAccess from "../../shared/InternetActionService/checkInternetAccess";

let intervalVar: any;

interface Props {
  children?: ReactNode; // not required
}

const InternetEvaluator: React.FC<Props> = ({ children }) => {
  const [internetFailMessage, setInternetFailMessage] = useState(false)

  const internetConnectionChecker = () => {
    intervalVar = setInterval(() => {
      CheckInternetAccess(100000, "http://google.com").then(
        (hasInternetAccess: boolean) => {
          setInternetFailMessage(!hasInternetAccess)
        },
      );
    }, 3000);
  }

  useEffect(() => {
    internetConnectionChecker();

    return () => {
      clearInterval(intervalVar)
    }
  }, [])


  return (
    <SafeAreaView>
      {internetFailMessage ?
        <Animatable.View
          animation="slideInUp"
          useNativeDriver
          delay={600}
          style={{
            position: "absolute", bottom: 0, flex: 1, width: "100%"
          }}
        >
          <InternetAccessMessage
            reconnectFunction={() => {
              setTimeout(() => {
                setInternetFailMessage(false)
              }, 100);
            }}
          />
        </Animatable.View> : null}
    </SafeAreaView>
  )
}


export default InternetEvaluator