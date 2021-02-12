import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMaps";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant={"small"}>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            [{ field: "username", message: "something wrong!" }];
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name={"usernameOrEmail"}
              placeholder={"Username or Email"}
              label={"Username or Email"}
            />
            <InputField
              name={"password"}
              type={"password"}
              placeholder={"Password"}
              label={"Password"}
            />
            <Button
              isFullWidth={true}
              isLoading={isSubmitting}
              type={"submit"}
              colorScheme={"teal"}
              mt={3}
            >
              Login
            </Button>
            <Flex mt={2}>
              <NextLink href="/forgot-password">
                <Link mx={"auto"}>Click here to get new one!</Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
