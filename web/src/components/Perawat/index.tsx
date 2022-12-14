import {
  Button,
  Flex,
  HStack,
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
import {
  useCreatePerawatMutation,
  useDeletePerawatMutation,
  useGetAllPerawatsQuery,
  useUpdatePerawatMutation,
} from "../../generated/graphql";
import themeColor from "../../utils/color"

const DaftarPerawat = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalEditPerawat = useDisclosure();

  const [perawat] = useGetAllPerawatsQuery();
  const [, createPerawat] = useCreatePerawatMutation();
  const [, updatePerawat] = useUpdatePerawatMutation();
  const [, deletePerawat] = useDeletePerawatMutation();

  const [idEdit, setIdEdit] = useState(-1);

  const [tempNama, setTempNama] = useState("");
  const [tempNomor, setTempNomor] = useState("");

  const openCreate = () => {
    setIdEdit(-1);
    setTempNama("");
    setTempNomor("");
    onOpen();
  };

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

  const openEdit = (
    id: number,
    nama: string,
    noHp: string,
  ) => {
    setIdEdit(id);
    setTempNama(nama);
    setTempNomor(noHp);
    modalEditPerawat.onOpen();
  };

  const handleClickPerbarui = () => {
    updatePerawat({
      id: idEdit,
      input: {
        createdBy: "admin",
        nama: tempNama,
        nomorTelepon: tempNomor,
        updatedBy: "admin",
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      modalEditPerawat.onClose();
      setIdEdit(-1);
      setTempNama("");
      setTempNomor("");
    })
  };

  const handleClickDelete = () => {
    deletePerawat({
      id: idEdit
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      modalEditPerawat.onClose();
      setIdEdit(-1);
      setTempNama("");
      setTempNomor("");
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
          Daftar Perawat
        </Text>
        <Button
          onClick={openCreate}
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
                <Td>
                  <Button
                    onClick={() => openEdit(
                      perawat.id,
                      perawat.nama,
                      perawat.nomorTelepon
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

      {/* Modal Create */}
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

      {/* Modal Edit */}
      <Modal isOpen={modalEditPerawat.isOpen} onClose={modalEditPerawat.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Perawat</ModalHeader>
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
              <HStack justify="space-between">
                <Button
                  onClick={handleClickDelete}
                  colorScheme="red"
                  variant="outline"
                >
                  Delete
                </Button>
                <Button
                  onClick={handleClickPerbarui}
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

export default DaftarPerawat;