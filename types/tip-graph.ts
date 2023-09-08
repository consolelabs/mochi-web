import { Profile } from '@consolelabs/mochi-rest';
import { Platform } from '@consolelabs/mochi-ui';
import { NodeObject } from 'react-force-graph-2d';

type UsernameFmt = {
  value: string;
  id: string;
  url: string;
  plain: string;
  platform?: Platform.App | Platform.Mochi | Platform.Discord | Platform.Telegram | Platform.Twitter | Platform.Vault | null;
};

export type ProfileNode = {
  id: string;
  profile: Profile;
  parsedProfile?: UsernameFmt;
  totalVolume: number
  neighborIds: Set<Profile['id']>;
  volumeRank?: number;
  volumePercent?: number;
}

export type SelectedProfileNode = (NodeObject & ProfileNode)

export type TipNetworkData = {
  targetProfile?: ProfileNode,
  spendVolume: number,
  receiveVolume: number,
  totalVolume: number,
}
