import Request  from '../utils/request';

export function hello() {
    return Request.axiosInstance({
        url: `/data/hello`,
        method: 'get',
    });
}