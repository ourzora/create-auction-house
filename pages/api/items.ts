import { fetchTokens } from "../../data/fetchTokens";

module.exports = async (req: any, res: any) => {
  const id = req.query.id
  const items = await fetchTokens(undefined, undefined);
  // console.log('items', items)
  res.status(200).json(items);
};
