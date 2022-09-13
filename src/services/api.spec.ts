/* eslint-disable no-undef */
import api from './api';

describe('Api', () => {
  it('should return a positive status code', async () => {
    const apiStatus = await api.get('ws/72930000/json/');
    expect(apiStatus.status).toBe(200);
  });
  it('should return a data with cep info', async () => {
    const apiData = await api.get('ws/72930000/json/');
    expect(apiData.data).toBeDefined();
    expect(apiData.data.cep).toEqual('72930-000');
  });
});
