export type NftCollection = {
  collection: string;
  description: string;
  image_url: string;
  name: string;
  owner: string;
  contracts: { address: string }[];
  twitter_username: string;
  instagram_username: string;
  discord_url: string;
  project_url: string;
  opensea_url: string;
  fees: {
    fee: number;
    recipient: string;
    required: boolean;
  }[];
  total_supply: number;
  created_date: string;
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
  orderType: number;
};

export type NftSaleEvent = {
  event_type: string;
  order_hash: string;
  chain: string;
  closing_date: number;
  nft: {
    identifier: string;
    collection: string;
    contract: string;
    token_standard: string;
    name: string;
    image_url: string;
    metadata_url: string;
  };
  quantity: number;
  seller: string;
  buyer: string;
  payment: {
    quantity: string;
    token_address: string;
    decimals: number;
    symbol: string;
  };
  transaction: string;
  event_timestamp: number;
};

export type CollectionTraits = {
  categories: {
    [category: string]: string;
  };
  counts: {
    [category: string]: TraitCounts;
  };
};

export type TraitCounts = {
  [type: string]: number;
};
