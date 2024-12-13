import {AutoAssign} from '../core/decorators/auto-assign.decorator';

@AutoAssign()
export class Vm {
  id!:number;
  customerId!:number;
  name!:string;
  flavorId!:number;
  applicationId!:number;
  proxmoxId!:string;
  status!: string;
  createdAt!: Date;
}
