import Document, { Html, Head, Main, NextScript } from 'next/document'

class CreateAuctionHouseDocument extends Document {
  render() {
    return (
      <>
        <Html>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crosssOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@300;400;900&display=swap" rel="stylesheet"/>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    )
  }
}

export default CreateAuctionHouseDocument
