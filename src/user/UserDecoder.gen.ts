/* TypeScript file generated from UserDecoder.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as UserDecoderBS__Es6Import from './UserDecoder.bs';
const UserDecoderBS: any = UserDecoderBS__Es6Import;

import type {event as UserDecider_event} from './UserDecider.gen';

import type {user_registered as UserDecider_user_registered} from './UserDecider.gen';

export const encode: (ev:UserDecider_event) => { readonly data: UserDecider_user_registered; readonly type: string } = function (Arg1: any) {
  const result = UserDecoderBS.encode({TAG: 0, _0:Arg1} as any);
  return result
};

export const decode: (ev:{ readonly data: UserDecider_user_registered; readonly type: string }) => (null | undefined | UserDecider_event) = function (Arg1: any) {
  const result = UserDecoderBS.decode(Arg1);
  return (result == null ? result : result._0)
};
