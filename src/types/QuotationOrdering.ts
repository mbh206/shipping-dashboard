import { Quotation } from './Quotation';
import { Order } from './Order';

export interface QuotationOrdering {
	quotation: Quotation;
	order: Order;
}
