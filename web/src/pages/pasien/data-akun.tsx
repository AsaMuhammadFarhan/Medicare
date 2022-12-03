import { Button, Flex, Input, Select, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useEffect, useState } from "react";
import DatePicker from "../../components/DatePicker";
import { LayoutPasien } from "../../components/LayoutGeneral";
import { useMeWithPasienDataQuery, useUpdateUserPasienMutation } from "../../generated/graphql";
import { kabupatenKota } from "../../utils/arrayStock/kabupatenKota";
import { kecamatan } from "../../utils/arrayStock/kecamatan";
import { kelurahan } from "../../utils/arrayStock/kelurahan";
import { provinsi } from "../../utils/arrayStock/provinsi";
import themeColor from "../../utils/color";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { dateFormatWithoutDay } from "../../utils/format";

const PasienDataAkunPage = () => {

  const [editMode, setEditMode] = useState(false);

  const [meWithPasienData] = useMeWithPasienDataQuery();
  const [, updateUserPasien] = useUpdateUserPasienMutation();

  const [noRm, setNoRm] = useState("");
  const [nama, setNama] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [nik, setNik] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState<Date | null>(null);
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [idKelurahan, setIdKelurahan] = useState("");
  const [idKecamatan, setIdKecamatan] = useState("");
  const [idKabupatenKota, setIdKabupatenKota] = useState("");
  const [idProvinsi, setIdProvinsi] = useState("");

  useEffect(() => {
    setNoRm(meWithPasienData.data?.meWithPasienData?.pasien?.noRm ?? "")
    setNama(meWithPasienData.data?.meWithPasienData?.pasien?.nama ?? "")
    setNomorTelepon(meWithPasienData.data?.meWithPasienData?.pasien?.nomorTelepon ?? "")
    setNik(meWithPasienData.data?.meWithPasienData?.pasien?.nik ?? "")
    setAlamat(meWithPasienData.data?.meWithPasienData?.pasien?.alamat ?? "")
    setTempatLahir(meWithPasienData.data?.meWithPasienData?.pasien?.tempatLahir ?? "")
    setTanggalLahir(meWithPasienData.data?.meWithPasienData?.pasien?.tanggalLahir
      ? new Date(meWithPasienData.data?.meWithPasienData?.pasien?.tanggalLahir)
      : null
    )
    setRt(meWithPasienData.data?.meWithPasienData?.pasien?.rt ?? "")
    setRw(meWithPasienData.data?.meWithPasienData?.pasien?.rw ?? "")
    setIdKelurahan(meWithPasienData.data?.meWithPasienData?.pasien?.idKelurahan ?? "")
    setIdKecamatan(meWithPasienData.data?.meWithPasienData?.pasien?.idKecamatan ?? "")
    setIdKabupatenKota(meWithPasienData.data?.meWithPasienData?.pasien?.idKabupatenKota ?? "")
    setIdProvinsi(meWithPasienData.data?.meWithPasienData?.pasien?.idProvinsi ?? "")
  }, [meWithPasienData.fetching]);

  const handleClickSimpan = () => {
    updateUserPasien({
      id: meWithPasienData.data?.meWithPasienData?.pasien?.id ?? -1,
      input: {
        userId: meWithPasienData.data?.meWithPasienData?.id ?? -1,
        noRm,
        nama,
        nomorTelepon,
        nik,
        alamat,
        tempatLahir,
        tanggalLahir,
        rt,
        rw,
        idKelurahan,
        idKecamatan,
        idKabupatenKota,
        idProvinsi,
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
      setEditMode(false);
    })
  };

  return (
    <LayoutPasien metaTitle="Dashboard">
      <Stack spacing="16px" w="100%">
        <Text>
          Data Akun
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
            fontWeight={600}
            color="white"
            w="100%"
            p="16px"
          >
            Data Akun
          </Flex>
          <Stack spacing="24px" p="16px">
            <SimpleGrid columns={2} gap="16px">
              <Flex justify="space-between">
                <Text>Username</Text>
                <Text>:</Text>
              </Flex>
              <Text>{meWithPasienData.data?.meWithPasienData?.username}</Text>
              <Flex justify="space-between">
                <Text>User ID</Text>
                <Text>:</Text>
              </Flex>
              <Text>{meWithPasienData.data?.meWithPasienData?.id}</Text>
              <Flex justify="space-between">
                <Text>Email</Text>
                <Text>:</Text>
              </Flex>
              <Text>{meWithPasienData.data?.meWithPasienData?.id}</Text>
            </SimpleGrid>
          </Stack>
        </Flex>
        <Flex
          borderRadius="8px"
          direction="column"
          overflow="hidden"
          boxShadow="md"
          w="100%"
        >
          <Flex
            bgColor={themeColor.chakraBlue6}
            fontWeight={600}
            color="white"
            w="100%"
            p="16px"
          >
            Data Pasien
          </Flex>
          <Stack spacing={editMode ? "16px" : "24px"} p="16px">
            <SimpleGrid columns={2} columnGap="16px" rowGap={editMode ? "0px" : "16px"} alignItems="center">
              <Flex justify="space-between">
                <Text>
                  Nomor Rekam Medis
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Input
                  onChange={(e) => setNoRm(e.target.value)}
                  value={noRm}
                />
              ) : (
                <Text>{meWithPasienData.data?.meWithPasienData?.pasien?.noRm}</Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Nama Lengkap
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Input
                  onChange={(e) => setNama(e.target.value)}
                  value={nama}
                />
              ) : (
                <Text>{meWithPasienData.data?.meWithPasienData?.pasien?.nama}</Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Nomor Handphone
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Input
                  onChange={(e) => setNomorTelepon(e.target.value)}
                  value={nomorTelepon}
                />
              ) : (
                <Text>{meWithPasienData.data?.meWithPasienData?.pasien?.nomorTelepon}</Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Nomor Induk Kependudukan
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Input
                  onChange={(e) => setNik(e.target.value)}
                  value={nik}
                />
              ) : (
                <Text>{meWithPasienData.data?.meWithPasienData?.pasien?.nik}</Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Alamat
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Input
                  onChange={(e) => setAlamat(e.target.value)}
                  value={alamat}
                />
              ) : (
                <Text>{meWithPasienData.data?.meWithPasienData?.pasien?.alamat}</Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Tempat Lahir
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Input
                  onChange={(e) => setTempatLahir(e.target.value)}
                  value={tempatLahir}
                />
              ) : (
                <Text>{meWithPasienData.data?.meWithPasienData?.pasien?.tempatLahir}</Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Tanggal Lahir
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <DatePicker
                  onChange={(data) => setTanggalLahir(data)}
                  selected={tanggalLahir}
                />
              ) : (
                <Text>{dateFormatWithoutDay(new Date(meWithPasienData.data?.meWithPasienData?.pasien?.tanggalLahir))}</Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Nomor RT
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Input
                  onChange={(e) => setRt(e.target.value)}
                  value={rt}
                />
              ) : (
                <Text>{meWithPasienData.data?.meWithPasienData?.pasien?.rt}</Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Nomor RW
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Input
                  onChange={(e) => setRw(e.target.value)}
                  value={rw}
                />
              ) : (
                <Text>{meWithPasienData.data?.meWithPasienData?.pasien?.rw}</Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Provinsi
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Select
                  onChange={(e) => setIdProvinsi(e.target.value)}
                  placeholder="Pilih Provinsi"
                  value={idProvinsi}
                >
                  {provinsi.map((prov) => (
                    <option value={prov.id}>{prov.name}</option>
                  ))}
                </Select>
              ) : (
                <Text>
                  {provinsi.find((prov) =>
                    prov.id === meWithPasienData.data?.meWithPasienData?.pasien?.idProvinsi)?.name
                  }
                </Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Kabupaten/Kota
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Select
                  onChange={(e) => setIdKabupatenKota(e.target.value)}
                  placeholder="Pilih Kota"
                  value={idKabupatenKota}
                >
                  {kabupatenKota.filter((kabKot) => kabKot.id.slice(0, 2) === idProvinsi).map((kabKot) => (
                    <option value={kabKot.id}>{kabKot.name}</option>
                  ))}
                </Select>
              ) : (
                <Text>
                  {kabupatenKota.find((kabKot) =>
                    kabKot.id === meWithPasienData.data?.meWithPasienData?.pasien?.idKabupatenKota)?.name
                  }
                </Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Kecamatan
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Select
                  onChange={(e) => setIdKecamatan(e.target.value)}
                  placeholder="Pilih Kecamatan"
                  value={idKecamatan}
                >
                  {kecamatan.filter((kec) => kec.id.slice(0, 4) === idKabupatenKota).map((kec) => (
                    <option value={kec.id}>{kec.name}</option>
                  ))}
                </Select>
              ) : (
                <Text>
                  {kecamatan.find((kec) =>
                    kec.id === meWithPasienData.data?.meWithPasienData?.pasien?.idKecamatan)?.name
                  }
                </Text>
              )}
              <Flex justify="space-between">
                <Text>
                  Kelurahan
                </Text>
                <Text>:</Text>
              </Flex>
              {editMode ? (
                <Select
                  onChange={(e) => setIdKelurahan(e.target.value)}
                  placeholder="Pilih Kecamatan"
                  value={idKelurahan}
                >
                  {kelurahan.filter((kel) => kel.id.slice(0, 7) === idKecamatan).map((kel) => (
                    <option value={kel.id}>{kel.name}</option>
                  ))}
                </Select>
              ) : (
                <Text>
                  {kelurahan.find((kel) =>
                    kel.id === meWithPasienData.data?.meWithPasienData?.pasien?.idKelurahan)?.name
                  }
                </Text>
              )}
            </SimpleGrid>
            <Flex justify="space-between">
              {editMode ? (
                <Button
                  onClick={() => setEditMode(false)}
                  variant="outline"
                  w="auto"
                >
                  Batal
                </Button>
              ) : (
                <Flex />
              )}
              <Button
                onClick={() => editMode ? handleClickSimpan() : setEditMode(true)}
                colorScheme="blue"
                w="auto"
              >
                {editMode ? "Simpan" : "Perbarui"}
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </LayoutPasien>
  )
};

export default withUrqlClient(createUrqlClient)(PasienDataAkunPage);