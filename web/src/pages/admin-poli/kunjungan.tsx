import {
  Button,
  Checkbox,
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
import Iconify from "../../components/Iconify";
import { LayoutAdminPoli } from "../../components/LayoutGeneral";
import {
  useConfigurationSettingsByNameQuery,
  useCreateBhpMutation,
  useCreateObatMutation,
  useCreateTindakanMutation,
  useDeleteBhpMutation,
  useDeleteObatMutation,
  useDeleteTindakanMutation,
  useGetAllRefBhpsQuery,
  useGetAllRefObatsQuery,
  useGetAllRefTindakansQuery,
  useGetKunjunganPolisByAdminPoliQuery,
  useToWaitingPaymentReservasiMutation,
} from "../../generated/graphql";
import themeColor from "../../utils/color";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminPoliKunjunganPage = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [idEdit, setIdEdit] = useState(-1);
  const [tempObatId, setTempObatId] = useState("");
  const [tempTindakanId, setTempTindakanId] = useState("");
  const [tempBhpId, setTempBhpId] = useState("");
  const [tempJumlahObat, setTempJumlahObat] = useState("1");
  const [tempJumlahTindakan, setTempJumlahTindakan] = useState("1");
  const [tempJumlahBhp, setTempJumlahBhp] = useState("1");

  const [kunjunganPolis] = useGetKunjunganPolisByAdminPoliQuery();

  const [configuration] = useConfigurationSettingsByNameQuery({
    variables: {
      keywords: "bagi-hasil"
    }
  });
  const persentaseDokter = configuration.data?.configurationSettingsByName
    .find((conf) => conf.name.includes("dokter"))?.value ?? "0";
  const persentasePerawat = configuration.data?.configurationSettingsByName
    .find((conf) => conf.name.includes("perawat"))?.value ?? "0";
  const [updateStatus, toPayment] = useToWaitingPaymentReservasiMutation();

  const [refObat] = useGetAllRefObatsQuery();
  const [refTindakan] = useGetAllRefTindakansQuery();
  const [refBhp] = useGetAllRefBhpsQuery();
  const [, createObat] = useCreateObatMutation();
  const [, createTindakan] = useCreateTindakanMutation();
  const [, createBhp] = useCreateBhpMutation();
  const [, deleteObat] = useDeleteObatMutation();
  const [, deleteTindakan] = useDeleteTindakanMutation();
  const [, deleteBhp] = useDeleteBhpMutation();

  const toWaitingPaymentReservasi = (id: number) => {
    toPayment({
      id
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
    });
  };

  const openEditKunjunganPoli = (id: number) => {
    setIdEdit(id);
    setTempObatId("");
    setTempTindakanId("");
    setTempBhpId("");
    setTempJumlahObat("1");
    setTempJumlahTindakan("1");
    setTempJumlahBhp("1");
    onOpen();
  };

  const handleAddObat = () => {
    createObat({
      input: {
        createdBy: `AdminPoli`,
        harga: parseInt(tempJumlahObat) * (refObat.data?.getAllRefObats?.find((ref) =>
          ref.id === parseInt(tempObatId)
        )?.harga ?? 0),
        jumlah: parseInt(tempJumlahObat),
        kunjunganPoliId: idEdit,
        refObatId: parseInt(tempObatId),
        updatedBy: "",
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
      setTempObatId("");
      setTempJumlahObat("1");
    });
  };

  const handleDeleteObat = (id: number) => {
    deleteObat({
      id,
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
    });
  };

  const handleAddTindakan = () => {
    createTindakan({
      input: {
        createdBy: `AdminPoli`,
        harga: parseInt(tempJumlahTindakan) * (refTindakan.data?.getAllRefTindakans?.find((ref) =>
          ref.id === parseInt(tempTindakanId))
          ?.harga ?? 0),
        jumlah: parseInt(tempJumlahTindakan),
        kunjunganPoliId: idEdit,
        refTindakanId: parseInt(tempTindakanId),
        updatedBy: "",
        bagiHasilDokter: parseInt(persentaseDokter) / 100 * parseInt(tempJumlahTindakan)
          * (refTindakan.data?.getAllRefTindakans?.find((ref) =>
            ref.id === parseInt(tempTindakanId)
          )?.harga ?? 0),
        bagiHasilPerawat: parseInt(persentasePerawat) / 100 * parseInt(tempJumlahTindakan)
          * (refTindakan.data?.getAllRefTindakans?.find((ref) =>
            ref.id === parseInt(tempTindakanId)
          )?.harga ?? 0),
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
      setTempTindakanId("");
      setTempJumlahTindakan("1");
    });
  };

  const handleDeleteTindakan = (id: number) => {
    deleteTindakan({
      id,
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
    });
  };

  const handleAddBhp = () => {
    createBhp({
      input: {
        createdBy: `AdminPoli`,
        harga: parseInt(tempJumlahBhp) * (refBhp.data?.getAllRefBhps?.find((ref) =>
          ref.id === parseInt(tempBhpId)
        )?.harga ?? 0),
        jumlah: parseInt(tempJumlahBhp),
        kunjunganPoliId: idEdit,
        refBhpId: parseInt(tempBhpId),
        updatedBy: "",
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
      setTempBhpId("");
      setTempJumlahBhp("1");
    });
  };

  const handleDeleteBhp = (id: number) => {
    deleteBhp({
      id,
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
    });
  };

  return (
    <LayoutAdminPoli metaTitle="Kunjungan">
      <Stack spacing="32px" w="100%">
        <Text>
          Kunjungan
        </Text>
        <Stack spacing="16px">
          <HStack justify="space-between" alignItems="end">
            <Stack spacing="0px">
              <Text fontSize="20px" fontWeight={600}>
                Daftar Kunjungan Poli Aktif
              </Text>
              <Text>
                Daftar seluruh kunjungan poli (KP) dari seluruh reservasi (R).
              </Text>
            </Stack>
            <Checkbox isChecked={false} isDisabled>
              hanya tampilkan kunjungan hari ini
            </Checkbox>
          </HStack>
          <Table borderRadius="8px" overflow="hidden" boxShadow="md">
            <Thead>
              <Tr bgColor={themeColor.chakraBlue6}>
                <Th color="white">
                  ID KP
                </Th>
                <Th color="white">
                  ID R
                </Th>
                <Th color="white">
                  Nama Pasien
                </Th>
                <Th color="white">
                  Obat
                </Th>
                <Th color="white">
                  Tindakan
                </Th>
                <Th color="white">
                  BHP
                </Th>
                <Th color="white">
                  Aksi
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {kunjunganPolis.data?.getKunjunganPolisByAdminPoli?.map((kp) => (
                <Tr>
                  <Td>
                    {kp.id}
                  </Td>
                  <Td>
                    {kp.kunjungan?.reservasiId}
                  </Td>
                  <Td>
                    {kp.kunjungan?.user.pasien?.nama}
                  </Td>
                  <Td>
                    {(kp.obat?.length ?? 0) > 0 ? (
                      <Stack>
                        {kp.obat?.map((obt) => (
                          <Text>
                            <Text as="span" fontWeight={600}>
                              • {obt.refObat.nama}{" "}
                            </Text>
                            @{obt.jumlah}
                          </Text>
                        ))}
                      </Stack>
                    ) : (
                      "belum memasukkan obat"
                    )}
                  </Td>
                  <Td>
                    {(kp.tindakan?.length ?? 0) > 0 ? (
                      <Stack>
                        {kp.tindakan?.map((tdkn) => (
                          <Text>
                            <Text as="span" fontWeight={600}>
                              • {tdkn.refTindakan.nama}{" "}
                            </Text>
                            @{tdkn.jumlah}
                          </Text>
                        ))}
                      </Stack>
                    ) : (
                      "belum memasukkan tindakan"
                    )}
                  </Td>
                  <Td>
                    {(kp.bhp?.length ?? 0) > 0 ? (
                      <Stack>
                        {kp.bhp?.map((bahan) => (
                          <Text>
                            <Text as="span" fontWeight={600}>
                              • {bahan.refBhp.nama}{" "}
                            </Text>
                            @{bahan.jumlah}
                          </Text>
                        ))}
                      </Stack>
                    ) : (
                      "belum memasukkan bhp"
                    )}
                  </Td>
                  <Td>
                    {kp.kunjungan?.reservasi?.statusPasien !== "ready" ? (
                      <Flex w="182.4px">
                        Kunjungan Sudah Selesai
                      </Flex>
                    ) : (
                      <HStack>
                        <Button
                          onClick={() => openEditKunjunganPoli(kp.id)}
                          colorScheme="blue"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => toWaitingPaymentReservasi(kp.kunjungan?.reservasiId ?? -1)}
                          isDisabled={kp.kunjungan?.reservasi?.statusPasien !== "ready"}
                          isLoading={updateStatus.fetching}
                          colorScheme="green"
                          w="87px"
                        >
                          {kp.kunjungan?.reservasi?.statusPasien === "ready" ? "Selesai" : (
                            <Iconify boxSize="24px" icon="bx:check-double" />
                          )}
                        </Button>
                      </HStack>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={["", "600px", "800px"]}>
          <ModalHeader>Update Kunjungan Poli #{idEdit}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              {/* Obat */}
              <Stack>
                <Text fontSize="12px">Obat</Text>
                {kunjunganPolis.data?.getKunjunganPolisByAdminPoli?.find((kp) =>
                  kp.id === idEdit
                )?.obat?.map((obat) => (
                  <Stack direction="row" spacing="8px" key={obat.id}>
                    <Flex
                      border="thin solid #E2E8F0"
                      alignItems="center"
                      borderRadius="6px"
                      p="8px 16px"
                      w="100%"
                    >
                      {obat.refObat.nama}
                    </Flex>
                    <Flex
                      border="thin solid #E2E8F0"
                      alignItems="center"
                      borderRadius="6px"
                      p="8px 16px"
                      w="80px"
                    >
                      {obat.jumlah}
                    </Flex>
                    <Button
                      onClick={() => handleDeleteObat(obat.id)}
                      colorScheme="red"
                    >
                      <Iconify icon="bx-trash-alt" />
                    </Button>
                  </Stack>
                ))}
                <Stack direction="row" spacing="8px">
                  <Select
                    color={tempObatId === ""
                      ? "#ADADAE"
                      : "black"
                    }
                    onChange={(e) => setTempObatId(e.target.value)}
                    placeholder="Pilih Obat"
                    value={tempObatId}
                    bgColor="white"
                    w="100%"
                  >
                    {refObat.data?.getAllRefObats?.map((obt) => (
                      <option value={obt.id}>{obt.nama}</option>
                    ))}
                  </Select>
                  <Input
                    onChange={(e) => setTempJumlahObat(e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    value={tempJumlahObat}
                    placeholder="@"
                    type="number"
                    w="80px"
                  />
                  <Button
                    onClick={handleAddObat}
                    colorScheme="blue"
                  >
                    <Iconify icon="bx-plus" />
                  </Button>
                </Stack>
              </Stack>

              {/* Tindakan */}
              <Stack>
                <Text fontSize="12px">Tindakan</Text>
                {kunjunganPolis.data?.getKunjunganPolisByAdminPoli?.find((kp) =>
                  kp.id === idEdit
                )?.tindakan?.map((tdkn) => (
                  <Stack direction="row" spacing="8px" key={tdkn.id}>
                    <Flex
                      border="thin solid #E2E8F0"
                      alignItems="center"
                      borderRadius="6px"
                      p="8px 16px"
                      w="100%"
                    >
                      {tdkn.refTindakan.nama}
                    </Flex>
                    <Flex
                      border="thin solid #E2E8F0"
                      alignItems="center"
                      borderRadius="6px"
                      p="8px 16px"
                      w="80px"
                    >
                      {tdkn.jumlah}
                    </Flex>
                    <Button
                      onClick={() => handleDeleteTindakan(tdkn.id)}
                      colorScheme="red"
                    >
                      <Iconify icon="bx-trash-alt" />
                    </Button>
                  </Stack>
                ))}
                <Stack direction="row" spacing="8px">
                  <Select
                    color={tempTindakanId === ""
                      ? "#ADADAE"
                      : "black"
                    }
                    onChange={(e) => setTempTindakanId(e.target.value)}
                    placeholder="Pilih Tindakan"
                    value={tempTindakanId}
                    bgColor="white"
                    w="100%"
                  >
                    {refTindakan.data?.getAllRefTindakans?.map((tdkn) => (
                      <option value={tdkn.id}>{tdkn.nama}</option>
                    ))}
                  </Select>
                  <Input
                    onChange={(e) => setTempJumlahTindakan(e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    value={tempJumlahTindakan}
                    placeholder="@"
                    type="number"
                    w="80px"
                  />
                  <Button
                    onClick={handleAddTindakan}
                    colorScheme="blue"
                  >
                    <Iconify icon="bx-plus" />
                  </Button>
                </Stack>
              </Stack>

              {/* Bhp */}
              <Stack>
                <Text fontSize="12px">Bahan Habis Pakai</Text>
                {kunjunganPolis.data?.getKunjunganPolisByAdminPoli?.find((kp) =>
                  kp.id === idEdit
                )?.bhp?.map((bahan) => (
                  <Stack direction="row" spacing="8px" key={bahan.id}>
                    <Flex
                      border="thin solid #E2E8F0"
                      alignItems="center"
                      borderRadius="6px"
                      p="8px 16px"
                      w="100%"
                    >
                      {bahan.refBhp.nama}
                    </Flex>
                    <Flex
                      border="thin solid #E2E8F0"
                      alignItems="center"
                      borderRadius="6px"
                      p="8px 16px"
                      w="80px"
                    >
                      {bahan.jumlah}
                    </Flex>
                    <Button
                      onClick={() => handleDeleteBhp(bahan.id)}
                      colorScheme="red"
                    >
                      <Iconify icon="bx-trash-alt" />
                    </Button>
                  </Stack>
                ))}
                <Stack direction="row" spacing="8px">
                  <Select
                    color={tempBhpId === ""
                      ? "#ADADAE"
                      : "black"
                    }
                    onChange={(e) => setTempBhpId(e.target.value)}
                    placeholder="Pilih Bhp"
                    value={tempBhpId}
                    bgColor="white"
                    w="100%"
                  >
                    {refBhp.data?.getAllRefBhps?.map((bahan) => (
                      <option value={bahan.id}>{bahan.nama}</option>
                    ))}
                  </Select>
                  <Input
                    onChange={(e) => setTempJumlahBhp(e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    value={tempJumlahBhp}
                    placeholder="@"
                    type="number"
                    w="80px"
                  />
                  <Button
                    onClick={handleAddBhp}
                    colorScheme="blue"
                  >
                    <Iconify icon="bx-plus" />
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter pb="0px"></ModalFooter>
        </ModalContent>
      </Modal>
    </LayoutAdminPoli>
  )
};

export default withUrqlClient(createUrqlClient)(AdminPoliKunjunganPage);