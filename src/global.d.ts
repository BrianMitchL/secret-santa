import type { calculate } from 'gift-exchange';

declare global {
  var GiftExchange: {
    calculate: typeof calculate;
  };
}
