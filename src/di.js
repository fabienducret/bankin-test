import awilix from 'awilix';
import { BankinApiService } from './services/BankinApi.service.js';
import { BankinApiAdapter } from './adapters/BankinApi.adapter.js';
import { config } from './config/config.js';

export const injectDependencies = (overridedDependencies) => {
  const container = awilix.createContainer();
  const dependencies = getDependencies(overridedDependencies);

  return container.register({
    config: awilix.asValue(dependencies.config),
    bankinApiService: awilix.asClass(dependencies.bankinApiService),
    bankinApiAdapter: awilix.asClass(dependencies.bankinApiAdapter),
  });
};

const getDependencies = (overridedDependencies) => {
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
