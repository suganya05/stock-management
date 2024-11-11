export interface IProduct {
  photoUrl?: string | undefined;
  _id: string;
  name: string;
  actualPrice: number;
  retailPrice: number;
  unit: string;
}

export interface IAllProducts {
  prodList?: Partial<IProduct>[];
  onDelete?: (id: string | undefined) => void;
  onEdit?: (id: string | undefined) => void;
}

export interface ICustomProduct {
  selectedId: string | null;
  prodList?: Partial<IProduct>[];
  onDelete?: (id: string | undefined) => void;
  onEdit?: (id: string | undefined) => void;
}

export interface AddNewProductForm {
  name: string;
  unitOfMesurment: string;
  wholesalePrice: string;
  retailPrice: string;
  imgUrl?: string;
}

export interface IOutlet {
  _id?: string;
  outletName: string;
  address: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  photoUrl?: string;
  customPricingId?: string;
  qrcode?: string;
}

export interface ISalesPerson {
  _id?: string;
  name: string;
  email: string;
  photoUrl?: string;
  phoneNumber: string;
  createdBy?: string;
  isActive?: boolean;
}

export interface IStockItem {
  productId: string;
  quantity: number;
}
export interface IStock {
  _id: string;
  allotedDate: Date;
  stocks: IStockItem[];
}

export interface IGetStockItem {
  product: IProduct;
  quantity: number;
  updatedAt: Date;
  createdAt: Date;
}

// export interface IGetStock {
//   _id: string;
//   allotedDate: Date;
//   stocks: IGetStockItem[];
// }

export interface IAllocate {
  _id: string;
  salesPerson: ISalesPerson;
  allotedDate: Date;
  allocatedItems: IGetStockItem[];
  soldItem: IGetStockItem[];
  availableItems: IGetStockItem[];
}

export interface IStatus {
  type: "sucess" | "server" | "client" | "unknown";
  data: any;
}

export interface IDenomination {
  salesPerson: ISalesPerson;
  totalAmount: number;
  noOfFiveHundred: number;
  noOfTwoHundred: number;
  noOfHundred: number;
  noOfFifty: number;
  noOfTwenty: number;
  noOfTen: number;
}

export interface IHandOver {
  salesPerson: ISalesPerson;
  products: INewStockItem[];
  proofUrl: string;
}

export interface IGetMangeRep {
  denomination: IDenomination;
  handOver: IHandOver;
  salesPerson: ISalesPerson;
  isAbsent: boolean;
}

export interface INewStockItem {
  product: IProduct;
  quantity: number;
}

export interface IDamagedProduct {
  date: Date;
  outlet: IOutlet;
  prodcut: INewStockItem[];
  soldBy: ISalesPerson;
  proofUrl: string;
}
