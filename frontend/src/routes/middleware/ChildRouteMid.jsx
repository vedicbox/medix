import { env_props } from "env";
import { Helmet } from "react-helmet";

function ChildRouteMiddleware(props) {
  const { baseProps } = props;

  return (
    <>
      <Helmet>
        <title>{`${env_props.APP_NAME} - ${baseProps.title || ""}`}</title>
      </Helmet>
      {baseProps.element}
    </>
  );
}

export default ChildRouteMiddleware;
