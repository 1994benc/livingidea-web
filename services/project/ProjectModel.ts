
    // TODO: implement the logic in this file
    export default class ProjectModel {
        constructor(
            public id: string,
        ) {}

        public static fromJSON(json: any): ProjectModel {
            return new ProjectModel(
                json.id,
            );
        }

        public toJSON(): any {
            return {
                id: this.id,
            };
        }
    }

