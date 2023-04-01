type Tree<T> = {
    value: T,
    branch: Array<Tree<T>>,
    word: boolean,
}

export default class Trie {
    private zero = "a".charCodeAt(0);
    private head: Tree<string>;

    constructor() {
        this.head = { value: "", branch: [], word: false };
    }

    insert(item: string): void {
        let curr = this.head;
        for (let i = 0; i < item.length; i++) {
            let index = this.idx(item[i]);

            if (curr.branch[index] !== undefined) {
                curr = curr.branch[index] as Tree<string>;
                continue;
            }

            curr.branch[index] = { value: item[i], branch: [], word: false } as Tree<string>;
            curr = curr.branch[index] as Tree<string>;
        }

        curr.word = true;
    }
    // find last branch where has 2 divergences; then cut the next letter.
    // if no is found cut the whole word, and see if is not a word. if it is continue;
    
    // comented code is trying to make a way to delete unused words in the tree.
    // couldn't make it work, and stayed with garbage in the tree
    delete(item: string): void {
        let curr = this.head;
        // let last_branch = curr;
        // let last_letter = this.idx(item[0]);

        for (let i = 0; i < item.length; i++) {
            let index = this.idx(item[i]);
            // let count = 0;
            
            // curr.branch.forEach(_ => count++);
            
            // if (count > 1 || curr.word === true) {
            //     last_branch = curr;
            //     last_letter = index;
            // }

            curr = curr.branch[index] as Tree<string>;
        }
        
        curr.word = false;

        // delete last_branch.branch[last_letter];
    }
    find(partial: string): string[] {
        let curr = this.head;
        let words: string[] = [];

        for (let i = 0; i < partial.length; i++) {
            let index = this.idx(partial[i]);
            curr = curr.branch[index] as Tree<string>;
        }
        
        // get all the remaining words (recursive is best i believe)
        let str = partial.slice(0, -1); 
        this.walk(str, curr, words);

        return words;
    }

    idx(c: string): number {
        return c.charCodeAt(0) - this.zero;
    }

    walk(prefix: string, tree: Tree<string>, words: string[]): void {
        // conditions
        if (tree === undefined) {
            return;
        }

        // pre
        prefix += tree.value;

        if (tree.word === true) {
            words.push(prefix);
        }

        // recursion

        tree.branch.forEach(t => this.walk(prefix, t, words));

        // post

    }
}
