export type NftCollection = {
  image_url: string;
  name: string;
  contracts: { address: string }[];
  twitter_username: string;
  instagram_username: string;
  discord_url: string;
  project_url: string;
};

export type NftCollectionStats = {
  total: {
    volume: number;
    sales: number;
    average_price: number;
    num_owners: number;
    market_cap: number;
    floor_price: number;
    floor_price_symbol: string;
  };
  intervals: Array<{
    interval: string;
    volume: number;
    volume_diff: number;
    volume_change: number;
    sales: number;
    sales_diff: number;
    average_price: number;
  }>;
};

export type NftListing = {
  order_hash: string;
  chain: string;
  type: string;
  price: {
    currency: string;
    value: number;
  };
  offer: {
    itemType: number;
    token: string;
    identifierOrCriteria: string;
  }[];
  offerer: string;
  startTime: string;
  endTime: string;
};
