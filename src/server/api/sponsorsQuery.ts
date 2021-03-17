export const sponsorsQuery = `
query {
  account(slug: "date-fns") {
    orders(limit: 1000) {
      totalCount
      nodes {
        fromAccount {
          name
          imageUrl
          slug
          website
          id
        }
        createdAt
        updatedAt
        status
        amount {
          value
        }
        totalDonations {
          value
        }
        tier {
          slug
        }
      }
    }
  }
}
`.trim()
