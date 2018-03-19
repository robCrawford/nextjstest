exports.type = `
  type Movie {
    id: ID!
    title: String!
    voteAverage: Float!
    posterPath: String!
    backdropPath: String!
    overview: String!
    tagline: String
    runtime: Int
    revenue: Int
  }

  extend type Query {
    movie(id: ID!): Movie
    movies(page: Int): [Movie!]!
  }
`;

exports.resolvers = {
    Movie: {
        posterPath: root => {
            return `https://image.tmdb.org/t/p/w500${root.posterPath}`;
        },
        backdropPath: root => {
            return `https://image.tmdb.org/t/p/w1280${root.backdropPath}`;
        }
    },
    Query: {
        movies: (root, { page = 1 }, { loaders }) => {
            return loaders.content
                .load([
                    "3/discover/movie",
                    {
                        params: {
                            page
                        }
                    }
                ])
                .then(res => res.data.results);
        },
        movie: (root, { id }, { loaders }) => {
            return loaders.content
                .load([`3/movie/${id}`])
                .then(res => res.data);
        }
    }
};