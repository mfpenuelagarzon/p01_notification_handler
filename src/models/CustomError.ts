export default class CustomError extends Error {
    private type: string;
    private code: string;
    private msg: string;

    constructor(message: string, type: string, code: string) {
        super(message);
        this.type = type;
        this.code = code;
        this.msg = message;
    }
}