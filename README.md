# React-Native-Generator-Plugin
Adobe XD Plugin that generates React Native components directly from design.

![Demo GIF](https://github.com/hossamnasser938/React-Native-Generator-Plugin/blob/master/plugin_readme_demo.gif)

Component code generated in the video/GIF:

```js
import React from 'react';
import {
  View,
  Text
} from 'react-native';

export default () => {
  return (
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 20,
        "paddingTop": 87.5,
        "flex": 1
      }
    } >
    <View style = {
      {
        "backgroundColor": "rgba(0, 0, 0, 255)",
        "width": 374,
        "height": 4
      }
    }
    />
    <Text style = {
      {
        "fontFamily": "Helvetica Neue",
        "fontSize": 44,
        "letterSpacing": 0.2,
        "color": "rgba(0, 0, 0, 255)",
        "marginTop": 22.5
      }
    } > Log In </Text>
    <View style = {
      {
        "alignItems": "flex-start",
        "marginTop": 23
      }
    } >
    <Text style = {
      {
        "fontFamily": "Helvetica Neue",
        "fontSize": 20,
        "letterSpacing": 0.2,
        "color": "rgba(187, 187, 187, 255)"
      }
    } > Your Email </Text>
    <View style = {
      {
        "marginTop": 20.95,
        "opacity": 0.28,
        "backgroundColor": "rgba(0, 0, 0, 255)",
        "width": 374,
        "height": 4
      }
    }
    />
    </View>
    <View style = {
      {
        "alignItems": "flex-start",
        "marginTop": 23.05
      }
    } >
    <Text style = {
      {
        "fontFamily": "Helvetica Neue",
        "fontSize": 20,
        "letterSpacing": 0.2,
        "color": "rgba(187, 187, 187, 255)"
      }
    } > Password </Text>
    <View style = {
      {
        "marginTop": 20.95,
        "opacity": 0.28,
        "backgroundColor": "rgba(0, 0, 0, 255)",
        "width": 374,
        "height": 4
      }
    }
    />
    </View>
    <Text style = {
      {
        "fontFamily": "Helvetica Neue",
        "fontSize": 20,
        "letterSpacing": 0.2,
        "color": "rgba(113, 96, 96, 255)",
        "marginStart": 215,
        "marginTop": 23.05
      }
    } > Forget Password ? </Text>
    <View style = {
      {
        "alignItems": "flex-start",
        "marginTop": 23
      }
    } >
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 140,
        "paddingTop": 11,
        "width": 374,
        "height": 63,
        "borderRadius": 15,
        "borderWidth": 1,
        "borderColor": "rgba(112, 112, 112, 255)",
        "backgroundColor": "rgba(0, 0, 0, 255)"
      }
    } >
    <Text style = {
      {
        "fontFamily": "Helvetica Neue",
        "fontSize": 32,
        "letterSpacing": 0.2,
        "color": "rgba(255, 255, 255, 255)"
      }
    } > Log In </Text>
    </View>
    </View>
    <Text style = {
      {
        "fontFamily": "Helvetica Neue",
        "fontSize": 18,
        "letterSpacing": 0.2,
        "color": "rgba(173, 164, 164, 255)",
        "marginStart": 57,
        "marginTop": 95
      }
    } > Or
    continue with social account </Text>
      <View style = {
        {
          "alignItems": "flex-start",
          "marginTop": 40
        }
      } >
      <View style = {
        {
          "flexDirection": "row",
          "alignItems": "flex-start",
          "paddingStart": 65,
          "paddingTop": 7.43,
          "width": 374,
          "height": 49,
          "borderRadius": 15,
          "borderWidth": 1,
          "borderColor": "rgba(112, 112, 112, 255)",
          "backgroundColor": "rgba(255, 255, 255, 255)"
        }
      } >

      {
        /* <Path /> {Path is not supported. It can be exported as Svg} */ }
      <View style = {
        {
          "width": 15.99,
          "height": 33.22,
          "backgroundColor": "#000000"
        }
      }
    />
    <Text style = {
      {
        "fontFamily": "Helvetica Neue",
        "fontSize": 18,
        "letterSpacing": 0.2,
        "color": "rgba(0, 0, 0, 255)",
        "marginStart": 31.01,
        "marginTop": 6.57
      }
    } > Continue with Facebook </Text>
    </View>
    </View>
    <View style = {
      {
        "alignItems": "flex-start",
        "marginTop": 15
      }
    } >
    <View style = {
      {
        "flexDirection": "row",
        "alignItems": "flex-start",
        "paddingStart": 58,
        "paddingTop": 12,
        "width": 374,
        "height": 49,
        "borderRadius": 15,
        "borderWidth": 1,
        "borderColor": "rgba(112, 112, 112, 255)",
        "backgroundColor": "rgba(255, 255, 255, 255)"
      }
    } >

    {
      /* <Path /> {Path is not supported. It can be exported as Svg} */ }
    <View style = {
      {
        "width": 32.47,
        "height": 25.03,
        "backgroundColor": "#000000"
      }
    }
    />
    <Text style = {
      {
        "fontFamily": "Helvetica Neue",
        "fontSize": 18,
        "letterSpacing": 0.2,
        "color": "rgba(0, 0, 0, 255)",
        "marginStart": 21.53,
        "marginTop": 2
      }
    } > Continue with Twitter </Text>
    </View>
    </View>
    <View style = {
      {
        "flexDirection": "row",
        "alignItems": "flex-start",
        "marginStart": 35,
        "marginTop": 71
      }
    } >
    <Text style = {
      {
        "fontFamily": "Helvetica Neue",
        "fontSize": 18,
        "letterSpacing": 0.2,
        "color": "rgba(173, 164, 164, 255)"
      }
    } > Do you have an account ? </Text>
    <Text style = {
      {
        "fontFamily": "Helvetica Neue",
        "fontSize": 18,
        "letterSpacing": 0.2,
        "color": "rgba(0, 0, 0, 255)"
      }
    } > SIGN UP </Text>
    </View>
    </View>

  );
};
```

- You can use it to generate components for

  - a selected item(s),
  - an artboard(screen).
  - the entire document(all artboards in the document). For each artboard, a file will be generated that holds component code for that artboard.

- Currently unsupported node types:

  - Polygon.
  - Path.
  - BooleanGroup.
  - LinkedGraphic.

- Built using JavaScript through [Adobe XD Plugin APIs](https://adobexdplatform.com/plugin-docs/).

- External tools used:

  - **webpack** to bundle the plugin code.
  - **jest** to test complex parts of the Plugin.
  - **js-beautify** to beatify generated code.

- Pull Requests and Issues are welcome.

- Licensed under **MIT**.
