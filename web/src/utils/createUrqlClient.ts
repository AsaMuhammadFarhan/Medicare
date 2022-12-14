import { dedupExchange, Exchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { pipe, tap } from "wonka";
import Router from "next/router";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      })
    );
  };

export const createUrqlClient = (ssrExchange: any) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {},
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            cache.invalidate("Query");
          },
          login: (_result, args, cache, info) => {
            cache.invalidate("Query");
          },
          register: (_result, args, cache, info) => {
            cache.invalidate("Query");
          },
          specialRegister: (_result, args, cache, info) => {
            cache.invalidate("Query");
          },
          deleteObat: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getKunjunganPolisByAdminPoli");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getKunjunganPolisByAdminPoli", x.arguments)
            );
          },
          deleteTindakan: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getKunjunganPolisByAdminPoli");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getKunjunganPolisByAdminPoli", x.arguments)
            );
          },
          deleteBhp: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getKunjunganPolisByAdminPoli");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getKunjunganPolisByAdminPoli", x.arguments)
            );
          },
          createObat: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getKunjunganPolisByAdminPoli");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getKunjunganPolisByAdminPoli", x.arguments)
            );
          },
          createTindakan: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getKunjunganPolisByAdminPoli");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getKunjunganPolisByAdminPoli", x.arguments)
            );
          },
          createBhp: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getKunjunganPolisByAdminPoli");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getKunjunganPolisByAdminPoli", x.arguments)
            );
          },
          createRefObat: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllRefObats");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllRefObats", x.arguments)
            );
          },
          createRefTindakan: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllRefTindakans");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllRefTindakans", x.arguments)
            );
          },
          createRefBhp: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllRefBhps");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllRefBhps", x.arguments)
            );
          },
          createPoliBagian: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllPoliBagians");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllPoliBagians", x.arguments)
            );
          },
          createPenyakit: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllPenyakits");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllPenyakits", x.arguments)
            );
          },
          createKunjunganPoli: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getReservasi");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getReservasi", x.arguments)
            );
          },
          createPerawat: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllPerawats");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllPerawats", x.arguments)
            );
          },
          createDokter: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllDokters");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllDokters", x.arguments)
            );
          },
          createReservasi: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "meWithAllData");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "meWithAllData", x.arguments)
            );
            const argsQueries2 = allField.filter((x) => x.fieldName === "getAllReservasis");
            argsQueries2.forEach((x) =>
              cache.invalidate("Query", "getAllReservasis", x.arguments)
            );
          },
          createKunjungan: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getReservasi");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getReservasi", x.arguments)
            );
          },
          updateKunjungan: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getReservasi");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getReservasi", x.arguments)
            );
          },
          updateUserPasien: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "meWithPasienData");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "meWithPasienData", x.arguments)
            );
            const argsQueries2 = allField.filter((x) => x.fieldName === "meWithAllData");
            argsQueries2.forEach((x) =>
              cache.invalidate("Query", "meWithAllData", x.arguments)
            );
          },
          createUserPasien: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "meWithPasienData");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "meWithPasienData", x.arguments)
            );
            const argsQueries2 = allField.filter((x) => x.fieldName === "meWithAllData");
            argsQueries2.forEach((x) =>
              cache.invalidate("Query", "meWithAllData", x.arguments)
            );
          },
          createConfigurationSetting: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "configurationSettings");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "configurationSettings", x.arguments)
            );
            const argsQueries2 = allField.filter((x) => x.fieldName === "configurationSettingsByName");
            argsQueries2.forEach((x) =>
              cache.invalidate("Query", "configurationSettingsByName", x.arguments)
            );
          },
          updateConfigurationSetting: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "configurationSettings");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "configurationSettings", x.arguments)
            );
            const argsQueries2 = allField.filter((x) => x.fieldName === "configurationSettingsByName");
            argsQueries2.forEach((x) =>
              cache.invalidate("Query", "configurationSettingsByName", x.arguments)
            );
          },
          readyReservasi: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllReservasis");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllReservasis", x.arguments)
            );
          },
          toWaitingPaymentReservasi: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getKunjunganPolisByAdminPoli");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getKunjunganPolisByAdminPoli", x.arguments)
            );
          },
          toSuccessReservasi: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllReservasis");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllReservasis", x.arguments)
            );
          },
          toCanceledReservasi: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllReservasis");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllReservasis", x.arguments)
            );
            const argsQueries2 = allField.filter((x) => x.fieldName === "meWithAllData");
            argsQueries2.forEach((x) =>
              cache.invalidate("Query", "meWithAllData", x.arguments)
            );
          },
          updatePerawat: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllPerawats");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllPerawats", x.arguments)
            );
          },
          deletePerawat: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllPerawats");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllPerawats", x.arguments)
            );
          },
          updateDokter: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllDokters");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllDokters", x.arguments)
            );
          },
          deleteDokter: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllDokters");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllDokters", x.arguments)
            );
          },
          updateRefObat: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllRefObats");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllRefObats", x.arguments)
            );
          },
          deleteRefObat: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllRefObats");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllRefObats", x.arguments)
            );
          },
          updatePenyakit: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllPenyakits");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllPenyakits", x.arguments)
            );
          },
          deletePenyakit: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllPenyakits");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllPenyakits", x.arguments)
            );
          },
          updateRefTindakan: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllRefTindakans");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllRefTindakans", x.arguments)
            );
          },
          deleteRefTindakan: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllRefTindakans");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllRefTindakans", x.arguments)
            );
          },
          updateRefBhp: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllRefBhps");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllRefBhps", x.arguments)
            );
          },
          deleteRefBhp: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllRefBhps");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllRefBhps", x.arguments)
            );
          },
          updatePoliBagian: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllPoliBagians");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllPoliBagians", x.arguments)
            );
          },
          deletePoliBagian: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllPoliBagians");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllPoliBagians", x.arguments)
            );
          },
          
        },
      },
    }),
    errorExchange,
    ssrExchange,
    multipartFetchExchange,
  ],
});
