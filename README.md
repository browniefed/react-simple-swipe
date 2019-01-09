# react-simple-swipe

[![NPM](https://img.shields.io/npm/v/react-simple-swipe.svg)](https://www.npmjs.com/package/react-simple-swipe) 

![](swiping.gif)

## Description

This is a simple web and mobile compatible swiping component. It's completely controlled so you will need to handle the index changing, and transition time of the durations as well as controlling the width/height of your images.

You can simply copy and paste some of the actions below.


## Install

```bash
yarn add react-simple-swipe
```

or

```bash
npm install react-simple-swipe --save
```

## Usage

```tsx
import React from "react";
import Swipes from "react-simple-swipe";

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

MIT © [browniefed](https://github.com/browniefed)
