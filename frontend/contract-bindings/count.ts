import * as ex from "@completium/dapp-ts";
import * as att from "@completium/archetype-ts-types";
import * as el from "@completium/event-listener";
export class incremented implements att.ArchetypeType {
    constructor(public newcount: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return this.newcount.to_mich();
    }
    equals(v: incremented): boolean {
        return this.newcount.equals(v.newcount);
    }
    static from_mich(input: att.Micheline): incremented {
        return new incremented(att.Nat.from_mich(input));
    }
}
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
    async get_start(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Nat.from_mich((storage as att.Mpair).args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_count(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Nat.from_mich((storage as att.Mpair).args[1]);
        }
        throw new Error("Contract not initialised");
    }
    register_incremented(ep: el.EventProcessor<incremented>) {
        if (this.address != undefined) {
            el.registerEvent({ source: this.address, filter: tag => { return tag == "incremented"; }, process: (raw: any, data: el.EventData | undefined) => {
                    const event = (x => {
                        return incremented.from_mich((att.normalize(x) as att.Micheline));
                    })(raw);
                    ep(event, data);
                } });
            return;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const count = new Count();
