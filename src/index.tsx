import React, { Component } from "react";

export type Props = {
  index: number;
  images: string[];
  width: number;
  height: number;
  defaultTransitionTime: number;
  transitionTime: number;
  onIndexChange: (index: number, duration: number) => void;
  onTransitionComplete: (index: number) => void;
};

export type State = {
  offset: number;
};

class Swiper extends Component<Props, State> {
  static defaultProps = {
    index: 0,
    defaultTransitionTime: 0.5
  };
  wheelTimeout?: number;
  transitionTimeout?: number;
  lastTouch = 0;
  state = {
    offset: 0
  };

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.index !== this.props.index) {
      this.transitionTo(
        this.props.index,
        this.props.transitionTime || this.props.defaultTransitionTime
      );
    }
  };

  componentWillUnmount = () => {
    clearTimeout(this.transitionTimeout);
  };

  handleTouchStart = (e: React.TouchEvent) => {
    this.lastTouch = e.nativeEvent.touches[0].clientX;
  };
  handleTouchMove = (e: React.TouchEvent) => {
    const delta = this.lastTouch - e.nativeEvent.touches[0].clientX;
    this.lastTouch = e.nativeEvent.touches[0].clientX;

    this.handleMovement(delta);
  };
  handleTouchEnd = () => {
    this.handleMovementEnd();
    this.lastTouch = 0;
  };
  handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    clearTimeout(this.wheelTimeout);
    this.handleMovement(e.deltaX);
    this.wheelTimeout = window.setTimeout(() => this.handleMovementEnd(), 100);
  };
  handleMovement = (delta: number) => {
    clearTimeout(this.transitionTimeout);

    this.setState((state, props) => {
      const maxLength = props.images.length - 1;

      let nextMovement = state.offset + delta;

      if (nextMovement < 0) {
        nextMovement = 0;
      }

      if (nextMovement > maxLength * props.width) {
        nextMovement = maxLength * props.width;
      }

      return {
        offset: nextMovement
      };
    });
  };

  handleMovementEnd = () => {
    const { offset } = this.state;
    const { index } = this.props;

    const endPosition = offset / this.props.width;
    const endPartial = endPosition % 1;
    const endingIndex = endPosition - endPartial;
    const deltaInteger = endingIndex - index;

    let nextIndex = endingIndex;

    if (deltaInteger >= 0) {
      if (endPartial >= 0.1) {
        nextIndex += 1;
      }
    } else if (deltaInteger < 0) {
      nextIndex = index - Math.abs(deltaInteger);
      if (endPartial > 0.9) {
        nextIndex += 1;
      }
    }

    this.props.onIndexChange(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)));
  };
  transitionTo = (index: number, duration: number) => {
    this.setState({
      offset: index * this.props.width
    });

    this.transitionTimeout = window.setTimeout(() => {
      this.props.onTransitionComplete(index);
    }, duration * 100);
  };
  render() {
    const { offset } = this.state;
    const { images, transitionTime } = this.props;

    return (
      <div className="App">
        <div
          className="main"
          style={{
            width: `${this.props.width}px`,
            height: `${this.props.height}px`
          }}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onWheel={this.handleWheel}
        >
          <div
            className="swiper"
            style={{
              transform: `translateX(${offset * -1}px)`,
              transitionDuration: `${transitionTime}s`
            }}
          >
            {images.map(src => {
              return <img key={src} src={src} width="100%" height="100%" />;
            })}
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Swiper;
