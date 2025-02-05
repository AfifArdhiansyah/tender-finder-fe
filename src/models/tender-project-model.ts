import { AccountOfficerModel } from "./ao.mode";
import { OfficeModel } from "./office-model";
import { TenderStatusModel } from "./tender-status-model";

export interface TenderProjectModel {
  id: string;
  nama: string;
  nama_pemenang: string;
  lokasi_pekerjaan: string;
  npwp: string;
  lokasi_instansi: string;
  ltd_loc: string;
  lng_loc: string;
  nilai_tender: string;
  branch_id: number;
  ao_id: number;
  tender_statuses: TenderStatusModel[];
  account_officer: AccountOfficerModel;
  branch: OfficeModel;
  latest_status: number;
  created_at: string;
  updated_at: string;
}
  