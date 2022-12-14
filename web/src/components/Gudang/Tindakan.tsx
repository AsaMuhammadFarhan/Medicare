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
  useCreateRefTindakanMutation,
  useDeleteRefTindakanMutation,
  useGetAllRefTindakansQuery,
  useUpdateRefTindakanMutation,
} from "../../generated/graphql";
import themeColor from "../../utils/color"
import { numberWithSeparator } from "../../utils/format";

const GudangTindakan = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalEdit = useDisclosure();

  const [refTindakans] = useGetAllRefTindakansQuery();
  const [, createRefTindakan] = useCreateRefTindakanMutation();
  const [, updateRefTindakan] = useUpdateRefTindakanMutation();
  const [, deleteRefTindakan] = useDeleteRefTindakanMutation();

  const [idEdit, setIdEdit] = useState(-1);
  const [tempNama, setTempNama] = useState("");
  const [tempHarga, setTempHarga] = useState("");
  const [createdBy, setCreatedBy] = useState("");

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
    updateRefTindakan({
      id: idEdit,
      input: {
        nama: tempNama,
        harga: parseInt(tempHarga),
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
    deleteRefTindakan({
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
                <Td>
                  <Button
                    onClick={() => openModalEdit(
                      tindakan.id,
                      tindakan.nama,
                      tindakan.harga.toString(),
                      tindakan.createdBy
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

      {/* tambah */}
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

      {/* edit */}
      <Modal isOpen={modalEdit.isOpen} onClose={closeModalEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Tindakan</ModalHeader>
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

export default GudangTindakan;