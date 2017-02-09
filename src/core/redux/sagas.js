import { cashierSagas } from './cashier/index';
import { machineSagas } from './machine/index';
import { analyticsSagas } from './analytics/index';

export default function* sagas() {
  yield [
    ...cashierSagas,
    ...machineSagas,
    ...analyticsSagas
  ];
}
