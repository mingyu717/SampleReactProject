import React from "react";
import GeneralErrorPage from "containers/GeneralErrorPage";
import { logError } from "utils/logUtils";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({ isError: true });
    logError(error, info);
  }

  render() {
    if (this.state.isError) {
      return <GeneralErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
