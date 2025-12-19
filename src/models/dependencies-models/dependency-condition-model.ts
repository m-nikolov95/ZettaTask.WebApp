import { ComparisonOperator } from './comparison-operator';

export interface DependencyCondition {
    field: string; // Field we're watching
    operator: ComparisonOperator; // How we compare the field value
    value: any; // What we're comparing with
}