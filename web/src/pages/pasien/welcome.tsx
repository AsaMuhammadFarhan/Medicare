import { Button, Checkbox, Flex, HStack, Input, Select, SimpleGrid, Spacer, Stack, Text, useToast } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Step } from "../../components/ChakraUIPro/Step";
import Iconify from "../../components/Iconify";
import { OriginalMetaTags } from "../../components/MetaTags";
import { NextChakraLinkWithHover } from "../../components/NextChakraLink";
import { useCreateUserPasienMutation, useMeWithPasienDataQuery } from "../../generated/graphql";
import { getKecamatan, kabupatenKota } from "../../utils/arrayStock/kabupatenKota";
import { provinsi } from "../../utils/arrayStock/provinsi";
import { getArrayofYearbyStartYear } from "../../utils/arrayStock/waktu";
import themeColor from "../../utils/color";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { monthNames } from "../../utils/format";
import { useStep } from "../../utils/useStep";

const WelcomePasienPage = () => {

  // Init
  const toast = useToast();
  const router = useRouter();
  // --

  // Step
  const numberOfSteps = 4;
  const [currentStep, { setStep }] = useStep({ maxStep: numberOfSteps, initialStep: 0 });
  // --

  // State
  const [noRm, setNoRm] = useState("")
  const [nama, setNama] = useState("")
  const [nik, setNik] = useState("")
  const [alamat, setAlamat] = useState("")
  const [tempatLahir, setTempatLahir] = useState("")
  const [tanggalLahir, setTanggalLahir] = useState(""); // new Date("2022-03-25")
  const [bulanLahir, setBulanLahir] = useState("");
  const [tahunLahir, setTahunLahir] = useState("");
  const [rt, setRt] = useState("")
  const [rw, setRw] = useState("")
  const [idKelurahan, setIdKelurahan] = useState("")
  const [idKecamatan, setIdKecamatan] = useState("")
  const [idKabupatenKota, setIdKabupatenKota] = useState("")
  const [idProvinsi, setIdProvinsi] = useState("")
  // --

  // graphql
  const [meWithPasienData] = useMeWithPasienDataQuery();
  const [creating, createUserPasien] = useCreateUserPasienMutation();
  // --

  // condition
  const [term1, setTerm1] = useState(true);
  const term2: boolean = noRm !== ""
    && nama !== ""
    && nik !== ""
    && tempatLahir !== ""
    && tanggalLahir !== ""
    && bulanLahir !== ""
    && tahunLahir !== "";

  const term3: boolean = alamat !== ""
    && rt !== ""
    && rw !== ""
    && idKelurahan !== ""
    && idKecamatan !== ""
    && idKabupatenKota !== ""
    && idProvinsi !== "";
  // --

  const handleSavePasienData = () => {
    // Validate

    // Do something
    createUserPasien({
      input: {
        noRm,
        nama,
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
        userId: meWithPasienData.data?.meWithPasienData?.id ?? -1,
      }
    }).then((result) => {

    })
  }

  const handleChangeStep = (nextStep: number) => {
    if (
      ( // START
        nextStep === 0
      ) || ( // STEP 1 Clear
        nextStep === 1
        && term1
      ) || ( // STEP 2 Clear
        nextStep === 2
        && term1
        && term2
      ) || ( // STEP 3 Clear
        nextStep === 3
        && term1
        && term2
        && term3
      )
    ) {
      setStep(nextStep)
      return;
    }
    if (currentStep === 0) toast({
      title: "Konfirmasi Persetujuan Terlebih Dahulu.",
      isClosable: true,
      position: "top",
      status: "warning",
    }); else toast({
      title: "Lengkapi Semua Data Terlebih Dahulu.",
      isClosable: true,
      position: "top",
      status: "warning",
    })
    return
  }

  const kecamatanOptions = await getKecamatan(idKabupatenKota !== "" ? idKabupatenKota : undefined);

  useEffect(() => {
    if (meWithPasienData.data?.meWithPasienData?.pasien?.id) router.replace("/pasien/dashboard");
  }, [meWithPasienData.data?.meWithPasienData?.pasien?.id]);

  return (
    <Flex
      bgColor={themeColor.chakraBlue6}
      justify="center"
      minH="100vh"
      w="100vw"
      p="80px"
    >
      <OriginalMetaTags pageName="Welcome" />
      <Stack
        minH="calc(100vh - 160px)"
        borderRadius="8px"
        bgColor="white"
        h="fit-content"
        maxW="800px"
        w="100%"
        p="32px"
      >
        <HStack spacing="0px" px="160px">
          {[...Array(numberOfSteps)].map((_, id) => (
            <Step
              key={id}
              cursor="pointer"
              onClick={() => handleChangeStep(id)}
              isActive={currentStep === id}
              isCompleted={currentStep > id}
              isLastStep={numberOfSteps === id + 1}
            />
          ))}
        </HStack>

        <Spacer />

        {currentStep === 0 && (
          <Stack
            spacing="16px"
            pb="40px"
          >
            <Text
              color={themeColor.chakraBlue8}
              fontWeight={700}
              fontSize="60px"
            >
              Yuk Lengkapi Data Kamu Terlebih Dahulu!
            </Text>
            <Checkbox
              onChange={(e) => setTerm1(e.target.checked)}
              colorScheme="blue"
              isChecked={term1}
              px="8px"
            >
              Saya telah membaca dan setuju dengan{" "}
              <NextChakraLinkWithHover href={`/privacy?next=${encodeURIComponent("/pasien/welcome")}`} isExternal>
                syarat dan ketentuan{" "}
              </NextChakraLinkWithHover>
              yang berlaku.
            </Checkbox>
          </Stack>
        )}

        {currentStep === 1 && (
          <Stack spacing="16px" pt="40px">
            <Text
              color={themeColor.chakraBlue8}
              fontWeight={600}
              fontSize="24px"
            >
              Lengkapi Data Pribadi Kamu
            </Text>
            <Text>
              Silahkan masukkan data pribadi kamu untuk diintegrasikan dengan layanan kesehatan kamu.
              Tenang, data pribadi kamu tidak akan disebarluaskan.
            </Text>
            <Stack>
              <Text>
                Nomor Rekam Medis
              </Text>
              <Input
                onChange={(e) => setNoRm(e.target.value)}
                placeholder="Nomor Rekam Medis"
                value={noRm}
              />
            </Stack>
            <Stack>
              <Text>
                Nama
              </Text>
              <Input
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                value={nama}
              />
            </Stack>
            <Stack>
              <Text>
                NIK
              </Text>
              <Input
                onChange={(e) => setNik(e.target.value)}
                placeholder="NIK"
                value={nik}
              />
            </Stack>
            <Stack>
              <Text>
                Tempat Lahir
              </Text>
              <Input
                onChange={(e) => setTempatLahir(e.target.value)}
                placeholder="Tempat Lahir"
                value={tempatLahir}
              />
            </Stack>
            <Stack>
              <Text>
                Tanggal Lahir
              </Text>
              <HStack>
                <Select
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  placeholder="Tanggal"
                  value={tanggalLahir}
                >
                  {[...Array(31)].map((_, index) => (
                    <option value={(index + 1).toString()}>{index + 1}</option>
                  ))}
                </Select>
                <Select
                  onChange={(e) => setBulanLahir(e.target.value)}
                  placeholder="Bulan"
                  value={bulanLahir}
                >
                  {monthNames.map((month) => (
                    <option value={month}>{month}</option>
                  ))}
                </Select>
                <Select
                  onChange={(e) => setTahunLahir(e.target.value)}
                  placeholder="Tahun"
                  value={tahunLahir}
                >
                  {getArrayofYearbyStartYear(1945).reverse().map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </Select>
              </HStack>
            </Stack>
          </Stack>
        )}

        {currentStep === 2 && (
          <Stack spacing="16px" pt="40px">
            <Text
              color={themeColor.chakraBlue8}
              fontWeight={600}
              fontSize="24px"
            >
              Lengkapi Data Tempat Tinggal Kamu
            </Text>
            <Stack>
              <Text>
                Alamat
              </Text>
              <Input
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat"
                value={alamat}
              />
            </Stack>
            <SimpleGrid columns={2} gap="8px">
              <Stack>
                <Text>
                  RT
                </Text>
                <Input
                  onChange={(e) => setRt(e.target.value)}
                  placeholder="No RT"
                  value={rt}
                />
              </Stack>
              <Stack>
                <Text>
                  RW
                </Text>
                <Input
                  onChange={(e) => setRw(e.target.value)}
                  placeholder="No RW"
                  value={rw}
                />
              </Stack>
            </SimpleGrid>
            <Stack>
              <Select
                onChange={(e) => setIdProvinsi(e.target.value)}
                placeholder="Pilih Provinsi"
                value={idProvinsi}
              >
                {provinsi.map((prov) => (
                  <option value={prov.id}>{prov.nama}</option>
                ))}
              </Select>
              <Select
                onChange={(e) => setIdKabupatenKota(e.target.value)}
                placeholder="Pilih Kota"
                value={idKabupatenKota}
              >
                {kabupatenKota.filter((kabKot) => kabKot.id.slice(0, 2) === idProvinsi).map((kabKot) => (
                  <option value={kabKot.id}>{kabKot.nama}</option>
                ))}
              </Select>
              <Select
                onChange={(e) => setIdKecamatan(e.target.value)}
                placeholder="Pilih Kecamatan"
                value={idKecamatan}
              >
                {kecamatanOptions.filter((kecamatan) => kecamatan.id.slice(0, 5) === idKabupatenKota).map((kabKot) => (
                  <option value={kabKot.id}>{kabKot.nama}</option>
                ))}
              </Select>
            </Stack>
          </Stack>
        )}

        <Spacer />
        {currentStep !== 3 ? (
          <Flex justify="end">
            <Button
              onClick={() => handleChangeStep(currentStep + 1)}
              colorScheme="blue"
            >
              <Text mr="8px">Selanjutnya</Text>
              <Iconify icon="bx:chevron-right" />
            </Button>
          </Flex>
        ) : (
          <Flex justify="end">
            <Button
              onClick={() => handleSavePasienData()}
              isLoading={creating.fetching}
              colorScheme="blue"
            >
              <Text>Simpan</Text>
            </Button>
          </Flex>
        )}
      </Stack>

    </Flex>
  );
}

export default withUrqlClient(createUrqlClient)(WelcomePasienPage);
