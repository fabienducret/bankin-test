import { createContainer, asClass, asValue } from 'awilix';
import { BankinApiService } from './services/BankinApi.service.js';
import { BankinApiAdapter } from './adapters/BankinApi.adapter.js';
import { config } from './config/config.js';

export const injectDependencies = (overridedDependencies?: object) => {
  const container = createContainer();
  const dependencies = getDependencies(overridedDependencies);

  return container.register({
    config: asValue(dependencies.config),
    bankinApiService: asClass(dependencies.bankinApiService),
    bankinApiAdapter: asClass(dependencies.bankinApiAdapter),
  });
};

const getDependencies = (overridedDependencies: object) => {
  let dependencies = {
    config,
    bankinApiService: BankinApiService,
    bankinApiAdapter: BankinApiAdapter,
  };

  if (overridedDependencies) {
    dependencies = {
      ...dependencies,
      ...overridedDependencies,
    };
  }

  return dependencies;
};
