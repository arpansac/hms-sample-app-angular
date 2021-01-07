interface IRecordingInfo {
  enabled: boolean;
}

export interface IRoom {
  active: boolean;
  created_at: string;
  customer: string;
  description: string;
  id: string;
  name: string;
  recording_info: IRecordingInfo;
  updated_at: Date;
  user: string;
}
