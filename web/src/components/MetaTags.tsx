import Head from "next/head";

export const OriginalMetaTags = ({
  pageName = "Clinic"
}: {
  pageName?: string;
}) => {
  return (
    <Head>
      <title>{pageName} | Kelompok 4</title>
      <meta name="description" content="E-Commerce Tim 4 Present. Fast Clinic Reservation with SEO friendly" />
      <meta name="keywords" content="E-Commerce,Medicare,NodeJS,NextJS" />
      <link
        rel="shortcut icon"
        href="https://images.squarespace-cdn.com/content/v1/5b981eb02487fd89c8ca29b8/1593033505889-EWH1FJ1MUH1HO65VIDK7/VJD_icons_2-07.png"
        type="image/png"
      />
    </Head>
  )
}