
export interface ITask {
  id: string;
  taskType: string;
  coilType: ICoilType;
  requiredFt: number;
  source: string;
  destination: string;
  requiredDate: string;
  taskState: string;
  preferredCoils: ITaskCoil[];
  nonpreferredCoils: ITaskCoil[];
  errorFileds?: string[];
  warningFields?: string[];
  userName: string;
  sourceLocationId: string;
  destinationLocationId: string;
}

export interface ITaskCoil extends ICoil {
  location: ILocation;
  errorFlag?: number;
}

export interface ICoil {
  id: string;
  dateIn: string;
  coilTypeCode: string;
  materialType: string;
  color: string;
  gauge: number;
  widthIn: number;
  lengthRemainingFt: number;
  lengthStartFt: number;
  locationId: string;
  vendor: string;
  heat: string;
  consignment: string;
}

export interface ILocation {
  id: string;
  documentID: string;
  code: string;
  category: string;
  name: string;
}

export interface IReasonCode {
  codeSet: string;
  id: string;
  reason: string;
}

export interface ICoilType {
  coilTypeCode: string;
  materialType: string;
  color: string;
  gauge: number;
  widthIn: number;
}
export interface ISearchFacet {
  facetName: string;
  facetTitle: string;
  checked: boolean;
  existVaules: string[];
  selectedItems: Array<any>;
  facetValues: IFacetValue[];
}

export interface IFacetValue {
  title: string;
  selected: boolean;
  resultCount: number;
  value?: number;
}

export interface IUser {
  username: string;
  password: string;
  url: string;
}

export interface ITaskFacetDef {
  title: string;
  filters: {
    id: string;
    title: string;
  }[];
}

export interface ITaskFacetUserValues {
//  id: string,
//  userName: string,
  filters: {
    filterId: string;
    checked: boolean;
  }[];
}

export interface IUserTaskFacetViewModel {
  title: string;
  //checked: boolean,
  filters: {
    id: string;
    checked: boolean;
    title: string;
  }[];
}
