import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const increment_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Count {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(start: att.Int, params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./contracts/count.arl", {
            start: start.to_mich()
        }, params)).address;
        this.address = address;
    }
    async increment(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "increment", increment_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_increment_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "increment", increment_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_start(): Promise<att.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Int.from_mich((storage as att.Mpair).args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_count(): Promise<att.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Int.from_mich((storage as att.Mpair).args[1]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const count = new Count();
