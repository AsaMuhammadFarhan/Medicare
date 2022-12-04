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
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react";
import {
  useConfigurationSettingsQuery,
  useCreateConfigurationSettingMutation,
  useUpdateConfigurationSettingMutation,
} from "../../generated/graphql";
import themeColor from "../../utils/color"

const ConfigurationSetting = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalEdit = useDisclosure();

  const [configurationSettings] = useConfigurationSettingsQuery();
  const [, createConfiguration] = useCreateConfigurationSettingMutation();
  const [, updateConfiguration] = useUpdateConfigurationSettingMutation();

  const [idEdit, setIdEdit] = useState(-1);
  const [tempNama, setTempNama] = useState("");
  const [tempValue, setTempValue] = useState("");

  const handleClickSimpan = () => {
    createConfiguration({
      input: {
        name: tempNama,
        value: tempValue,
        updatedBy: "Admin"
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      onClose();
      setTempNama("");
      setTempValue("");
    })
  };

  const openModalEdit = (
    id: number,
    nama: string,
    value: string,
  ) => {
    setIdEdit(id);
    setTempNama(nama);
    setTempValue(value);
    modalEdit.onOpen();
  };

  const closeModalEdit = () => {
    setIdEdit(-1);
    setTempNama("");
    setTempValue("");
    modalEdit.onClose();
  };

  const handleClickUpdate = () => {
    updateConfiguration({
      id: idEdit,
      input: {
        name: tempNama,
        value: tempValue,
        updatedBy: "Admin"
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      closeModalEdit();
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
          Pengaturan
        </Text>
        <Button
          onClick={onOpen}
          variant="outline"
          h="auto"
          w="auto"
        >
          Tambah Pengaturan
        </Button>
      </Flex>
      <Stack spacing="24px" p="16px">
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Nama</Th>
              <Th>Isi</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {configurationSettings.data?.configurationSettings?.map((conf) => (
              <Tr key={conf.id}>
                <Td>{conf.id}</Td>
                <Td>{conf.name}</Td>
                <Td>{conf.value}</Td>
                <Td>
                  <Button
                    onClick={() => openModalEdit(conf.id, conf.name, conf.value)}
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

      {/* Tambah */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Pengaturan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Stack>
                <Text fontSize="12px">Nama Pengaturan</Text>
                <Input
                  onChange={(e) => setTempNama(e.target.value)}
                  placeholder="Nama pengaturan"
                  value={tempNama}
                />
              </Stack>
              <Stack>
                <Text fontSize="12px">Isi Pengaturan</Text>
                <Textarea
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder="Isi pengaturan"
                  value={tempValue}
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

      {/* Edit */}
      <Modal isOpen={modalEdit.isOpen} onClose={closeModalEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Pengaturan #{idEdit}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Stack>
                <Text fontSize="12px">Nama Pengaturan</Text>
                <Input
                  onChange={(e) => setTempNama(e.target.value)}
                  placeholder="Nama pengaturan"
                  value={tempNama}
                />
              </Stack>
              <Stack>
                <Text fontSize="12px">Isi Pengaturan</Text>
                <Textarea
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder="Isi pengaturan"
                  value={tempValue}
                />
              </Stack>
              <Button
                onClick={handleClickUpdate}
                colorScheme="blue"
                justifySelf="end"
              >
                Update
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter pb="0px"></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
};

export default ConfigurationSetting;