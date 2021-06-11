import NextHead from 'next/head';

import { LANDING_COPY } from '../lib/copy'

const defaultDescription = LANDING_COPY;
const defaultTitle = process.env.NEXT_PUBLIC_APP_TITLE;
const defaultKeywords = process.env.NEXT_PUBLIC_APP_TITLE;
const defaultOGURL = process.env.NEXT_PUBLIC_BASE_URL || '';
const defaultOGImage = `${process.env.NEXT_PUBLIC_BASE_URL}/social-card.png`;

type HeadProps = {
  title?: string,
  description?: string,
  keywords?: string,
  url?: string,
  ogImage?: string
}

const Head = ({ title, description, keywords, url, ogImage }: HeadProps) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title || defaultTitle}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description || defaultDescription} />
    <meta name="keywords" content={keywords || defaultKeywords} />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
    <link rel="android-chrome-192x192" sizes="192x192" href="/favicons/android-chrome-192x192.png"/>
    <link rel="android-chrome-512x512" sizes="512x512" href="/favicons/android-chrome-512x512.png"/>
    <link rel="mstile-150x150" href="/favicons/mstile-150x150.png" />
    <link rel="safari-pinned-tab" href="/favicons/safari-pinned-tab.svg" />
    <meta property="og:url" content={url || defaultOGURL} />
    <meta property="og:title" content={title || ''} />
    <meta property="og:description" content={description || defaultDescription} />
    <meta name="twitter:site" content={url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage || defaultOGImage} />
    <meta property="og:image" content={ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

export default Head;
