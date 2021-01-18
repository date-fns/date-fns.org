export interface SponsorsResponseNode {
  fromAccount: {
    imageUrl: string
    name: string
    website?: string
    slug: string
    id: string
  }
  tier: null | {
    slug: string
  }
  amount: {
    value: number
  }
  totalDonations: {
    value: number
  }
  createdAt: string
  updatedAt: string
  status: string
}

export interface SponsorsResponse {
  data: {
    account: {
      orders: {
        nodes: SponsorsResponseNode[]
      }
    }
  }
}

export interface Sponsor {
  id: string
  url: string
  imageUrl: string
  name: string
}

export interface Sponsors {
  gold: Sponsor[]
  silver: Sponsor[]
  bronze: Sponsor[]
  backers: Sponsor[]
}
