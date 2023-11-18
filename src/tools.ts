import {MdProcessor, TreeNode} from "./md";
import {unified} from "unified";
import markdown from "remark-parse";
import gmf from "remark-gfm";
import IpfsApi from "./ipfs";
import * as fs from "fs";

function treeCleaning(root: TreeNode | null): TreeNode {
    let children = root.children?.map(child => treeCleaning(child));
    return {
        type: root.type, value: root.value, children:
        children
    };
}

export async function exportMdFileToIpfs(mdFile: string,ipfs:IpfsApi):Promise<{cid:string,title:string}> {
    const markdownContent = fs.readFileSync(mdFile, 'utf-8');
    const tree = unified().use(markdown).use(gmf).parse(markdownContent) as TreeNode;
    let firstItem = tree.children[0];
    firstItem.type = "heading";
    let title= firstItem.children[0].value ;


    const cleaned = treeCleaning(tree);
    const processor = new MdProcessor(ipfs);
    let cid = await processor.rootProcessing(cleaned);
    return {cid,title}
}

