/**
 * 비동기 함수에 공통 에러 핸들링을 적용합니다.
 * @param asyncFn 비동기 함수
 * @param errorMsg 에러 메시지 (ERROR_MSG에서 가져와야 함)
 * @returns 처리된 함수
 */

export const withErrorHandler =
  (options: IErrorHandlerOptions) =>
  async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    try {
      return await asyncFn();
    } catch (error) {
      console.error(options.message, error);
      throw new Error(options.message);
    }
  };
