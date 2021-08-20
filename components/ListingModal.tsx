import ReactModal from "react-modal";
import { useState } from "react";
import { Button } from "@zoralabs/nft-components/dist/components/Button";

export const ListingModal = ({
  setListModalOpen,
  listModalOpen,
}: {
  setListModalOpen: (test: boolean) => void;
  listModalOpen: boolean;
}) => {
  const [url, setURL] = useState("");
  const [item, setItem] = useState<any>();
  return (
    <ReactModal
      isOpen={listModalOpen}
      contentLabel="Inline Styles Modal Example"
      style={{
        overlay: {
          zIndex: 200,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        },
        content: {
          color: "black",
          fontSize: '1.3em',
          padding: '80px',
        },
      }}
    >
      <div style={{fontFamily: 'helvetica'}}>
        <h3 css={{fontSize: '1.6em', paddingBottom: '20px'}}>List your NFT</h3>
        <label>
          NFT URL (opensea, rarible supported):
          <br />
          <input
            type="text"
            value={url}
            css={{
              padding: '12px',
              fontSize: '1.2em',
              marginTop: 10,
              marginBottom: 10,
            }}
            onChange={(evt) => {
              const url = evt.target.value;
              setURL(url);
              const tokenValue = { contractAddress: "", tokenId: "" };
              if (url.match(/opensea.io/)) {
                const uri = url.match(/opensea.io\/assets\/([^\/]+)\/([^\/]+)/);
                if (!uri) {
                  return;
                }
                tokenValue.contractAddress = uri[1];
                tokenValue.tokenId = uri[2];
                setItem(tokenValue);
              }
              if (url.match(/rarible.com/)) {
                const uri = url.match(/rarible.com\/token\/([^:]+):([^?]+)/);
                if (!uri) {
                  return;
                }
                tokenValue.contractAddress = uri[1];
                tokenValue.tokenId = uri[2];
                setItem(tokenValue);
              }
            }}
          />
        </label>
      </div>
      {item && (
        <div css={{fontFamily: 'helvetica', fontSize: '1.2em', marginTop: 10}}>
          <Button
            css={{ fontFamily: 'helvetica' }}
            onClick={() => {
              window.location.href = `https://zora.co/auction/${item.contractAddress}/${item.tokenId}/list`;
            }}
          >
            Set a auction house reserve price
          </Button>
        </div>
      )}
      <button
        className="small-button"
        css={{ position: "absolute", right: "20px", top: "20px" }}
        onClick={() => setListModalOpen(false)}
      >
        Close
      </button>
    </ReactModal>
  );
};
