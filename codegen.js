module.exports = {
  schema: [
    {
      "https://take-my-todo.hasura.app/v1/graphql": {
        headers: {
          "x-hasura-role": "user",
          "x-hasura-admin-secret": process.env.ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ["./src/**/*.tsx", "./src/**/*.ts"],
  overwrite: true,
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
