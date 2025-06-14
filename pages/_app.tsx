import MainLayout from "@/components/MainLayout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const title = pageProps.title || "My Platform";
  const description = pageProps.description || "My Platform Description";
  const image = pageProps.image || "https://my-domain/meta.svg";
  const url = pageProps.url || "https://my-domain.com";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content="{fb-id}" />

        {/* SEO for WEB */}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="url" content={url} />
        <meta name="image" content={image} />

        {/* SEO for Facebook */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />

        {/* SEO for Twitter */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:image" content={image} />
      </Head>
      <MainLayout name={Component.displayName}>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}
