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
import { useCreateRefTindakanMutation, useGetAllRefTindakansQuery } from "../../generated/graphql";
import themeColor from "../../utils/color"
import { numberWithSeparator } from "../../utils/format";

const GudangTindakan = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [refTindakans] = useGetAllRefTindakansQuery();
  const [, createRefTindakan] = useCreateRefTindakanMutation();

  const [tempNama, setTempNama] = useState("");
  const [tempHarga, setTempHarga] = useState("");

  const handleClickSimpan = () => {
    createRefTindakan({
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
          Tindakan
        </Text>
        <Button
          onClick={onOpen}
          variant="outline"
          h="auto"
          w="auto"
        >
          Tambah Tindakan
        </Button>
      </Flex>
      <Stack spacing="24px" p="16px">
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Kegiatan</Th>
              <Th>Harga</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {refTindakans.data?.getAllRefTindakans?.map((tindakan) => (
              <Tr>
                <Td>{tindakan.id}</Td>
                <Td>{tindakan.nama}</Td>
                <Td>Rp {numberWithSeparator(tindakan.harga)}</Td>
                <Td>edit/delete</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Tindakan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Stack>
                <Text fontSize="12px">Nama Kegiatan</Text>
                <Input
                  onChange={(e) => setTempNama(e.target.value)}
                  placeholder="Nama tindakan"
                  value={tempNama}
                />
              </Stack>
              <Stack>
                <Text fontSize="12px">Harga</Text>
                <InputGroup>
                  <InputLeftAddon>Rp</InputLeftAddon>
                  <Input
                    onChange={(e) => setTempHarga(e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    placeholder="Harga tindakan"
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

export default GudangTindakan;