import { FieldResolveInput } from 'stucco-js';
import { resolverFor } from '../zeus/index.js';

export const handler = async (input: FieldResolveInput) =>
  resolverFor('Query', 'ListAll', async (args) => {
    return ['ljnwldw'];
  })(input.arguments);
