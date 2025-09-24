export const config = {
  mergedEnvConfig: false,
  keyCloakConfig: {
    clientId: 'csmo-example',
    realm: 'MLIExampleRealm',
    url: 'https://sso-mli-rhsso75-uat.apps.ocp4.devapi.mli.com.tw'
  },
  microApps: [
    {
      name: 'app-agent',
      microApp: 'app-agent',
      appName: 'agent',
      envVariableName: 'AGENT',
      title: 'agent',
      entry: '//localhost:8003',
      icon: 'icon-user',
      path: '/container/agent'
    },
    {
      name: 'app-demo',
      microApp: 'app-demo',
      appName: 'demo',
      envVariableName: 'DEMO',
      title: 'demo',
      entry: '//localhost:8002',
      icon: 'icon-download',
      path: '/container/demo'
    },
    {
      name: 'app-claim',
      microApp: 'app-claim',
      appName: 'claim',
      envVariableName: 'CLAIM',
      title: 'claim',
      entry: '//localhost:8001',
      icon: 'icon-diplomatic-note',
      path: '/container/claim'
    }
  ]
}

export const mergekeyCloakConfig = (configRequest: {
  KEYCLOAK_CLIENTID: string
  KEYCLOAK_REALM: string
  MLI_KEYCLOAK_APP_URL: string
}) => {
  config.keyCloakConfig = {
    clientId: configRequest.KEYCLOAK_CLIENTID ?? config.keyCloakConfig.clientId,
    realm: configRequest.KEYCLOAK_REALM ?? config.keyCloakConfig.realm,
    url: (configRequest.MLI_KEYCLOAK_APP_URL ?? config.keyCloakConfig.url) + '/auth/'
  }
}