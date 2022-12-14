import { SearchIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Flex, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { LayoutCashier } from "../../components/LayoutGeneral";
import { useGetAllReservasisQuery, useToSuccessReservasiMutation } from "../../generated/graphql";
import themeColor from "../../utils/color";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { dateFormat, numberWithSeparator } from "../../utils/format";

const CashierPaymentPage = () => {

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reservasis] = useGetAllReservasisQuery();
  const [updateStatus, toSuccess] = useToSuccessReservasiMutation();

  const [isHideUnnecessary, setIsHideUnnecessary] = useState(true);

  const [searchKeyword, setSearchKeyword] = useState("");

  const [displayId, setDisplayId] = useState(-1);
  const displayedReservasi = reservasis.data?.getAllReservasis?.find((reservasi) => reservasi.id === displayId);

  const openDisplay = (id: number) => {
    setDisplayId(id);
    onOpen();
  };

  const handleClickCheckout = () => {
    toSuccess({
      id: displayedReservasi?.id ?? -1
    }).then((result) => {
      if (result.error) {
        toast({
          title: "Server Error",
          description: result.error.message,
          position: "top",
          status: "error"
        })
        return;
      }
      toast({
        title: "Checkout Berhasil",
        position: "top",
        status: "success"
      })
      onClose();
    })
  };

  const getTotalPrice = (reservasi: typeof displayedReservasi) => {
    let totalPrice = 0;
    let bagiHasilDokter = 0;
    let bagiHasilPerawat = 0;
    if (reservasi?.kunjungan?.kunjunganPoli) {
      reservasi.kunjungan.kunjunganPoli.forEach((kp) => {
        totalPrice = totalPrice + parseInt(kp.biayaPoli);
        bagiHasilDokter = bagiHasilDokter + parseInt(kp.hasilBagiDokter);
        bagiHasilPerawat = bagiHasilPerawat + parseInt(kp.hasilBagiPerawat);
        if (kp.obat) {
          kp.obat.forEach((obt) => {
            totalPrice = totalPrice + obt.harga
          })
        }
        if (kp.tindakan) {
          kp.tindakan.forEach((tdkn) => {
            totalPrice = totalPrice + tdkn.harga
            bagiHasilDokter = bagiHasilDokter + tdkn.bagiHasilDokter;
            bagiHasilPerawat = bagiHasilPerawat + tdkn.bagiHasilPerawat;
          })
        }
        if (kp.bhp) {
          kp.bhp.forEach((bahan) => {
            totalPrice = totalPrice + bahan.harga
          })
        }
      })
    }
    return {
      hargaTotal: totalPrice,
      bagiHasilDokter,
      bagiHasilPerawat,
    }
  };

  const getStatusPasien = (value: string) => {
    if (value === "pending") {
      return (
        <Flex
          bgColor={themeColor.chakraBlue1}
          color={themeColor.chakraBlue6}
          textTransform="uppercase"
          fontWeight={600}
          fontSize="12px"
          w="fit-content"
          rounded="full"
          p="4px 8px"
        >
          Belum Datang
        </Flex>
      )
    }
    if (value === "ready") {
      return (
        <Flex
          bgColor={themeColor.chakraBlue1}
          color={themeColor.chakraBlue6}
          textTransform="uppercase"
          fontWeight={600}
          fontSize="12px"
          w="fit-content"
          rounded="full"
          p="4px 8px"
        >
          Proses Kunjungan
        </Flex>
      )
    }
    if (value === "waitingPayment") {
      return (
        <Flex
          bgColor={themeColor.redSoftBg}
          color={themeColor.redHard}
          textTransform="uppercase"
          fontWeight={600}
          fontSize="12px"
          w="fit-content"
          rounded="full"
          p="4px 8px"
        >
          Menunggu Pembayaran
        </Flex>
      )
    }
    if (value === "success") {
      return (
        <Flex
          bgColor={themeColor.greenSoftBg}
          color={themeColor.greenHard}
          textTransform="uppercase"
          fontWeight={600}
          fontSize="12px"
          w="fit-content"
          rounded="full"
          p="4px 8px"
        >
          Transaksi Selesai
        </Flex>
      )
    }
    if (value === "canceled") {
      return (
        <Flex
          bgColor={themeColor.chakraBlue1}
          color={themeColor.chakraBlue6}
          textTransform="uppercase"
          fontWeight={600}
          fontSize="12px"
          w="fit-content"
          rounded="full"
          p="4px 8px"
        >
          Dibatalkan
        </Flex>
      )
    }
  };

  return (
    <LayoutCashier metaTitle="Kasir">
      <Stack spacing="32px" w="100%">
        <Text>
          Payment
        </Text>
        <Stack spacing="8px">
          <Flex justify="space-between">
            <InputGroup size="sm" maxW="300px">
              <InputLeftElement>
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Cari Nama Pasien..."
                value={searchKeyword}
                type="search"
              />
            </InputGroup>
            <Checkbox
              onChange={(e) => setIsHideUnnecessary(e.target.checked)}
              isChecked={isHideUnnecessary}
            >
              Sembunyikan yang tidak perlu
            </Checkbox>
          </Flex>
          {searchKeyword !== "" && (
            <Text fontSize="18px">
              Menampilkan pasien dengan nama '
              <Text
                color={themeColor.chakraBlue8}
                fontWeight={700}
                as="span"
              >
                {searchKeyword}
              </Text>
              '.
            </Text>
          )}
          <Table borderRadius="8px" overflow="hidden" boxShadow="md">
            <Thead>
              <Tr bgColor={themeColor.chakraBlue6}>
                <Th color="white">
                  ID Reservasi
                </Th>
                <Th color="white">
                  Nama Pasien
                </Th>
                <Th color="white">
                  Status
                </Th>
                <Th color="white">
                  Harga
                </Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {reservasis.data?.getAllReservasis?.filter((res) =>
                res.user.pasien?.nama?.toLowerCase().includes(searchKeyword.toLowerCase())
              )?.sort((prev, next) =>
                prev.id > next.id ? 1 : -1
              )?.sort((prev, next) =>
                prev.statusPasien < next.statusPasien ? 1 : -1
              ).filter((res) =>
                isHideUnnecessary
                  ? (
                    res.statusPasien !== "canceled"
                    && res.statusPasien !== "ready"
                    && res.statusPasien !== "pending"
                  ) : true
              )?.map((reservasi) => (
                <Tr>
                  <Td>
                    {reservasi.id}
                  </Td>
                  <Td>
                    {reservasi.user.pasien?.nama}
                  </Td>
                  <Td>
                    {getStatusPasien(reservasi.statusPasien)}
                  </Td>
                  <Td>
                    Rp {numberWithSeparator(getTotalPrice(reservasi).hargaTotal)}
                  </Td>
                  <Td>
                    {(reservasi.statusPasien !== "canceled"
                      && reservasi.statusPasien !== "pending"
                      && reservasi.statusPasien !== "ready"
                    ) && (
                        <Button
                          onClick={() => openDisplay(reservasi.id)}
                          colorScheme="green"
                          w="100%"
                        >
                          {reservasi.statusPasien === "waitingPayment" ? "Bayar" : "Detail"}
                        </Button>
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
          <ModalHeader>Detail Pembayaran</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <SimpleGrid columns={2} rowGap="4px" columnGap="16px">
                <Flex justify="space-between">
                  <Text>Nama Pasien</Text>
                  <Text>:</Text>
                </Flex>
                <Text>{displayedReservasi?.user.pasien?.nama}</Text>
                <Flex justify="space-between">
                  <Text>Nomor Handphone</Text>
                  <Text>:</Text>
                </Flex>
                <Text>{displayedReservasi?.nomorTelepon}</Text>
              </SimpleGrid>
              <Table borderRadius="8px" overflow="hidden" boxShadow="md">
                <Thead>
                  <Tr bgColor={themeColor.chakraBlue6}>
                    <Th color="white">
                      Barang/Jasa
                    </Th>
                    <Th color="white">
                      Harga Satuan
                    </Th>
                    <Th color="white">
                      Jumlah
                    </Th>
                    <Th color="white">
                      Total
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {displayedReservasi?.kunjungan?.kunjunganPoli?.map((kp) => (
                    <>
                      <Tr>
                        <Td>
                          Periksa Poli {kp.poliBagian?.nama}
                        </Td>
                        <Td />
                        <Td />
                        <Td>
                          Rp {numberWithSeparator(parseInt(kp.biayaPoli))}
                        </Td>
                      </Tr>
                      {kp.obat?.map((obt) => (
                        <Tr>
                          <Td>
                            {obt.refObat.nama}
                          </Td>
                          <Td>
                            Rp {numberWithSeparator(obt.refObat.harga)}
                          </Td>
                          <Td>
                            @{obt.jumlah}
                          </Td>
                          <Td>
                            Rp {numberWithSeparator(obt.harga)}
                          </Td>
                        </Tr>
                      ))}
                      {kp.tindakan?.map((tdkn) => (
                        <Tr>
                          <Td>
                            {tdkn.refTindakan.nama}
                          </Td>
                          <Td>
                            Rp {numberWithSeparator(tdkn.refTindakan.harga)}
                          </Td>
                          <Td>
                            @{tdkn.jumlah}
                          </Td>
                          <Td>
                            Rp {numberWithSeparator(tdkn.harga)}
                          </Td>
                        </Tr>
                      ))}
                      {kp.bhp?.map((bahan) => (
                        <Tr>
                          <Td>
                            {bahan.refBhp.nama}
                          </Td>
                          <Td>
                            Rp {numberWithSeparator(bahan.refBhp.harga)}
                          </Td>
                          <Td>
                            @{bahan.jumlah}
                          </Td>
                          <Td>
                            Rp {numberWithSeparator(bahan.harga)}
                          </Td>
                        </Tr>
                      ))}
                    </>
                  ))}
                  <Tr bgColor={themeColor.chakraBlue2}>
                    <Td>
                      <Text fontWeight={600} fontSize="18px" color={themeColor.chakraBlue10}>
                        Total
                      </Text>
                    </Td>
                    <Td />
                    <Td />
                    <Td>
                      <Text fontWeight={600} fontSize="18px" color={themeColor.chakraBlue10}>
                        Rp {numberWithSeparator(getTotalPrice(displayedReservasi).hargaTotal)}
                      </Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              {displayedReservasi?.statusPasien === "waitingPayment" && (
                <Button
                  isLoading={updateStatus.fetching}
                  onClick={handleClickCheckout}
                  colorScheme="green"
                >
                  Checkout Pembayaran
                </Button>
              )}
              {displayedReservasi?.statusPasien === "success" && (
                <Text color={themeColor.chakraBlue6}>
                  Telah melakukan pembayaran pada {dateFormat(
                    new Date(parseInt(displayedReservasi.updatedAt))
                  )}
                </Text>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter pb="0px"></ModalFooter>
        </ModalContent>
      </Modal>
    </LayoutCashier>
  )
};

export default withUrqlClient(createUrqlClient)(CashierPaymentPage);