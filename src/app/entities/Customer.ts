import {AutoAssign} from '../core/decorators/auto-assign.decorator';

@AutoAssign()
export class Customer {
  id!: number;
  name!: string;
  email!: string;
  created_at!: Date;
}
