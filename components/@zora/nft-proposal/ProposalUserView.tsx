import { useZoraUsername } from "@zoralabs/nft-hooks";
import type { StyleProps } from "src/utils/StyleTypes";
import { AddressView } from "../components/AddressView";
import { useMediaContext } from "../context/useMediaContext";

type ProposalUserViewProps = {
  address: string;
} & StyleProps;

export const ProposalUserView = ({
  address,
  className,
}: ProposalUserViewProps) => {
  const { getStyles } = useMediaContext();
  const username = useZoraUsername(address);

  return (
    <div {...getStyles("nftProposalUserView", className)}>
      {username.username?.profile_image_url && (
        <img
          src={username.username?.profile_image_url}
          width="50"
          height="50"
          alt={username.username?.name}
        />
      )}
      <span>
        <AddressView address={address} />
        {username.username?.name && (
          <span {...getStyles("textSubdued")}>{username.username.name}</span>
        )}
      </span>
    </div>
  );
};
