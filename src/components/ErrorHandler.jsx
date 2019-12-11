import React, { Component } from "react";
import Error from "./Error.jsx";

class ErrorHandler extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(
      "Error has been caught in your app",
      `error: ${error.toString()}`,
      `component: ${info.componentStack}`
    );
  }
  render() {
    if (this.state.hasError) {
      return <Error />;
    }
    return this.props.children;
  }
}

export default ErrorHandler;
