import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import { NextChakraLink } from "../components/NextChakraLink";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const RegisterPage = () => {
  const router = useRouter();
  const [isSubmit, setSubmit] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorField, setErrorField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [, register] = useRegisterMutation();

  const handleClickLogin = () => {
    setSubmit(true);
    if (password !== passwordConfirmation) {
      setErrorField('passwordConfirmation');
      setErrorMessage("password confirmation doesn't same");
      setSubmit(false);
      return;
    }
    register({
      input: {
        username,
        email,
        password,
        passwordConfirmation,
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        setSubmit(false);
        return;
      }
      if (result.data?.register.errors) {
        setErrorField(result.data.register.errors[0].field);
        setErrorMessage(result.data.register.errors[0].message);
        setSubmit(false);
        return;
      }
      setSubmit(false);
      router.push("/");
    })
  }

  return (
    <Flex minH="100vh" w="100%" justify="center" alignItems="center" bgColor="gray.200" p="40px">
      <Stack spacing="24px" alignItems="center">
        <Stack spacing="8px" alignItems="center">
          <Text fontSize="32px" fontWeight={700}>
            Register to create new account
          </Text>
          <Text>
            <NextChakraLink href="/login">
            or sign in if you have one
            </NextChakraLink>
          </Text>
        </Stack>
        <Stack minW="600px" spacing="16px" borderRadius="8px" bgColor="white" p="16px">
          <FormControl isInvalid={errorField === 'username'}>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errorField === 'email'}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </FormControl>
          <FormControl isInvalid={errorField === "passwordConfirmation"}>
            <FormLabel>Password Confirmation</FormLabel>
            <Input
              name="password"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
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
            Already have account?{" "}
            <NextChakraLink href="/login">
              Sign In
            </NextChakraLink>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default withUrqlClient(createUrqlClient)(RegisterPage);