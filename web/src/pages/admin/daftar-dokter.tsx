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
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import LayoutAdmin from "../../components/LayoutGeneral";
import DaftarPerawat from "../../components/Perawat";
import {
  useCreateDokterMutation,
  useDeleteDokterMutation,
  useGetAllDoktersQuery,
  useGetAllPoliBagiansQuery,
  useUpdateDokterMutation,
} from "../../generated/graphql";
import themeColor from "../../utils/color";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminDaftarDokterPage = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalEditDokter = useDisclosure();

  const [poliBagians] = useGetAllPoliBagiansQuery();
  const [dokters] = useGetAllDoktersQuery();
  const [, createDokter] = useCreateDokterMutation();
  const [, updateDokter] = useUpdateDokterMutation();
  const [, deleteDokter] = useDeleteDokterMutation();

  const [idEdit, setIdEdit] = useState(-1);

  const [selectedPoliBagianId, setSelectedPoliBagianId] = useState("");
  const [tempNama, setTempNama] = useState("");
  const [tempNomorHandphone, setTempNomorHandphone] = useState("");

  const openCreate = () => {
    setIdEdit(-1);
    setSelectedPoliBagianId("");
    setTempNama("");
    setTempNomorHandphone("");
    onOpen();
  };

  const handleClickSimpan = () => {
    createDokter({
      input: {
        createdBy: "admin",
        nama: tempNama,
        nomorTelepon: tempNomorHandphone,
        updatedBy: "",
        poliBagianId: parseInt(selectedPoliBagianId),
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      onClose();
      setSelectedPoliBagianId("");
      setTempNama("");
      setTempNomorHandphone("");
    })
  };

  const openEdit = (
    id: number,
    poliId: string,
    nama: string,
    noHp: string,
  ) => {
    setIdEdit(id);
    setSelectedPoliBagianId(poliId);
    setTempNama(nama);
    setTempNomorHandphone(noHp);
    modalEditDokter.onOpen();
  };

  const handleClickPerbarui = () => {
    updateDokter({
      id: idEdit,
      input: {
        createdBy: "admin",
        nama: tempNama,
        nomorTelepon: tempNomorHandphone,
        updatedBy: "admin",
        poliBagianId: parseInt(selectedPoliBagianId),
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      modalEditDokter.onClose();
      setIdEdit(-1);
      setSelectedPoliBagianId("");
      setTempNama("");
      setTempNomorHandphone("");
    })
  };

  const handleClickDelete = () => {
    deleteDokter({
      id: idEdit
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      modalEditDokter.onClose();
      setIdEdit(-1);
      setSelectedPoliBagianId("");
      setTempNama("");
      setTempNomorHandphone("");
    })
  }

  return (
    <LayoutAdmin metaTitle="Daftar Dokter">
      <Stack spacing="32px" w="100%">
        <Text>
          Daftar Dokter
        </Text>
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
              Daftar Dokter
            </Text>
            <Button
              onClick={openCreate}
              variant="outline"
              h="auto"
              w="auto"
            >
              Tambah Dokter
            </Button>
          </Flex>
          <Stack spacing="24px" p="16px">
            <Table>
              <Thead>
                <Tr>
                  <Th>Nama Dokter</Th>
                  <Th>Poli Bagian</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                {dokters.data?.getAllDokters?.map((dokter) => (
                  <Tr>
                    <Td>
                      <Flex direction="column">
                        <Text fontWeight={600}>{dokter.nama}</Text>
                        <Text fontSize="14px">{dokter.nomorTelepon}</Text>
                      </Flex>
                    </Td>
                    <Td>{dokter.poliBagian.nama}</Td>
                    <Td>
                      <Button
                        onClick={() => openEdit(
                          dokter.id,
                          dokter.poliBagian.id.toString(),
                          dokter.nama,
                          dokter.nomorTelepon
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
            <ModalContent minW={["", "600px", "800px"]}>
              <ModalHeader>Tambah Dokter</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing="24px">
                  <Stack>
                    <Text fontSize="12px">Pilih Poli</Text>
                    <Select
                      onChange={(e) => setSelectedPoliBagianId(e.target.value)}
                      value={selectedPoliBagianId}
                      placeholder="Pilih poli"
                    >
                      {poliBagians.data?.getAllPoliBagians?.map((poli) => (
                        <option value={poli.id}>{poli.nama}</option>
                      ))}
                    </Select>
                  </Stack>
                  <Stack>
                    <Text fontSize="12px">Nama Dokter</Text>
                    <Input
                      onChange={(e) => setTempNama(e.target.value)}
                      placeholder="Nama dokter"
                      value={tempNama}
                    />
                  </Stack>
                  <Stack>
                    <Text fontSize="12px">Nomor Handphone</Text>
                    <Input
                      onChange={(e) => setTempNomorHandphone(e.target.value)}
                      placeholder="Nomor handphone"
                      value={tempNomorHandphone}
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

        {/* Modal Edit */}
        <Modal isOpen={modalEditDokter.isOpen} onClose={modalEditDokter.onClose}>
          <ModalOverlay />
          <ModalContent minW={["", "600px", "800px"]}>
            <ModalHeader>Edit Dokter</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing="24px">
                <Stack>
                  <Text fontSize="12px">Pilih Poli</Text>
                  <Select
                    onChange={(e) => setSelectedPoliBagianId(e.target.value)}
                    value={selectedPoliBagianId}
                    placeholder="Pilih poli"
                  >
                    {poliBagians.data?.getAllPoliBagians?.map((poli) => (
                      <option value={poli.id}>{poli.nama}</option>
                    ))}
                  </Select>
                </Stack>
                <Stack>
                  <Text fontSize="12px">Nama Dokter</Text>
                  <Input
                    onChange={(e) => setTempNama(e.target.value)}
                    placeholder="Nama dokter"
                    value={tempNama}
                  />
                </Stack>
                <Stack>
                  <Text fontSize="12px">Nomor Handphone</Text>
                  <Input
                    onChange={(e) => setTempNomorHandphone(e.target.value)}
                    placeholder="Nomor handphone"
                    value={tempNomorHandphone}
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

        <DaftarPerawat />
      </Stack>
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminDaftarDokterPage);