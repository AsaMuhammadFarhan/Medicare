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
      keys: {,
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
        },
      },
    }),
    errorExchange,
    ssrExchange,
    multipartFetchExchange,
  ],
});
