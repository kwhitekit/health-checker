import { HealthReportResDto } from '../../../general/health-report.res.dto';
import { BaseCheckerValidator } from './base.checker-validator';

export abstract class BaseChecker<
  T extends BaseCheckerValidator,
  > {
    createDto: T;

    onMessage: (message: HealthReportResDto) => Promise<void> | void;
}
