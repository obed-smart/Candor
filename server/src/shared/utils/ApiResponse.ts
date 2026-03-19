export class ApiResponse {
  static success<T = unknown>(data?: T, message: string = 'success') {
    return {
      success: true,
      message,
      data: data ?? null,
    };
  }

  static error(message: string, code: number = 400) {
    return {
      success: false,
      message,
      data: null,
      code,
    };
  }
}
