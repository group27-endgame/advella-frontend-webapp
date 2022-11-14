import { BidProductId } from "./BidProductId.model";
import Product from "./Product.model";
import User from "./User.model";

export default interface BidProduct {
  amount: number;
  biddedProduct: Product;
  id: BidProductId;
  productBidder: User;
}
