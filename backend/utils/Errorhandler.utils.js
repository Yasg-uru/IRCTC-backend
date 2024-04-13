class Errorhandler extends Error {
    constructor(message,statuscode){
        super(message);
        this.statuscode=statuscode;
        this.message=message;
        Error.captureStackTrace(this,this.constructor)
    }
}
export const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof Errorhandler) {
        return res.status(err.statuscode).json({ error: err.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
};
export default Errorhandler;
