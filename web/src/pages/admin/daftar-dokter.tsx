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
import {
  useCreateDokterMutation,
  useGetAllDoktersQuery,
  useGetAllPoliBagiansQuery,
} from "../../generated/graphql";
import themeColor from "../../utils/color";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminDaftarDokterPage = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [poliBagians] = useGetAllPoliBagiansQuery();
  const [dokters] = useGetAllDoktersQuery();
  const [, createDokter] = useCreateDokterMutation();

  const [selectedPoliBagianId, setSelectedPoliBagianId] = useState("");
  const [tempNama, setTempNama] = useState("");
  const [tempNomorHandphone, setTempNomorHandphone] = useState("");

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
              onClick={onOpen}
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
                    <Td>edit/delete</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Stack>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={["","600px","800px"]}>
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
      </Stack>
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminDaftarDokterPage);