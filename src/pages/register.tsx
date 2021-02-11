import React from "react";
import { Form, Formik } from "formik";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant={"small"}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name={"username"}
              placeholder={"Username"}
              label={"Username"}
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
