export class Client {
    public readonly idClient?: string;
    public email: string;
    public name: string;
    public password: string;
    public cpf: string;
    public type: string
    public readonly sale?: number;

    constructor(props: Omit<Client, "idClient" | "sale">) {

        this.email = props.email;
        this.name = props.name;
        this.password = props.password;
        this.cpf = props.cpf;
        this.type = props.type;
        this.sale = 0;

    };
};