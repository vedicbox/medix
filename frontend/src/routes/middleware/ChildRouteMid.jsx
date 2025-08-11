import { env_props } from "env";
import PropTypes from 'prop-types'; // Add prop type validation
import { Helmet } from "react-helmet";

function ChildRouteMiddleware(props) {
  const { baseProps } = props;

  // Add null checks and default values
  const pageTitle = baseProps?.title || "";
  const pageElement = baseProps?.element || null;

  return (
    <>
      <Helmet>
        <title>{`${env_props.APP_NAME}${
          pageTitle ? ` - ${pageTitle}` : ""
        }`}</title>
      </Helmet>
      {pageElement}
    </>
  );
}

// Add prop validation
ChildRouteMiddleware.propTypes = {
  baseProps: PropTypes.shape({
    title: PropTypes.string,
    element: PropTypes.node.isRequired,
  }).isRequired,
};

export default ChildRouteMiddleware;
