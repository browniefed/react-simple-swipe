import React from "react";
import Swipes from "react-swipes";

class App extends React.Component {
  state = {
    index: 0,
    transitionTime: 0
  };
  render() {
    return (
      <Swipes
        images={["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"]}
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
    );
  }
}

export default App;
