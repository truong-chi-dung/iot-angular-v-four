import { PinionShaftMeasureValue } from './pinionshaft-measure-value';
import { Deserializable } from '../../@model/deserializable.model';

export class PinionLeftRightMeasureValue implements Deserializable {

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    left: PinionShaftMeasureValue[];
    right: PinionShaftMeasureValue[];
}