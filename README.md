# react-swipes

>

[![NPM](https://img.shields.io/npm/v/react-swipes.svg)](https://www.npmjs.com/package/react-swipes) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![](swiping.gif)


## Install

```bash
yarn add react-swipes
```

## Usage

```tsx
import React from "react";
import Swipes from "react-swipes";

class Example extends React.Component {
  state = {
    index: 0,
    transitionTime: 0
  };
  render() {
    return (
      <Swipes
        images={["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"]}
        width={400}
        height={400}
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
```

## License

BSD © [browniefed](https://github.com/browniefed)
