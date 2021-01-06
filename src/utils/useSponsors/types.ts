export interface SponsorsResponseNode {
  fromAccount: {
    imageUrl: string
    name: string
    website?: string
    slug: string
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
  silver: Sponsor[]
  bronze: Sponsor[]
  backers: Sponsor[]
}