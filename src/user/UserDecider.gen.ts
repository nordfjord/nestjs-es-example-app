/* TypeScript file generated from UserDecider.res by genType. */
/* eslint-disable import/first */


const $$toJS73481706: { [key: string]: any } = {"0": "Initial"};

const $$toRE73481706: { [key: string]: any } = {"Initial": 0};

// @ts-ignore: Implicit any on import
import * as Curry__Es6Import from 'rescript/lib/es6/curry.js';
const Curry: any = Curry__Es6Import;

// @ts-ignore: Implicit any on import
import * as UserDeciderBS__Es6Import from './UserDecider.bs';
const UserDeciderBS: any = UserDeciderBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type user_registered = { readonly email: string; readonly passwordHash: string };

// tslint:disable-next-line:interface-over-type-literal
export type event = user_registered;

// tslint:disable-next-line:interface-over-type-literal
export type command = user_registered;

// tslint:disable-next-line:interface-over-type-literal
export type state = "Initial" | user_registered;

export const initialState: state = typeof(UserDeciderBS.initialState) === 'object'
? UserDeciderBS.initialState._0
: $$toJS73481706[UserDeciderBS.initialState];

export const evolve: <T1>(_state:T1, event:event) => state = function <T1>(Arg1: any, Arg2: any) {
  const result = Curry._2(UserDeciderBS.evolve, Arg1, {TAG: 0, _0:Arg2} as any);
  return typeof(result) === 'object'
    ? result._0
    : $$toJS73481706[result]
};

export const decide: (state:state, command:command) => event[] = function (Arg1: any, Arg2: any) {
  const result = Curry._2(UserDeciderBS.decide, typeof(Arg1) === 'object'
    ? {TAG: 0, _0:Arg1} as any
    : $$toRE73481706[Arg1], {TAG: 0, _0:Arg2} as any);
  return result.map(function _element(ArrayItem: any) { return ArrayItem._0})
};
