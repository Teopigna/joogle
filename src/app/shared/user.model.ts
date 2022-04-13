export class User {
    constructor(
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate : Date
    ) {}
        
    get token(){  //user.token == similar to property
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}