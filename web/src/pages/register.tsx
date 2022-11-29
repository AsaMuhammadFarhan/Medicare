import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import { SimpleFooter } from "../components/Footer";
import Iconify from "../components/Iconify";
import Logo from "../components/Logo";
import { OriginalMetaTags } from "../components/MetaTags";
import NextChakraImage from "../components/NextChakraImage";
import { NextChakraLinkWithHover } from "../components/NextChakraLink";
import { Rating } from "../components/Rating";
import { useRegisterMutation } from "../generated/graphql";
import themeColor from "../utils/color";
import { createUrqlClient } from "../utils/createUrqlClient";

const RegisterPage = () => {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  const [isSubmit, setSubmit] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorField, setErrorField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [, register] = useRegisterMutation();

  const handleClickSignUp = () => {
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
      router.push("/pasien/welcome");
    })
  }

  return (
    <Flex
      bgColor={themeColor.background}
      alignItems="center"
      direction="column"
      minH="100vh"
      w="100%"
      h="100%"
    >
      <OriginalMetaTags pageName="Register" />
      <Box
        maxW="1214px"
        w="100%"
      >
        <HStack
          direction="row"
          spacing="48px"
          py="80px"
        >
          {/* RIGHT SEGMENT */}
          <Center
            display={["none", "none", "flex"]}
            px={["", "", "24px"]}
            w="100%"
          >
            <VStack spacing="8">
              <Stack
                direction="row"
                fontSize="24px"
                spacing="12px"
              >
                <Flex boxSize="24px" flexShrink={0}>
                  <Iconify icon="bxs:quote-alt-left" />
                </Flex>
                <Heading fontWeight="medium" textAlign="center">
                  Kesehatan. Nikmat yang hanya bisa dilihat oleh orang yang sakit.
                </Heading>
                <Flex boxSize="24px" flexShrink={0}>
                  <Iconify icon="bxs:quote-alt-right" />
                </Flex>
              </Stack>
              <VStack
                alignItems="center"
                spacing="16px"
              >
                <Flex
                  position="relative"
                  overflow="hidden"
                  flexShrink={0}
                  boxSize="64px"
                  rounded="full"
                >
                  <NextChakraImage
                    objectFit="cover"
                    src="https://i.pinimg.com/originals/8c/da/c4/8cdac45ae15fd9f28eb9518130eded60.png"
                    title="Couple Doctor"
                    alt="Couple Doctor"
                    boxSize="64px"
                  />
                </Flex>
                <Stack textAlign="center" spacing="2px" alignItems="center">
                  <Text fontSize="md" fontWeight="medium" color={themeColor.chakraBlue10}>
                    Muhammad Tomen Jefri
                  </Text>
                  <Text fontWeight="medium" fontSize="sm" color={themeColor.chakraBlue10}>
                    sipalingmotivator@dibimbing.id
                  </Text>
                  <Rating defaultValue={5} />
                </Stack>
              </VStack>
            </VStack>
          </Center>
          {/* LEFT SEGMENT */}
          <Flex
            borderRadius="8px"
            bgColor="white"
            boxShadow="md"
            p="32px 40px"
            w="100%"
          >
            <Stack
              spacing="32px"
              w="100%"
            >
              <Stack spacing="6" align="center">
                <Logo />
                <Stack spacing="3" textAlign="center">
                  <Heading fontSize="24px">
                    Create an account
                  </Heading>
                  <HStack justify="center" spacing="1">
                    <Text color="muted">Already have an account?</Text>
                    <NextChakraLinkWithHover href="/login">
                      <Button variant="link" colorScheme="blue">
                        Log in
                      </Button>
                    </NextChakraLinkWithHover>
                  </HStack>
                </Stack>
              </Stack>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl
                    isInvalid={errorField === "username"}
                    isRequired
                  >
                    <FormLabel>
                      Name
                    </FormLabel>
                    <Input
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="Username"
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
                    <FormLabel>
                      Email
                    </FormLabel>
                    <Input
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="false"
                      placeholder="Email"
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
                    <FormLabel>
                      Password
                    </FormLabel>
                    <InputGroup>
                      <InputRightElement>
                        <Button
                          onClick={onToggle}
                          variant="ghost"
                        >
                          <Flex
                            color={themeColor.chakraBlue6}
                            fontSize="24px"
                            boxSize="24px"
                            flexShrink={0}
                          >
                            <Iconify boxSize="24px" icon={isOpen ? "bx:hide" : "bx:show"} />
                          </Flex>
                        </Button>
                      </InputRightElement>
                      <Input
                        onChange={(event) => setPassword(event.target.value)}
                        type={isOpen ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="false"
                        value={password}
                        name="new-password"
                      />
                    </InputGroup>
                    <FormHelperText color="muted">
                      At least 8 characters long
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    isInvalid={errorField === "passwordConfirmation"}
                    isRequired
                  >
                    <FormLabel>
                      Confirmation Password
                    </FormLabel>
                    <Input
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      value={passwordConfirmation}
                      placeholder="Confirm Password"
                      autoComplete="false"
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
                  Create Account
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </HStack>
      </Box>

      <SimpleFooter />
    </Flex>
  )
}

export default withUrqlClient(createUrqlClient)(RegisterPage);