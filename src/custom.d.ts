declare namespace Express {
  export interface Request {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file?: any,
    user?: {
      userId: string,
      role: number
    }
  }
}