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
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "me");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "me", x.arguments)
            );
          },
          register: (_result, args, cache, info) => {
            cache.invalidate("Query");
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
          createPoliBagian: (_result, args, cache, info) => {
            const allField = cache.inspectFields("Query");
            const argsQueries = allField.filter((x) => x.fieldName === "getAllPoliBagians");
            argsQueries.forEach((x) =>
              cache.invalidate("Query", "getAllPoliBagians", x.arguments)
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
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    multipartFetchExchange,
  ],
});
