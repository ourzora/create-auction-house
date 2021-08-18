import { fetchItems } from "../../data/fetchItems";

module.exports = async (req: any, res: any) => {
  const id = req.query.id
  const items = await fetchItems(id, undefined);

  res.status(200).json(items);
};
