import { BidServiceId } from "./BidServiceId.model";
import Service from "./Service.model";
import User from "./User.model";

export default interface BidService {
  amount: number;
  biddedService: Service;
  id: BidServiceId;
  serviceBidder: User;
}
