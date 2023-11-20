import IpfsApi from "./ipfs";


export type TreeNode = {
    children?: TreeNode[]
    type: string
    value?: string
    depth: 1,
}

export type LiteNode = {
    children?: (LiteNode|TreeLink)[]
    type: string
    value?: string | TreeLink
    params?: any
}


export type TreeLink = {
    "/": string
}

export class MdProcessor {
    constructor(private ipfs: IpfsApi) {
    }

    async textToLink(tree: LiteNode): Promise<  LiteNode> {
        return {type: tree.type, value: {"/": await this.ipfs.saveBytes(tree.value as string)} };
    }

    async dagToLink(tree: LiteNode): Promise<TreeLink> {
        return {"/": await this.ipfs.saveObject(tree)}
    }

    async recursiveProcessing(root: LiteNode, level: number): Promise<LiteNode|TreeLink> {
        let resChildren: (LiteNode|TreeLink)[];
        if (root.children) {
            let items = root.children?.map(
                (child) => this.recursiveProcessing(child as LiteNode, level + 1));

            resChildren = await Promise.all(items);
        }

        const  resNode:LiteNode = {type: root.type, value: root.value, children: resChildren};

        if(Object.keys(root.params).length>0) {
            resNode.params=root.params;
        }

        if (root.type === "text") {
            return await this.textToLink(root as LiteNode);
        }

        if (level === 1) {
            return await this.dagToLink(resNode);
        }
        return resNode;
    }

    async rootProcessing(root: LiteNode): Promise<string> {
        const dag = await this.recursiveProcessing(root, 0);
       // console.log("DAG", dag)
        return await this.ipfs.saveObject(dag)
    }

}
