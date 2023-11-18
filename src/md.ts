import IpfsApi from "./ipfs";


export type TreeNode = {
    children?: TreeNode[]
    type: string
    value?: string
}

export type LiteNode = {
    children?: (LiteNode|TreeLink)[]
    type: string
    value?: string | TreeLink
}


export type TreeLink = {
    "/": string
}

export class MdProcessor {
    constructor(private ipfs: IpfsApi) {
    }

    async textToLink(tree: TreeNode): Promise<  LiteNode> {
        return {type: tree.type, value: {"/": await this.ipfs.saveBytes(tree.value)} };
    }

    async dagToLink(tree: LiteNode): Promise<TreeLink> {
        return {"/": await this.ipfs.saveObject(tree)}
    }

    async recursiveProcessing(root: TreeNode, level: number): Promise<LiteNode|TreeLink> {
        let resChildren: (LiteNode|TreeLink)[];
        if (root.children) {
            let items = root.children?.map(
                (child) => this.recursiveProcessing(child, level + 1));

            resChildren = await Promise.all(items);
        }

        const  resNode:LiteNode = {type: root.type, value: root.value, children: resChildren};


        if (root.type === "text") {
            return await this.textToLink(root);
        }

        if (level === 1) {
            return await this.dagToLink(resNode);
        }
        return resNode;
    }

    async rootProcessing(root: TreeNode): Promise<string> {
        const dag = await this.recursiveProcessing(root, 0);
        return await this.ipfs.saveObject(dag)
    }

}
