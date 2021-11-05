export const envType = process.env.REACT_APP_ENV || process.env.NODE_ENV || 'development';
export const isDev = envType === 'development';

const config = {
  apiUrl: 'http://localhost:4000/api/v2',
  oldServerUrl: 'http://localhost:6800/api',
  oldStaffUrl: 'http://localhost:3001',
  crmUrl: 'http://localhost:3002',
  appId: 'staff_2.0',
};

// eslint-disable-next-line default-case
switch (envType) {
  case 'production':
    config.apiUrl = 'https://staff.fusion-tech.pro/api/v2';
    config.oldStaffUrl = 'https://staff.fusion-team.com';
    config.crmUrl = 'https://crm.fusion-team.com';
    break;

  case 'stage':
    config.apiUrl = 'https://staff.demo.fusion-tech.pro/api/v2';
    config.oldStaffUrl = 'https://staff.demo.fusion-team.com';
    config.crmUrl = 'https://crm.demo.fusion-team.com';
    break;
}

export default config;
