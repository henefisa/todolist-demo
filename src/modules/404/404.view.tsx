import * as React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

import { Page404Props } from "./404.props";
import { Page404Result } from "./404.style";

const Page404: React.FC<Page404Props> = ({ title, subTitle }) => {
  return (
    <Page404Result
      status={404}
      title={title}
      subTitle={subTitle}
      extra={[
        <Link to="/">
          <Button>Back to home</Button>
        </Link>,
      ]}
    />
  );
};

export default React.memo(Page404);
