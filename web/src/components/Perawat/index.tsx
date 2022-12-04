import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react";
import { useCreatePerawatMutation, useGetAllPerawatsQuery } from "../../generated/graphql";
import themeColor from "../../utils/color"

const DaftarPerawat = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [perawat] = useGetAllPerawatsQuery();
  const [, createPerawat] = useCreatePerawatMutation();

  const [tempNama, setTempNama] = useState("");
  const [tempNomor, setTempNomor] = useState("");

  const handleClickSimpan = () => {
    createPerawat({
      input: {
        createdBy: "admin",
        nama: tempNama,
        nomorTelepon: tempNomor,
        updatedBy: "",
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      onClose();
      setTempNomor("");
      setTempNama("");
    })
  };

  return (
    <Flex
      borderRadius="8px"
      direction="column"
      overflow="hidden"
      boxShadow="md"
      w="100%"
    >
      <Flex
        bgColor={themeColor.chakraBlue6}
        justify="space-between"
        fontWeight={600}
        color="white"
        w="100%"
        p="16px"
      >
        <Text>
          Daftar Perawat
        </Text>
        <Button
          onClick={onOpen}
          variant="outline"
          h="auto"
          w="auto"
        >
          Tambah Perawat
        </Button>
      </Flex>
      <Stack spacing="24px" p="16px">
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Nama</Th>
              <Th>Nomor Handphone</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {perawat.data?.getAllPerawats?.map((perawat) => (
              <Tr>
                <Td>{perawat.id}</Td>
                <Td>{perawat.nama}</Td>
                <Td>{perawat.nomorTelepon}</Td>
                <Td>edit/delete</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Perawat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Stack>
                <Text fontSize="12px">Nama</Text>
                <Input
                  onChange={(e) => setTempNama(e.target.value)}
                  placeholder="Nama perawat"
                  value={tempNama}
                />
              </Stack>
              <Stack>
                <Text fontSize="12px">Nomor Handphone</Text>
                <Input
                  onChange={(e) => setTempNomor(e.target.value)}
                  placeholder="Nomor handphone"
                  value={tempNomor}
                />
              </Stack>
              <Button
                onClick={handleClickSimpan}
                colorScheme="blue"
                justifySelf="end"
              >
                Simpan
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter pb="0px"></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
};

export default DaftarPerawat;