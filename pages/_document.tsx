import Document, { Html, Head, Main, NextScript } from 'next/document'

class CreateAuctionHouseDocument extends Document {
  render() {
    return (
      <>
        <script>{`/*
@@@@@@@@@@@@@@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*              @@@@@@   
@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*           @@@@@@@@@   
        @@@@@@@   @@@@@@@        @@@@@@@        @@@@@         @@@@@@@@@@@   
      @@@@@@@    @@@@@@            @@@@@@     @@@@@@@      @@@@@@@@*@@@@@   
   @@@@@@*       @@@@@              @@@@@   @@@@@@@      @@@@@@@    @@@@@   
@@@@@@@*         @@@@@@            @@@@@@  @@@@@@     @@@@@@@@      @@@@@   
@@@@@@*           @@@@@@@        @@@@@@@    @@@@@@@ @@@@@@@         @@@@@   
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@           @@@@@   
  *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@           @@@@@@**            @@@@@
        */`}</script>
        <Html>
          <Head>{/* Place any custom scripts here */}</Head>
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
