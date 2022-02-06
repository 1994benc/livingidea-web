
    // TODO: implement the logic in this file
    export default class PageModel {
        constructor(
            public id: string,
        ) {}

        public static fromJSON(json: any): PageModel {
            return new PageModel(
                json.id,
            );
        }

        public toJSON(): any {
            return {
                id: this.id,
            };
        }
    }

