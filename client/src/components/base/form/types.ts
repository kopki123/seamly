/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
export interface Rule {
  message: string;
  pattern?: RegExp;
  validator?: (rule: any, value: any) => boolean;
}
