import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const PandaEatingAnimation = () => {
    const dimensions = Dimensions.get('window');

    const pandaHtmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
${`
html, body, .container {
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
}
body {
  // background: #ABD583;
}
.container {
  overflow: hidden;
}
.panda {
  position: absolute;
  width: 150px;
  height: 180px;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, 98px) translateX(20px);
}
.body {
  position: absolute;
  width: 95px;
  height: 100px;
  background: #333;
  top: 80px;
  left: 5px;
  border-radius: 30% 70% 30% 30% / 70% 70% 30% 30%;
}
.belly {
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  overflow: hidden;
}
.belly:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 57px;
  background: #fff;
  border-radius: 50% 50% 30% 30% / 30% 30% 40% 40% ;
  right: 0;
  bottom: 0;
}
.leg {
  position: absolute;
  width: 70px;
  height: 30px;
  left: 25px;
  bottom: -2px;
  background: #333;
  border-radius: 15px 55px 50px 15px / 50% 60% 5px 50%;
}
.foot {
  position: absolute;
  width: 16px;
  height: 32px;
  background: #333;
  right: -6px;
  bottom: 1px;
  border-radius: 60% 40% 4px 60% / 20px 8px 4px 2px;
}
.leg.left {
  left: 35px;
  bottom: 5px;
}
.arm, .hand, .forearm {
  position: absolute;
  width: 30px;
  height: 60px;
  background: #333;
  border-radius: 50% 50% / 15px;
  transform-origin: 50% 15px;
}
.forearm, .hand {
  top: calc(100% - 30px);
}
.arm {
  top: 14px;
  height: 60px;
}
.hand {
  height: 50px;
}
.hand:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
}
.arm.left {
  top: 0;
  left: 30px;
  transform: rotate(-70deg);
}
.arm.right {
  left: 10px;
  transform: rotate(-60deg);
}
.arm.right .forearm {
  transform: rotate(-20deg);
}
.arm.right .hand {
  transform: rotate(-20deg);
}
.arm.left .forearm {
  transform: rotate(-40deg);
}
.arm.left .hand {
  transform: rotate(-20deg);
}
.head {
  position: absolute;
  background: #fff;
  width: 110px;
  height: 100px;
  bottom: 85%;
  left: -6%;
  border-radius: 50% 50% 40px 45px / 50% 50% 35% 35%;
}
.head.front {
  background: transparent;
  overflow: hidden;
}
.face {
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
}
.eye {
  position: absolute;
  width: 40px;
  height: 22px;
  background: #333;
  border-radius: 50%;
  top: 40px;
}
.eye:after {
  position: absolute;
  content: "";
  width: 5px;
  height: 5px;
  background: #393939;
  border-radius: 50%;
  top: 36%;
}
.eye.right {
  right: 43%;
  transform: rotate(-50deg);
}
.eye.right:after {
  right: 15px;
}
.eye.left {
  right: 3%;
  transform: rotate(50deg);
}
.eye.left:after {
  left: 15px;
}
.ear {
  position: absolute;
  width: 30px;
  height: 30px;
  background: #333;
  border-radius: 50%;
}
.ear.left {
  top: -2px;
  left: 2px;
}
.ear.right {
  top: -2px;
  right: 2px;
}
.nose {
  position: absolute;
  width: 18px;
  height: 10px;
  top: 70%;
  left: 50%;
  background: #333;
  border-radius: 50% / 30% 30% 70% 70%;
}
.nose:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
}
.mustache {
  position: absolute;
  content: "";
  width: 10px;
  height: 6px;
  border: 2px solid #333;
  background: #fff;
  border-top: 0;
  border-radius: 0 0 50% 50% / 0 0 60% 60%;
  top: 95%;
}
.mustache.left {
  right: 48%;
  border-left: 2px solid transparent;
}
.mustache.right {
  left: 48%;
  border-right: 2px solid transparent;
}
.mouth {
  position: absolute;
  width: 18px;
  height: 20px;
  bottom: 0px;
  left: 50%;
  box-sizing: border-box;
  border-bottom: 14px solid #fff;
}
.mouth:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  border: 2px solid #555;
  border-top: 0;
  border-radius: 0 0 3px 3px;
  box-sizing: border-box;
}
.bamboo {
  position: absolute;
  font-size: 0;
  width: 14px;
  box-sizing: border-box;
  transform-origin: 50% 100%;
}
.bamboo.joint2 {
  height: 166px;
}
.bamboo .joint {
  position: relative;
  background: #60BC67;
  width: calc(100% - 6px);
  height: 80px;
  margin: auto;
}
.bamboo .joint:first-child {
  margin-top: 3px;
}
.bamboo .joint:before, .bamboo .joint:after {
  position: absolute;
  content: ""; 
  width: calc(100% + 3px);
  height: 6px;
  border-radius: 3px;
  background: #509D56;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.bamboo .joint:before {
  top: 0%;
}
.bamboo .joint:after {
  top: 100%;
}
.leaf {
  position: absolute;
  width: 21px;
  height: 43px;
  transform-origin: 50% 100%;
  bottom: 0;
}
.leaf:before {
  content: "";
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 100% 0;
  background: #509D56;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
}
.leaf.light:before {
  background: #60BC67;
}
.leaf.right {
  left: -5px;
  transform: rotate(45deg) scaleX(0.7);
}
.leaf.right30 {
  transform: rotate(30deg) scaleX(0.7);
}
.leaf.right60 {
  transform: rotate(60deg) scaleX(0.7);
}
.leaf.left {
  right: -5px;
}
.leaf.left30 {
  transform: rotate(-30deg) scaleX(0.7);
}
.leaf.left60 {
  transform: rotate(-60deg) scaleX(0.7);
}
.leaf.left90 {
  transform: rotate(-90deg) scaleX(0.7);
}
.hand .bamboo {
  bottom: -40px;
  right: 50%;
  transform: translate(-50%) rotate(-90deg);
  transform-origin: 50% calc(100% - 55px);
  overflow: hidden;
}
.bamboo1 {
  bottom: 50%;
  right: 50%;
  z-index: 0;
  transform: translate(-98px, 68px);
  z-index: 0;
}
.bamboo-group {
  position: absolute;
  bottom: 50%;
}
.bamboo-group .bamboo {
  bottom: 0;
}
.bamboo-group .bamboo:nth-child(1) {
  left: 0px;
  transform: rotate(0deg);
}
.bamboo-group .bamboo:nth-child(2) {
  left: 15px;
  transform: rotate(4deg);
}
.bamboo-group .bamboo:nth-child(3) {
  left: 30px;
  transform: rotate(8deg);
}
.bamboo-group1 {
  left: 50%;
  width: 80px;
  transform: translate(110px, 70px);
}
.bamboo-group2 {
  right: 50%;
  width: 80px;
  transform: translate(-116px, 66px) scaleX(-1);
}
.bamboo-group3 {
  left: 50%;
  width: 80px;
  transform: translate(112px, 66px) scale(0.9) rotate(1deg);
  z-index: -1;
}
.bamboo-group4 {
  right: 50%;
  width: 80px;
  transform: translate(-122px, 66px) scale(0.9) scaleX(-1) rotate(1deg);
  z-index: -1;
}
.bamboo-group4 .bamboo:nth-child(4) {
  left: -24px
}
.dark .joint:before, .dark .joint:after, .dark .leaf:before {
  background: #5b8224;
}
.dark .joint, .dark .leaf.light:before {
  background: #649126;
}
`}
        </style>
        <script src="https://daybrush.com/scenejs/release/latest/scene.min.js"></script>
    </head>
    <body>
<div class="container">
  <div class="bamboo joint2 bamboo1">
    <div class="joint"></div>
    <div class="joint"></div>
  </div>
  <div class="bamboo-group bamboo-group1">
    <div class="bamboo">
      <div class="joint">
        <div class="leaf left left60 light"></div>
        <div class="leaf left left30"></div>
      </div>
      <div class="joint"></div>
      <div class="joint"></div>
    </div>
    <div class="bamboo">
      <div class="joint">
        <div class="leaf left left60 light"></div>
        <div class="leaf left left30"></div>
      </div>
      <div class="joint"></div>
    </div>
    <div class="bamboo">
      <div class="joint"></div>
      <div class="joint">
        <div class="leaf right right60 light"></div>
        <div class="leaf right right90"></div>
      </div>
      <div class="joint"></div>
    </div>
  </div>
  <div class="bamboo-group bamboo-group2">
    <div class="bamboo">
      <div class="joint">
        <div class="leaf left left60 light"></div>
        <div class="leaf left left30"></div>
      </div>
      <div class="joint"></div>
      <div class="joint"></div>
    </div>
    <div class="bamboo">
      <div class="joint">
        <div class="leaf left left60 light"></div>
        <div class="leaf left left30"></div>
      </div>
      <div class="joint"></div>
    </div>
    <div class="bamboo">
      <div class="joint"></div>
      <div class="joint">
        <div class="leaf right right60 light"></div>
        <div class="leaf right right90"></div>
      </div>
      <div class="joint"></div>
    </div>
  </div>
  <div class="bamboo-group bamboo-group3 dark">
    <div class="bamboo">
      <div class="joint">
        <div class="leaf left left60 light"></div>
        <div class="leaf left left30"></div>
      </div>
      <div class="joint"></div>
      <div class="joint"></div>
    </div>
    <div class="bamboo">
      <div class="joint">
        <div class="leaf left left60 light"></div>
        <div class="leaf left left30"></div>
      </div>
      <div class="joint"></div>
    </div>
    <div class="bamboo">
      <div class="joint"></div>
      <div class="joint">
        <div class="leaf right right60 light"></div>
        <div class="leaf right right90"></div>
      </div>
      <div class="joint"></div>
    </div>
  </div>
  <div class="bamboo-group bamboo-group4 dark">
    <div class="bamboo">
      <div class="joint">
        <div class="leaf left left60 light"></div>
        <div class="leaf left left30"></div>
      </div>
      <div class="joint"></div>
      <div class="joint"></div>
    </div>
    <div class="bamboo">
      <div class="joint"><div class="leaf left left60 light"></div><div class="leaf left left30"></div></div>
      <div class="joint"></div>
    </div>
    <div class="bamboo">
      <div class="joint"></div>
      <div class="joint"><div class="leaf right right60 light"></div><div class="leaf right right90"></div></div>
      <div class="joint"></div>
    </div>
    <div class="bamboo">
      <div class="joint"><div class="leaf left left60 light"></div><div class="leaf left left30"></div></div>
      <div class="joint"></div>
    </div>
  </div>
  <div class="panda">
    <div class="body">
      <div class="arm left">
        <div class="forearm">
          <div class="hand"></div>
        </div>
      </div>
      <div class="leg left"><div class="foot"></div></div>
      <div class="belly">
      </div>
      <div class="leg right"><div class="foot"></div></div>
      <div class="head">
        <div class="ear left"></div>
        <div class="ear right"></div>
        <div class="cheek right"></div>
        <div class="face">
          <div class="eye left"></div>
          <div class="eye right"></div>
        </div>
      </div>
      <div class="arm right">
        <div class="forearm">
          <div class="hand">
            <div class="bamboo joint2">
              <div class="joint"></div>
              <div class="joint"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="head front">
        <div class="mouth"></div>
        <div class="nose">
          <div class="mustache left"></div>
          <div class="mustache right"></div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
const scene = new Scene({
  ".arm.right": {
    0: "transform: rotate(90deg)",
    1.5: "transform: rotate(-75deg)",
    8: "transform: rotate(-75deg)",
    9: "transform: rotate(90deg)",
  },
  ".arm.right .forearm": {
    0: "transform: rotate(0deg)",
    1.5: "transform: rotate(-15deg)",
    2: "transform: rotate(-25deg)",
    2.5: "transform: rotate(-15deg)",
    3: "transform: rotate(-25deg)",
    3.5: "transform: rotate(-15deg)",
    4: "transform: rotate(-25deg)",
    4.5: "transform: rotate(-15deg)",
    5: "transform: rotate(-25deg)",
    5.5: "transform: rotate(-15deg)",
    6: "transform: rotate(-25deg)",
    6.5: "transform: rotate(-15deg)",
    7: "transform: rotate(-25deg)",
    7.5: "transform: rotate(-15deg)",
    8: "transform: rotate(-25deg)",
    9: "transform: rotate(0deg)",
  },
  ".arm.right .hand": {
    0.5: "transform: rotate(0deg)",
    1.5: "transform: rotate(-60deg)",
    8: "transform: rotate(-60deg)",
    9: "transform: rotate(  0deg)",
  },
  ".arm.left": {
    0: "transform: rotate(0deg)",
    1.5: "transform: rotate(-60deg)",
    8: "transform: rotate(-60deg)",
    9: "transform: rotate(0deg)", 
  },
  ".arm.left .forearm": {
    0: "transform: rotate(-40deg)",
    1.5: "transform: rotate(-20deg)",
    2: "transform: rotate(-30deg)",
    2.5: "transform: rotate(-20deg)",
    3: "transform: rotate(-30deg)",
    3.5: "transform: rotate(-20deg)",
    4: "transform: rotate(-30deg)",
    4.5: "transform: rotate(-20deg)",
    5: "transform: rotate(-30deg)",
    5.5: "transform: rotate(-20deg)",
    6: "transform: rotate(-30deg)",
    6.5: "transform: rotate(-20deg)",
    7: "transform: rotate(-30deg)",
    7.5: "transform: rotate(-20deg)",
    8: "transform: rotate(-30deg)",
    9: "transform: rotate(-40deg)",
  },
  ".arm.left .hand": {
    0: "transform: rotate(0deg)",
    1.5: "transform: rotate(-40deg)",
    8: "transform: rotate(-40deg)",
    9: "transform: rotate(0deg)",
  },
  ".mouth": {
    0: "transform: translateY(0px)",
    0.5: "transform: translateY(9px)",
    options: {
      delay: 1,
      iterationCount: 14,
      direction: "alternate",
    },
  },
  ".hand .bamboo": {
    1.5: {
      height: "166px",
    },
    2: "height: 140px",
    2.5: "height: 140px",
    3: "height: 120px",
    3.5: "height: 120px",
    4: "height: 100px",
    4.5: "height: 100px",
    5: "height: 80px",
    5.5: "height: 80px",
    6: "height: 60px",
    6.5: "height: 60px",
    7: "height: 40px",
    7.5: "height: 40px",
    8: "height: 0px",
  },
}, {
  easing: "ease-in-out",
  selector: true,
  iterationCount: "infinite",
}).playCSS();
</script>
    </body>
    </html>
    `;

    return (
        <View style={{
            width: dimensions.width,
            height: dimensions.height * 0.15,
            alignSelf: 'center',
            flex: 1,
        }}>
            <WebView
                source={{ html: pandaHtmlContent }}
                style={{
                  backgroundColor: 'transparent',
                  flex: 1,
                }}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                scalesPageToFit={false}
                showsVerticalScrollIndicator={false}
                bounces={false}
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={false}
                mixedContentMode="compatibility"
            />
        </View>
    );
};

export default PandaEatingAnimation;