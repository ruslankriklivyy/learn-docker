import { AxiosResponse } from 'axios';

export async function axiosCatch(
  request: Promise<AxiosResponse<any>>,
): Promise<any> {
  try {
    const response = await request;

    return [null, response?.data];
  } catch (err: any) {
    if (err?.response?.status === 401) {
      // todo: some logic
    }

    if (err?.response?.data) {
      return [err?.response?.data, null];
    }

    return [err, null];
  }
}
