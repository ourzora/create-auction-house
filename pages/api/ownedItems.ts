import { fetchItems } from "../../data/fetchItems";

module.exports = async (req: any, res: any) => {
  const { owner } = req.query;
  if (!owner) {
    return res.status(403).json({ failed: true });
  }
  const ownedTokens = await fetchItems(undefined, owner);

  res.status(200).json(ownedTokens);
};
