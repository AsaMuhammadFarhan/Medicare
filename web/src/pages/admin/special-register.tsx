import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { SimpleFooter } from "../../components/Footer";
import Iconify from "../../components/Iconify";
import Logo from "../../components/Logo";
import { OriginalMetaTags } from "../../components/MetaTags";
import { NextChakraLinkWithHover } from "../../components/NextChakraLink";
import {
  useConfigurationSettingsByNameQuery,
  useGetAllPoliBagiansQuery,
  // useInitiationSpecialRegisterMutation,
  useSpecialRegisterMutation,
} from "../../generated/graphql";
import themeColor from "../../utils/color";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";

// ADMIN POLI DIKASIH SELECT POLI

const SpecialRegisterPage = () => {
  const toast = useToast();
  useIsAuth(["admin"]);

  const { isOpen, onToggle } = useDisclosure();
  const [isSubmit, setSubmit] = useState(false);

  const [poliBagians] = useGetAllPoliBagiansQuery();
  const availablePoli = poliBagians.data?.getAllPoliBagians?.filter((pb) => pb.user?.id === undefined) ?? [];
  const [selectedPoliId, setSelectedPoliId] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorField, setErrorField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [role, setRole] = useState("admin-poli");

  const [specialRegister] = useConfigurationSettingsByNameQuery({
    variables: {
      keywords: "special-register"
    }
  });
  // const [, initationSpecialRegister] = useInitiationSpecialRegisterMutation();
  // const handleClickMagic = () => {
  //   if (isSubmit) return;
  //   setSubmit(true);
  //   initationSpecialRegister().then((result) => {
  //     if (result.error) {
  //       toast({
  //         title: "Internal Server Error",
  //         description: result.error.message,
  //         status: "error",
  //         position: "top",
  //       })
  //       return;
  //     }

  //     if (result.data?.initiationSpecialRegister === false) {
  //       toast({
  //         title: "Admin Sudah Ada!",
  //         description: "Login sebagai admin untuk menyalakan halaman ini.",
  //         status: "info",
  //         position: "top",
  //       })
  //       return;
  //     }

  //     toast({
  //       title: "Admin Berhasil Dibuat!",
  //       description: "Gunakan user:password admin:admin untuk login.",
  //       status: "success",
  //       position: "top"
  //     });
  //   })
  // };

  const isSpecialRegisterActive: boolean = specialRegister.data?.configurationSettingsByName[0]?.value === "active";

  const [, register] = useSpecialRegisterMutation();

  const handleClickSignUp = () => {
    setSubmit(true);
    if (password !== passwordConfirmation) {
      setErrorField('passwordConfirmation');
      setErrorMessage("password confirmation doesn't same");
      setSubmit(false);
      return;
    }
    register({
      options: {
        username,
        email,
        password,
        passwordConfirmation,
      },
      role,
      poliBagianId: role === "admin-poli" ? parseInt(selectedPoliId) : undefined,
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        setSubmit(false);
        return;
      }
      if (result.data?.specialRegister.errors) {
        setErrorField(result.data.specialRegister.errors[0].field);
        setErrorMessage(result.data.specialRegister.errors[0].message);
        setSubmit(false);
        return;
      }
      toast({
        title: `Berhasil Membuat Akun ${result.data?.specialRegister.user?.username}`,
        status: "success",
        position: "top"
      })
      setSubmit(false);
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
      <OriginalMetaTags pageName="Special Register" />
      {isSpecialRegisterActive ? (
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
            <VStack spacing="4" w="100%">
              <Text
                color={themeColor.chakraBlue6}
                fontWeight={700}
                fontSize="24px"
              >
                Create Special Account
              </Text>
              <HStack alignItems="start">
                <Text>
                  Sebagai :
                </Text>
                <RadioGroup
                  onChange={(e) => setRole(e)}
                  value={role}
                >
                  <Stack>
                    {/* <Radio value="admin">
                        Admin
                      </Radio> */}
                    <Radio value="admin-poli">
                      Admin Poli
                    </Radio>
                    <Radio value="cashier">
                      Kasir
                    </Radio>
                  </Stack>
                </RadioGroup>
              </HStack>
            </VStack>
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
                      Create High Grant Privilege Account
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
                      isInvalid={selectedPoliId === "" && role === "admin-poli"}
                      isDisabled={role !== "admin-poli"}
                      isRequired
                    >
                      <FormLabel>
                        Poli Bagian
                      </FormLabel>
                      <Select
                        onChange={(event) => setSelectedPoliId(event.target.value)}
                        placeholder="Pilih Poli"
                        value={selectedPoliId}
                      >
                        {availablePoli.map((pb) => (
                          <option value={pb.id}>{pb.nama}</option>
                        ))}
                      </Select>
                    </FormControl>
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
                          autoComplete="new-password"
                          placeholder="Password"
                          name="new-password"
                          value={password}
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
      ) : (
        <>
          <Flex>
            This Page Cant Be Used.
          </Flex>
          <NextChakraLinkWithHover href="/">
            Back to home
          </NextChakraLinkWithHover>
          {/* <Button
            onClick={handleClickMagic}
            colorScheme="blue"
          >
            Magic
          </Button> */}
          <Spacer />
        </>
      )}

      <SimpleFooter />
    </Flex>
  )
}

export default withUrqlClient(createUrqlClient)(SpecialRegisterPage);