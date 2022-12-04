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
import { useCreatePenyakitMutation, useGetAllPenyakitsQuery } from "../../generated/graphql";
import themeColor from "../../utils/color"

const DaftarPenyakit = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [penyakits] = useGetAllPenyakitsQuery();
  const [, createPenyakit] = useCreatePenyakitMutation();

  const [tempNama, setTempNama] = useState("");
  const [tempKode, setTempKode] = useState("");

  const handleClickSimpan = () => {
    createPenyakit({
      input: {
        createdBy: "admin",
        nama: tempNama,
        kode: tempKode,
        updatedBy: "",
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      onClose();
      setTempKode("");
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
          Daftar Penyakit
        </Text>
        <Button
          onClick={onOpen}
          variant="outline"
          h="auto"
          w="auto"
        >
          Tambah Penyakit
        </Button>
      </Flex>
      <Stack spacing="24px" p="16px">
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Nama Penyakit</Th>
              <Th>Kode Penyakit</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {penyakits.data?.getAllPenyakits?.map((penyakit) => (
              <Tr>
                <Td>{penyakit.id}</Td>
                <Td>{penyakit.nama}</Td>
                <Td>{penyakit.kode}</Td>
                <Td>edit/delete</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Penyakit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Stack>
                <Text fontSize="12px">Nama Penyakit</Text>
                <Input
                  onChange={(e) => setTempNama(e.target.value)}
                  placeholder="Nama penyakit"
                  value={tempNama}
                />
              </Stack>
              <Stack>
                <Text fontSize="12px">Kode Penyakit</Text>
                <Input
                  onChange={(e) => setTempKode(e.target.value)}
                  placeholder="Kode penyakit"
                  value={tempKode}
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

export default DaftarPenyakit;