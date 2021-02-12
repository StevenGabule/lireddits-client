import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useForgotPasswordMutation } from "../generated/graphql";
import { useState } from "react";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const router = useRouter();
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant={"small"}>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              If an account with that email exists, we sent you can email
            </Box>
          ) : (
            <Form>
              <InputField
                name={"email"}
                placeholder={"Email"}
                label={"Email"}
              />

              <Button
                isFullWidth={true}
                isLoading={isSubmitting}
                type={"submit"}
                colorScheme={"teal"}
                mt={3}
              >
                Send email
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
