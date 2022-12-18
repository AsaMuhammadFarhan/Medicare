import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import Iconify from "../components/Iconify";
import { OriginalMetaTags } from "../components/MetaTags";
import { useCreateAdminMutation, useIsThereAdminQuery } from "../generated/graphql";
import themeColor from "../utils/color";
import { createUrqlClient } from "../utils/createUrqlClient";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.query;
//   return {
//     props: {
//       id,
//     },
//   };
// };

export const BuildAppPage = () => {
  const router = useRouter();

  const [isThereAdmin] = useIsThereAdminQuery();
  const isLoaded = isThereAdmin.fetching === false;

  const { isOpen, onToggle } = useDisclosure();
  const [isSubmit, setSubmit] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorField, setErrorField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [, createAdmin] = useCreateAdminMutation();

  const handleClickSignUp = () => {
    setSubmit(true);
    if (password !== passwordConfirmation) {
      setErrorField('passwordConfirmation');
      setErrorMessage("password confirmation doesn't same");
      setSubmit(false);
      return;
    }
    createAdmin({
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
      if (result.data?.createAdmin.errors) {
        setErrorField(result.data.createAdmin.errors[0].field);
        setErrorMessage(result.data.createAdmin.errors[0].message);
        setSubmit(false);
        return;
      }
      setSubmit(false);
      router.push("/admin/dashboard");
    })
  }

  if (isLoaded && isThereAdmin.data?.isThereAdmin === true) {
    router.replace("/");
  }

  return (
    <Flex
      bgColor={themeColor.chakraBlue6}
      justify="center"
      p="80px 62px"
      minH="100vh"
      w="100%"
      h="100%"
    >
      <OriginalMetaTags pageName="Build App" />
      <Stack
        alignItems="center"
        spacing="24px"
        color="white"
        maxW="816px"
        mx="16px"
      >
        <Text>
          Build App Page
        </Text>
        {isLoaded && isThereAdmin.data?.isThereAdmin === false ? (
          <>
            <Text>
              Buat akun ADMIN dengan mengisi form dibawah!
            </Text>
            <Stack spacing="6">
              <Stack spacing="5" w="400px">
                <FormControl
                  isInvalid={errorField === "username"}
                  isRequired
                >
                  <Input
                    _placeholder={{
                      color: "whiteAlpha.600"
                    }}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Username"
                    variant="flushed"
                    value={username}
                    type="text"
                  />
                  <FormErrorMessage>
                    {errorMessage}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={errorField === "email"}
                  isRequired
                >
                  <Input
                    _placeholder={{
                      color: "whiteAlpha.600"
                    }}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="false"
                    placeholder="Email"
                    variant="flushed"
                    value={email}
                  />
                  <FormErrorMessage>
                    {errorMessage}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={errorField === "password"}
                  isRequired
                >
                  <InputGroup>
                    <InputRightElement>
                      <Button
                        _hover={{
                          bgColor: "transparent"
                        }}
                        onClick={onToggle}
                        variant="ghost"
                      >
                        <Flex
                          fontSize="24px"
                          boxSize="24px"
                          flexShrink={0}
                          color="white"
                        >
                          <Iconify
                            icon={isOpen
                              ? "bx:hide"
                              : "bx:show"
                            }
                            boxSize="24px"
                          />
                        </Flex>
                      </Button>
                    </InputRightElement>
                    <Input
                      _placeholder={{
                        color: "whiteAlpha.600"
                      }}
                      onChange={(event) => setPassword(event.target.value)}
                      type={isOpen ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Password"
                      name="new-password"
                      variant="flushed"
                      value={password}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl
                  isInvalid={errorField === "passwordConfirmation"}
                  isRequired
                >
                  <Input
                    _placeholder={{
                      color: "whiteAlpha.600"
                    }}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    autoComplete="false"
                    variant="flushed"
                    type="password"
                  />
                  <FormErrorMessage>
                    {errorMessage}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Button
                onClick={handleClickSignUp}
                isLoading={isSubmit}
                colorScheme="blue"
                type="submit"
              >
                Create Admin
              </Button>
            </Stack>
          </>
        ):(
          <></>
        )}
      </Stack>
    </Flex>
  );
}

export default withUrqlClient(createUrqlClient)(BuildAppPage);