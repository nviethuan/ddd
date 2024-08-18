import { CallHandler } from '@nestjs/common';
import { ResponseInterceptor } from './response.interceptor';

describe('ResponseInterceptor', () => {
  it('should be defined', () => {
    expect(new ResponseInterceptor()).toBeDefined();
  });

  it('should transform response correctly', () => {
    const interceptor = new ResponseInterceptor();
    const executionContext: any = {
      switchToHttp: () => ({
        getResponse: () => ({ statusCode: 200 }),
      }),
    };
    const callHandler: any = {
      handle: () => ({
        pipe: () => ({
          subscribe: (fn: any) =>
            fn({
              statusCode: 200,
              data: { message: 'success' },
            }),
        }),
      }),
    };

    interceptor.intercept(executionContext, callHandler).subscribe((result) => {
      expect(result).toEqual({
        statusCode: 200,
        data: { message: 'success' },
      });
    });
  });
});
