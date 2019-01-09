import React from "react";
import Swipes from "react-simple-swipe";

const IMAGES = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"];

class App extends React.Component {
  state = {
    index: 0,
    transitionTime: 0
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Swipes
          render={() => {
            return IMAGES.map(src => {
              return (
                <img
                  key={src}
                  src={src}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                  }}
                />
              );
            });
          }}
          width={500}
          height={300}
          index={this.state.index}
          transitionTime={this.state.transitionTime}
          onIndexChange={(index, transitionTime) => {
            this.setState({
              index,
              transitionTime
            });
          }}
          onTransitionComplete={() => {
            this.setState({
              transitionTime: 0
            });
          }}
        />
      </div>
    );
  }
}

export default App;
