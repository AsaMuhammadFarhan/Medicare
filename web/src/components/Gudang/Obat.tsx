import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
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
import { useCreateRefObatMutation, useGetAllRefObatsQuery } from "../../generated/graphql";
import themeColor from "../../utils/color"
import { numberWithSeparator } from "../../utils/format";

const GudangObat = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [refObats] = useGetAllRefObatsQuery();
  const [, createRefObat] = useCreateRefObatMutation();

  const [tempNama, setTempNama] = useState("");
  const [tempHarga, setTempHarga] = useState("");

  const handleClickSimpan = () => {
    createRefObat({
      input: {
        createdBy: "admin",
        harga: parseInt(tempHarga),
        nama: tempNama,
        updatedBy: "",
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      onClose();
      setTempHarga("");
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
          Obat
        </Text>
        <Button
          onClick={onOpen}
          variant="outline"
          h="auto"
          w="auto"
        >
          Tambah Obat
        </Button>
      </Flex>
      <Stack spacing="24px" p="16px">
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Nama Obat</Th>
              <Th>Harga</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {refObats.data?.getAllRefObats?.map((obat) => (
              <Tr>
                <Td>{obat.id}</Td>
                <Td>{obat.nama}</Td>
                <Td>Rp {numberWithSeparator(obat.harga)}</Td>
                <Td>edit/delete</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Obat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Stack>
                <Text fontSize="12px">Nama Obat</Text>
                <Input
                  onChange={(e) => setTempNama(e.target.value)}
                  placeholder="Nama obat"
                  value={tempNama}
                />
              </Stack>
              <Stack>
                <Text fontSize="12px">Harga Obat</Text>
                <InputGroup>
                  <InputLeftAddon>Rp</InputLeftAddon>
                  <Input
                    onChange={(e) => setTempHarga(e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    placeholder="Harga obat"
                    value={tempHarga}
                    type="number"
                  />
                </InputGroup>
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

export default GudangObat;