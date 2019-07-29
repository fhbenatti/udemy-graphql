const typeDefs = `
schema {
  query: Query
}

type Query {
  books(orderBy: BooksOrderBy = RATING_DESC): [Book],
  reviews: [Review],
  book(id: ID!): Book
}

enum BooksOrderBy {
  RATING_DESC
  ID_DESC
  ID_ASC
}

type Review {
  id: ID!
  rating: Int
  title: String
  comment: String
  book: Book
  user: User
}

type Book {
  id: ID!
  title: String!
  description: String!
  imageUrl(size: ImageSize = LARGE): String!
  rating: Float
  subtitle: String
  ratingCount: Int
  authors: [Author]
  reviews: [Review]
}

type Author {
  id: ID!
  name: String
}

type User {
  id: ID!
  name: String
  email: String
  imageUrl(size: Int = 50): String
}

enum ImageSize {
  SMALL
  LARGE
}
`

export default typeDefs
