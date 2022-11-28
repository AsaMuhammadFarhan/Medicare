import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import { NextChakraLink } from "../components/NextChakraLink";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const LoginPage = () => {
  const router = useRouter();
  const [isSubmit, setSubmit] = useState(false);

  const [usernameorEmail, setUsernameorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorField, setErrorField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [, login] = useLoginMutation();

  const handleClickLogin = () => {
    setSubmit(true);
    login({
      usernameorEmail,
      password
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        setSubmit(false);
        return;
      }
      if (result.data?.login.errors) {
        setErrorField(result.data.login.errors[0].field);
        setErrorMessage(result.data.login.errors[0].message);
        setSubmit(false);
        return;
      }
      setSubmit(false);
      router.push("/");
    })
  }

  return (
    <Flex minH="100vh" w="100%" justify="center" alignItems="center" bgColor="gray.200" p="40px">
      <Stack spacing="48px" alignItems="center">
        <Stack spacing="8px" alignItems="center">
          <Text fontSize="32px" fontWeight={700}>
            Login to your account
          </Text>
          <Text>
            <NextChakraLink href="/register">
              or sign up if you don't have one
            </NextChakraLink>
          </Text>
        </Stack>
        <Stack minW="400px" spacing="16px" borderRadius="8px" bgColor="white" p="16px">
          <FormControl isInvalid={errorField === 'usernameOrEmail'}>
            <FormLabel>Username or Email</FormLabel>
            <Input
              name="usernameorEmail"
              value={usernameorEmail}
              onChange={(event) => setUsernameorEmail(event.target.value)}
            />
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errorField === 'password'}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="blue"
            isLoading={isSubmit}
            onClick={() => handleClickLogin()}
          >
            Login
          </Button>
          <Text fontSize="12px">
            Don't have account?{" "}
            <NextChakraLink href="/register">
              Sign up
            </NextChakraLink>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default withUrqlClient(createUrqlClient)(LoginPage);