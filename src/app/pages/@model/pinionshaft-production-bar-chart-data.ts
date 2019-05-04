import { PinionShaftProduction } from './pinionshaft-production';
import { Deserializable } from '../../@model/deserializable.model';

export class PinionShaftProductionBarChartData implements Deserializable {

    infoProductionData: PinionShaftProduction[];
    ngProductionData: PinionShaftProduction[];
    okProductionData: PinionShaftProduction[];

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
