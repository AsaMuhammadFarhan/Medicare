import {
  Button,
  Flex,
  HStack,
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
import {
  useCreatePoliBagianMutation,
  useDeletePoliBagianMutation,
  useGetAllPoliBagiansQuery,
  useUpdatePoliBagianMutation,
} from "../../generated/graphql";
import themeColor from "../../utils/color"
import { numberWithSeparator } from "../../utils/format";

const GudangPoli = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalEdit = useDisclosure();

  const [poliBagians] = useGetAllPoliBagiansQuery();
  const [, createPoliBagian] = useCreatePoliBagianMutation();
  const [, updatePoliBagian] = useUpdatePoliBagianMutation();
  const [, deletePoliBagian] = useDeletePoliBagianMutation();

  const [idEdit, setIdEdit] = useState(-1);
  const [tempNama, setTempNama] = useState("");
  const [tempHarga, setTempHarga] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleClickSimpan = () => {
    createPoliBagian({
      input: {
        createdBy: "admin",
        hargaPendaftaran: parseInt(tempHarga),
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

  const openModalEdit = (
    id: number,
    nama: string,
    value: string,
    createdBy: string,
  ) => {
    setIdEdit(id);
    setTempNama(nama);
    setTempHarga(value);
    setCreatedBy(createdBy);
    modalEdit.onOpen();
  };

  const closeModalEdit = () => {
    setIdEdit(-1);
    setTempNama("");
    setTempHarga("");
    setCreatedBy("");
    modalEdit.onClose();
  };

  const handleClickUpdate = () => {
    updatePoliBagian({
      id: idEdit,
      input: {
        nama: tempNama,
        hargaPendaftaran: parseInt(tempHarga),
        updatedBy: "Admin",
        createdBy,
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      closeModalEdit();
    })
  };

  const handleClickDelete = () => {
    deletePoliBagian({
      id: idEdit
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      closeModalEdit();
    })
  }


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
          Poli Bagian
        </Text>
        <Button
          onClick={onOpen}
          variant="outline"
          h="auto"
          w="auto"
        >
          Tambah Poli
        </Button>
      </Flex>
      <Stack spacing="24px" p="16px">
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Nama Poli</Th>
              <Th>Harga Pendaftaran</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {poliBagians.data?.getAllPoliBagians?.map((poli) => (
              <Tr>
                <Td>{poli.id}</Td>
                <Td>{poli.nama}</Td>
                <Td>Rp {numberWithSeparator(poli.hargaPendaftaran)}</Td>
                <Td>
                  <Button
                    onClick={() => openModalEdit(
                      poli.id,
                      poli.nama,
                      poli.hargaPendaftaran.toString(),
                      poli.createdBy
                    )}
                    colorScheme="blue"
                    h="auto"
                    w="100%"
                  >
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Poli</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Stack>
                <Text fontSize="12px">Nama Poli</Text>
                <Input
                  onChange={(e) => setTempNama(e.target.value)}
                  placeholder="Nama poli"
                  value={tempNama}
                />
              </Stack>
              <Stack>
                <Text fontSize="12px">Harga Pendaftaran Poli</Text>
                <InputGroup>
                  <InputLeftAddon>Rp</InputLeftAddon>
                  <Input
                    onChange={(e) => setTempHarga(e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    placeholder="Harga pendaftaran"
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

      {/* edit */}
      <Modal isOpen={modalEdit.isOpen} onClose={closeModalEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Poli</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
            <Stack>
                <Text fontSize="12px">Nama Poli</Text>
                <Input
                  onChange={(e) => setTempNama(e.target.value)}
                  placeholder="Nama poli"
                  value={tempNama}
                />
              </Stack>
              <Stack>
                <Text fontSize="12px">Harga Pendaftaran Poli</Text>
                <InputGroup>
                  <InputLeftAddon>Rp</InputLeftAddon>
                  <Input
                    onChange={(e) => setTempHarga(e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    placeholder="Harga pendaftaran"
                    value={tempHarga}
                    type="number"
                  />
                </InputGroup>
              </Stack>
              <HStack justify="space-between">
                <Button
                  onClick={handleClickDelete}
                  variant="outline"
                  colorScheme="red"
                >
                  Delete
                </Button>
                <Button
                  onClick={handleClickUpdate}
                  colorScheme="blue"
                >
                  Update
                </Button>
              </HStack>
            </Stack>
          </ModalBody>
          <ModalFooter pb="0px"></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
};

export default GudangPoli;