import NextHead from 'next/head'

const Head = ({
  title,
  description,
  url,
  ogImage,
}: {
  title?: string
  description?: string
  url?: string
  ogImage?: string
}) => (
  <NextHead>
    <meta charSet='UTF-8' />
    <title>{title ? process.env.NEXT_PUBLIC_APP_TITLE || title : process.env.NEXT_PUBLIC_APP_TITLE}</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='description' content={description || process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION} />
    <link rel='icon' type='image/png' sizes='24x24' href={process.env.NEXT_PUBLIC_FAVICON} />
    <meta property='og:url' content={url || process.env.NEXT_PUBLIC_BASE_URL} />
    <meta property='og:title' content={title || ''} />
    <meta
      property='og:description'
      content={description || process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION}
    />
    <meta name='twitter:site' content={url || process.env.NEXT_PUBLIC_BASE_URL} />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:image' content={ogImage || process.env.NEXT_PUBLIC_DEFAULT_OG_CARD} />
    <meta property='og:image' content={ogImage || process.env.NEXT_PUBLIC_DEFAULT_OG_CARD} />
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='630' />
  </NextHead>
)

export default Head
