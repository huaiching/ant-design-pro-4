export const config = {
  mergedEnvConfig: false,
  basePath: {
    baseApi: 'https://dxp-cms-hrm-gateway-mli-qaa01.dev.aws06.mlic.cloud'
  },
  keyCloakConfig: {
    clientId: 'cms-core',
    realm: 'MLIInternalRealm',
    url: 'https://sso.core-uat.csmo.mli.com.corp'
  },
  microApps: [
    {
      name: 'app-demo',
      microApp: 'app-demo',
      appName: 'demo',
      envVariableName: 'DEMO',
      title: '元件範例',
      entry: '//localhost:7001',
      icon: 'icon-application-maintenance',
      path: '/container/demo'
    }
  ]
}

export const mergekeyCloakConfig = (configRequest: {
  CMS_KEYCLOAK_CONFIG_CLIENTID: string
  KEYCLOAK_REALM: string
  MLI_KEYCLOAK_APP_URL: string
}) => {
  config.keyCloakConfig = {
    clientId: configRequest.CMS_KEYCLOAK_CONFIG_CLIENTID ?? config.keyCloakConfig.clientId,
    realm: configRequest.KEYCLOAK_REALM ?? config.keyCloakConfig.realm,
    url: (configRequest.MLI_KEYCLOAK_APP_URL ?? config.keyCloakConfig.url) + '/auth/'
  }
}
