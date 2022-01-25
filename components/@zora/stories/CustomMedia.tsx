import { MediaConfiguration } from "../context/MediaConfiguration";
import { MediaObject } from "../components/MediaObject";
import { MediaRendererProps } from "..";

const PDFRenderer = ({ objectProps }: MediaRendererProps) => {
  return (
    <iframe {...objectProps} width="100%" height="800px" style={{ border: 0 }}>
      IFrame support needed to see PDF
    </iframe>
  );
};

export const CustomMedia = () => {
  const customRenderers = {
    "uri:application/pdf": {
      hasLoading: false,
      renderer: PDFRenderer,
    },
  };
  return (
    <MediaConfiguration mediaRenderers={customRenderers}>
      <MediaObject
        uri="https://ipfs.io/ipfs/bafybeignaimfgcdrynn2ohncwjk5sdme6vg3hqpgft6h6two7dq27d22c4"
        metadata={{
          name: "PDF TEST",
          description: "PDF Test",
          mimeType: "application/pdf",
        }}
      />
    </MediaConfiguration>
  );
};
