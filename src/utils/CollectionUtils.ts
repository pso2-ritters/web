import { complement, isEmpty, isNil, reject } from "ramda";

export const isNotEmpty = complement(isEmpty);
export const compact = reject(isNil);
