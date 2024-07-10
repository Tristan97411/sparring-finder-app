export type Alert = {
  header: string;
  detail: string;
};

export type FunctionalAlert = {
  header: string;
  detail: Function;
};

export type UserData = {
  profileData?: { adresse?: string; pseudo?: string; telephone?: string };
  sportsPalmares?: {
    loses: number;
    name: string;
    tieBreaks: number;
    wins: number;
    years: number;
  }[];
};

export type SignUpRes = {
  status: string;
  message: string;
  fbCode?: string;
  userRecordAuthId?: string;
};
