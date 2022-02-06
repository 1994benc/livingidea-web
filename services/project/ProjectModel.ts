
    // TODO: implement the logic in this file
    export default class ProjectModel {
        constructor(
            public id: string,
            public name: string = "",
            public owner: string = "",
            public collaborators: string[] = [],
            public viewers: string[] = [],
            public isPublic: boolean = false,
            public createdAt: Date = new Date(),
            public updatedAt: Date = new Date(),
            public description: string = "",
        ) {}

        public static fromJSON(json: any): ProjectModel {
            return new ProjectModel(
                json.id,
                json.name,
                json.owner,
                json.collaborators,
                json.viewers,
                json.isPublic,
                json.createdAt?.toDate(),
                json.updatedAt?.toDate(),
                json.description
            );
        }

        public toJSON(): any {
            return {
                id: this.id,
                name: this.name,
                owner: this.owner,
                collaborators: this.collaborators,
                viewers: this.viewers,
                isPublic: this.isPublic,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt,
                description: this.description
            };
        }

        public clone(): ProjectModel {
            return new ProjectModel(
                this.id,
                this.name,
                this.owner,
                this.collaborators,
                this.viewers,
                this.isPublic,
                this.createdAt,
                this.updatedAt,
                this.description
            );
        }
    }

