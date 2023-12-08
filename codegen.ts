import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  generates: {
    './graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers', 'typescript-mongodb']
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  }
}

export default config
